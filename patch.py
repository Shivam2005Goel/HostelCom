import re

with open('src/app/help/page.tsx', 'r') as f:
    content = f.read()

# 1. Imports
content = content.replace(
    'import { useState, useEffect } from "react";',
    'import { useState, useEffect, useRef, useCallback } from "react";\nimport { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";'
)

# 2. Hooks declarations
content = content.replace(
    'const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);',
    'const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);\n  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);\n  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);\n  const requestRef = useRef<number>();\n  const lastVideoTimeRef = useRef(-1);'
)

# 3. Method replacements
old_camera_methods = """  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      if (videoRef) {
        videoRef.srcObject = stream;
        setCameraActive(true);
        setCameraError("");
        setAnalysisActive(true);
        
        // Start simulation of detection results
        startDetectionSimulation();
      }
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera permissions.");
      setCameraActive(false);
    }
  };

  const startDetectionSimulation = () => {
    const intervals: NodeJS.Timeout[] = [];
    
    // Face detection simulation
    const faceInterval = setInterval(() => {
      setDetectionResults(prev => ({
        ...prev,
        faceDetected: Math.random() > 0.1,
        smileDetected: Math.random() > 0.6,
        confidence: Math.floor(Math.random() * 20) + 80
      }));
    }, 2000);
    intervals.push(faceInterval);
    
    // Eye blink simulation
    const blinkInterval = setInterval(() => {
      setDetectionResults(prev => ({
        ...prev,
        eyeBlink: prev.eyeBlink + Math.floor(Math.random() * 3)
      }));
    }, 3000);
    intervals.push(blinkInterval);
    
    // Head pose simulation
    const poseInterval = setInterval(() => {
      const poses = ["Center", "Slightly Left", "Slightly Right", "Slightly Up", "Slightly Down"];
      setDetectionResults(prev => ({
        ...prev,
        headPose: poses[Math.floor(Math.random() * poses.length)]
      }));
    }, 4000);
    intervals.push(poseInterval);
    
    // Movement level simulation
    const movementInterval = setInterval(() => {
      const levels = ["Still", "Minimal", "Normal", "Active", "Very Active"];
      setDetectionResults(prev => ({
        ...prev,
        movementLevel: levels[Math.floor(Math.random() * levels.length)]
      }));
    }, 2500);
    intervals.push(movementInterval);
    
    // Mood calculation
    const moodInterval = setInterval(() => {
      const moods = [
        { mood: "Happy", color: "green" },
        { mood: "Neutral", color: "cyan" },
        { mood: "Calm", color: "blue" },
        { mood: "Thoughtful", color: "purple" },
        { mood: "Tired", color: "amber" }
      ];
      const selected = moods[Math.floor(Math.random() * moods.length)];
      setDetectionResults(prev => ({
        ...prev,
        mood: selected.mood
      }));
    }, 5000);
    intervals.push(moodInterval);
    
    // Store intervals for cleanup
    (window as unknown as { detectionIntervals: NodeJS.Timeout[] }).detectionIntervals = intervals;
  };

  const stopCamera = () => {
    if (videoRef?.srcObject) {
      const tracks = (videoRef.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.srcObject = null;
    }
    setCameraActive(false);
    setAnalysisActive(false);
    setDetectionResults({
      faceDetected: false,
      smileDetected: false,
      eyeBlink: 0,
      headPose: "Center",
      movementLevel: "Normal",
      mood: "Neutral",
      confidence: 0
    });
    
    // Clear all intervals
    const intervals = (window as unknown as { detectionIntervals?: NodeJS.Timeout[] }).detectionIntervals;
    if (intervals) {
      intervals.forEach(interval => clearInterval(interval));
    }
  };"""


new_camera_methods = """  const initMediaPipe = async () => {
    if (faceLandmarkerRef.current) return;
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1
    });
  };

  const predictWebcam = useCallback(() => {
    if (!videoRef || !canvasRef || !faceLandmarkerRef.current) return;
    
    const canvasCtx = canvasRef.getContext("2d");
    if (!canvasCtx) return;
    canvasRef.width = videoRef.videoWidth || 640;
    canvasRef.height = videoRef.videoHeight || 480;
    
    const startTimeMs = performance.now();
    if (lastVideoTimeRef.current !== videoRef.currentTime) {
      lastVideoTimeRef.current = videoRef.currentTime;
      const results = faceLandmarkerRef.current.detectForVideo(videoRef, startTimeMs);
      
      canvasCtx.clearRect(0, 0, canvasRef.width, canvasRef.height);
      
      if (results.faceLandmarks) {
        const drawingUtils = new DrawingUtils(canvasCtx);
        for (const landmarks of results.faceLandmarks) {
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C070", lineWidth: 1 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#06b6d4", lineWidth: 2 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: "#06b6d4", lineWidth: 2 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#06b6d4", lineWidth: 2 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: "#06b6d4", lineWidth: 2 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#8b5cf6", lineWidth: 2 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#ec4899", lineWidth: 2 });
        }
        
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          const shapes = results.faceBlendshapes[0].categories;
          const getScore = (name) => shapes.find(s => s.categoryName === name)?.score || 0;
          
          const smileScore = max(getScore("mouthSmileLeft"), getScore("mouthSmileRight"));
          const isSmiling = smileScore > 0.5;
          const blinkScore = max(getScore("eyeBlinkLeft"), getScore("eyeBlinkRight"));
          const mood = isSmiling ? "Happy" : (smileScore > 0.2 ? "Calm" : "Neutral");
          
          setDetectionResults(prev => ({
            ...prev,
            faceDetected: true,
            smileDetected: isSmiling,
            confidence: 98,
            mood,
            headPose: getScore("headPitch") > 0.1 ? "Looking Down" : "Center",
            eyeBlink: blinkScore > 0.4 ? prev.eyeBlink + 1 : prev.eyeBlink
          }));
        }
      } else {
        setDetectionResults(prev => ({ ...prev, faceDetected: false, smileDetected: false, confidence: 0 }));
      }
    }
    
    if (cameraActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [cameraActive, videoRef, canvasRef]);

  const max = (a, b) => a > b ? a : b;

  const startCamera = async () => {
    try {
      await initMediaPipe();
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      if (videoRef) {
        videoRef.srcObject = stream;
        videoRef.onloadedmetadata = () => {
          videoRef.play();
          setCameraActive(true);
          setCameraError("");
          setAnalysisActive(true);
          requestRef.current = requestAnimationFrame(predictWebcam);
        };
      }
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera permissions.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef?.srcObject) {
      const tracks = videoRef.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.srcObject = null;
    }
    setCameraActive(false);
    setAnalysisActive(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    setDetectionResults({
      faceDetected: false,
      smileDetected: false,
      eyeBlink: 0,
      headPose: "Center",
      movementLevel: "Normal",
      mood: "Neutral",
      confidence: 0
    });
  };"""

content = content.replace(old_camera_methods, new_camera_methods)

# 4. Inject canvas
old_video_render = """                      {cameraActive ? (
                        <video
                          ref={(el) => setVideoRef(el)}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : ("""

new_video_render = """                      {cameraActive ? (
                        <>
                          <video
                            ref={(el) => setVideoRef(el)}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                          <canvas
                            ref={(el) => setCanvasRef(el)}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                          />
                        </>
                      ) : ("""

content = content.replace(old_video_render, new_video_render)

with open('src/app/help/page.tsx', 'w') as f:
    f.write(content)

