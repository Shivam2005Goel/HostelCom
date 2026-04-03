import re

with open('src/app/help/page.tsx', 'r') as f:
    code = f.read()

# Remove face-api.js import
code = code.replace('import * as faceapi from "face-api.js";', 'import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";')

# Replace loadModels, detectFaces, startCamera, stopCamera and any state hooks that were added by faceapi.
# We will use regex to find the block from `const loadModels = async` all the way down to the end of `stopCamera = ()`

pattern = re.compile(r'const loadModels = async \(\) => \{.+?const stopCamera = \(\) => \{.+?\};\s*', re.DOTALL)

new_camera_logic = """  const initMediaPipe = async () => {
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
    
    // Setup canvas
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
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: "#06b6d4", lineWidth: 2 });
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: "#06b6d4", lineWidth: 2 });
        }
        
        // Update stats
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          const shapes = results.faceBlendshapes[0].categories;
          const getScore = (name: string) => shapes.find(s => s.categoryName === name)?.score || 0;
          
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

  const max = (a: number, b: number) => a > b ? a : b;

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
      const tracks = (videoRef.srcObject as MediaStream).getTracks();
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
  };
"""

code = pattern.sub(new_camera_logic, code)

# Clean up leftover faceapi code like refs or loadingModels if possible
code = code.replace(
    'const [modelsLoaded, setModelsLoaded] = useState(false);',
    'const lastVideoTimeRef = useRef(-1);'
)
code = code.replace(
    'const [loadingModels, setLoadingModels] = useState(false);',
    ''
)

# And fix the <video> rendering block. The faceapi version might have wrapped it differently.
# Let's just blindly replace the camera view if needed, but since it's Nextjs we can just use regex.
video_pattern = re.compile(r'\{cameraActive \? \(\s*<((?:video|div)[^>]*?ref=\{\(el\) => setVideoRef\(el\)\}[^>]+>.*?)\s*\) \: \(', re.DOTALL)
def video_replacement(m):
    original_video_or_div = m.group(1)
    # The faceapi implementation wrapped video and canvas inside a div.
    # Let's see if there is already a canvas.
    return '{\n                      cameraActive ? (\n                        <div className="relative w-full h-full">\n                          <video ref={(el) => setVideoRef(el)} autoPlay playsInline muted className="w-full h-full object-cover" />\n                          <canvas ref={(el) => setCanvasRef(el)} className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none" />\n                        </div>\n                      ) : ('

code = video_pattern.sub(video_replacement, code)

with open('src/app/help/page.tsx', 'w') as f:
    f.write(code)

