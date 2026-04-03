"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import { 
  HelpCircle, 
  Heart, 
  Filter, 
  MessageCircle, 
  Sparkles,
  Phone,
  BookOpen,
  Lightbulb,
  Users,
  Send,
  Quote,
  TrendingUp,
  Shield,
  Calendar,
  X,
  Eye,
  AlertTriangle,
  Video,
  EyeOff,
  Brain,
  Activity,
  HandHeart,
  Mic,
  Waves,
  Target,
  Zap,
  Compass,
  Award,
  MessageSquare,
  Clock,
  CheckCircle,
  Bell,
  MapPin,
  Camera,
  CameraOff,
  Loader2,
  MicOff,
  Globe,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Feeling = "all" | "lonely" | "failure" | "breakup" | "homesick" | "anxious";

interface Story {
  id: number;
  feeling: Exclude<Feeling, "all">;
  title: string;
  content: string;
  author: string;
  likes: number;
  readTime: string;
  featured?: boolean;
}

const stories: Story[] = [
  {
    id: 1,
    feeling: "lonely",
    title: "Finding My People",
    content: "When I first came to college, I felt like a ghost in a crowded room. Everyone seemed to have their groups already. I spent my first month eating alone in my room. One day, I decided to join the photography club - and that's where I met my best friends. Now I can't imagine my college life without them.",
    author: "Anonymous, 2nd Year",
    likes: 234,
    readTime: "2 min",
    featured: true,
  },
  {
    id: 2,
    feeling: "failure",
    title: "Failing Was My Turning Point",
    content: "I failed my first midterm badly. I thought my life was over. I called my mom crying, thinking I'd disappoint everyone. But she told me about her own failures. I spent the next month studying smarter, not harder. I ended up scoring in the top 10% that semester. Failure taught me resilience.",
    author: "Rahul S.",
    likes: 456,
    readTime: "3 min",
  },
  {
    id: 3,
    feeling: "breakup",
    title: "Healing Takes Time",
    content: "My first breakup was brutal. We were together for 2 years. I couldn't eat, couldn't focus, just cried for weeks. Slowly, I started journaling, going to the gym, and spending time with friends. It took 3 months to feel like myself again. Now I'm grateful - I grew so much as a person.",
    author: "Anonymous, 3rd Year",
    likes: 389,
    readTime: "3 min",
  },
  {
    id: 4,
    feeling: "homesick",
    title: "Home Is Where the Heart Is",
    content: "The first Diwali away from home was the hardest. I sat in my room watching my friends go home. But my roommate's family invited me to their celebration. That act of kindness changed everything. I learned that home isn't just a place - it's the people who care about you.",
    author: "Priya K.",
    likes: 521,
    readTime: "2 min",
    featured: true,
  },
  {
    id: 5,
    feeling: "anxious",
    title: "Calm in the Storm",
    content: "Final year project submissions were approaching and I was having panic attacks every night. My mentor noticed my stress and taught me breathing techniques. I also started therapy. Now I handle stress much better - it's a skill that stays with you.",
    author: "Anonymous, 4th Year",
    likes: 678,
    readTime: "3 min",
  },
  {
    id: 6,
    feeling: "failure",
    title: "Rejection Led Me Here",
    content: "I applied to 5 internships and got rejected by all. I felt worthless. But that rejection pushed me to build my own projects. By the time the next placement season came, I had a portfolio that impressed everyone. The 'no' earlier led to my biggest 'yes'.",
    author: "Arjun M.",
    likes: 678,
    readTime: "3 min",
  },
  {
    id: 7,
    feeling: "breakup",
    title: "Rediscovering Me",
    content: "After my breakup, I didn't know who I was anymore - I had lost myself in the relationship. I took up painting, something I had given up years ago. Turns out, I'm pretty good at it! I sold my first painting last month. I learned that being alone isn't lonely - it's an opportunity.",
    author: "Anonymous, 4th Year",
    likes: 445,
    readTime: "2 min",
  },
  {
    id: 8,
    feeling: "homesick",
    title: "The Phone Call That Helped",
    content: "I was so homesick that I almost quit college in first semester. My dad told me - 'Finish this year. If you still feel this way, we'll figure it out.' That one year changed everything. I made friends, found my passion, and now I can't imagine leaving. Sometimes you just need time.",
    author: "Neha T.",
    likes: 567,
    readTime: "2 min",
  },
];

const quotes = [
  { text: "You're not alone in this. We've all been there.", author: "Hold-on Team" },
  { text: "Tough times don't last, tough people do.", author: "Unknown" },
  { text: "It's okay to not be okay. That's being human.", author: "Hold-on Team" },
  { text: "Every storm runs out of rain.", author: "Joya" },
  { text: "You're stronger than you think.", author: "Unknown" },
  { text: "This too shall pass.", author: "Ancient Proverb" },
];

const wellnessActivities = [
  { icon: Brain, title: "AI Mood Tracker", desc: "Track emotions with AI insights", color: "indigo" },
  { icon: Activity, title: "Breathing Exercises", desc: "Guided 2-min breathing", color: "cyan" },
  { icon: HandHeart, title: "Peer Support", desc: "Connect with listeners", color: "pink" },
  { icon: Mic, title: "Voice Journal", desc: "Speak your feelings", color: "amber" },
];

const quickTips = [
  { icon: Calendar, title: "Daily Check-in", desc: "Track your mood daily", color: "blue" },
  { icon: BookOpen, title: "Resource Library", desc: "Articles & guides", color: "purple" },
  { icon: Phone, title: "Emergency Line", desc: "24/7 support", color: "red" },
  { icon: Lightbulb, title: "Quick Tips", desc: "Instant advice", color: "yellow" },
  { icon: Eye, title: "Report Concern", desc: "Notify about a friend", color: "orange" },
  { icon: Video, title: "CCTV Monitor", desc: "Safety surveillance", color: "cyan" },
];

const feelingLabels: Record<Feeling, string> = {
  all: "All",
  lonely: "Lonely",
  failure: "Failure",
  breakup: "Breakup",
  homesick: "Homesick",
  anxious: "Anxious",
};

const feelingColors: Record<Feeling, string> = {
  all: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  lonely: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  failure: "bg-red-500/20 text-red-300 border-red-500/30",
  breakup: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  homesick: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  anxious: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const feelingBgColors: Record<Feeling, string> = {
  all: "from-indigo-500/20 to-purple-500/20",
  lonely: "from-blue-500/20 to-cyan-500/20",
  failure: "from-red-500/20 to-orange-500/20",
  breakup: "from-pink-500/20 to-rose-500/20",
  homesick: "from-amber-500/20 to-yellow-500/20",
  anxious: "from-purple-500/20 to-violet-500/20",
};

export default function HelpPage() {
  const [filter, setFilter] = useState<Feeling>("all");
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [showQuickHelp, setShowQuickHelp] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCCTVModal, setShowCCTVModal] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const lastVideoTimeRef = useRef(-1);
  
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [loadingModels, setLoadingModels] = useState(false);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const requestRef = useRef<number>(0);
  const [detectionResults, setDetectionResults] = useState({
    faceDetected: false,
    smileDetected: false,
    eyeBlink: 0,
    headPose: "Center",
    movementLevel: "Normal",
    mood: "Neutral",
    confidence: 0
  });
  const [analysisActive, setAnalysisActive] = useState(false);

  useEffect(() => {
    return () => {
      if (videoRef && videoRef.srcObject) {
        const stream = videoRef.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [videoRef]);

    const initMediaPipe = async () => {
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
      setLoadingModels(true);
      await initMediaPipe();
      setLoadingModels(false);
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
  const [currentQuote, setCurrentQuote] = useState(0);
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [moodScore, setMoodScore] = useState(5);
  const [activeTab, setActiveTab] = useState<"stories" | "wellness" | "report">("stories");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "pt", name: "Portuguese", flag: "🇧🇷" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ta", name: "Tamil", flag: "🇱🇰" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
  ];

  const startVoiceRecording = async () => {
    const SpeechRecognitionAPI = (window as unknown as { webkitSpeechRecognition?: new () => unknown; SpeechRecognition?: new () => unknown }).webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setTranscribedText("Voice recognition not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    
    const recognition = new SpeechRecognitionAPI() as {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onstart: (() => void) | null;
      onresult: ((event: { resultIndex: number; results: { isFinal: boolean; [index: number]: { transcript: string } }[] }) => void) | null;
      onerror: ((event: { error: string }) => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    };
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage === "en" ? "en-US" : selectedLanguage === "hi" ? "hi-IN" : selectedLanguage;
    
    recognition.onstart = () => {
      setIsRecording(true);
    };
    
    recognition.onresult = (event: { resultIndex: number; results: { isFinal: boolean; [index: number]: { transcript: string } }[] }) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      if (finalTranscript) {
        setReportText(prev => prev + finalTranscript);
      }
    };
    
    recognition.onerror = (event: { error: string }) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start recording:", err);
      setTranscribedText("Failed to start voice recording");
    }
  };

  const stopVoiceRecording = () => {
    const SpeechRecognitionAPI = (window as unknown as { webkitSpeechRecognition?: new () => { stop: () => void } }).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      try {
        const recognition = new SpeechRecognitionAPI();
        (recognition as { stop: () => void }).stop();
      } catch (e) {}
    }
    setIsRecording(false);
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (showBreathing) {
      const interval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === "inhale") return "hold";
          if (prev === "hold") return "exhale";
          return "inhale";
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showBreathing]);

  const filteredStories = filter === "all" 
    ? stories 
    : stories.filter(s => s.feeling === filter);

  const handleLike = (id: number) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-5"
          >
            <Sparkles className="w-4 h-4" />
            <span>You're not alone — 2,847 students here with you</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 tracking-tight">
            Hold-on <span className="text-gradient">Help</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories. Real support. Real connection. 
            Find your story, share your journey, and help others find theirs.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-panel p-1.5 rounded-2xl border border-white/10 flex gap-1">
            {[
              { id: "stories", icon: MessageSquare, label: "Stories" },
              { id: "wellness", icon: Heart, label: "Wellness" },
              { id: "report", icon: Shield, label: "Report Concern" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-indigo-500 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === "stories" && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Quick Actions Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8"
              >
                {quickTips.map((tip, index) => (
                  <motion.button
                    key={tip.title}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (index === 2) setShowQuickHelp(true);
                      else if (index === 4) setShowReportModal(true);
                      else if (index === 5) setShowCCTVModal(true);
                    }}
                    className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all text-center group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 bg-${tip.color}-500/20 group-hover:bg-${tip.color}-500/30 transition-colors`}>
                      <tip.icon className={`w-5 h-5 text-${tip.color}-400`} />
                    </div>
                    <h3 className="font-semibold text-white text-sm">{tip.title}</h3>
                    <p className="text-slate-500 text-xs mt-1">{tip.desc}</p>
                  </motion.button>
                ))}
              </motion.div>

              {/* Daily Quote */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent mb-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Quote className="w-7 h-7 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl text-white italic mb-3">"{quotes[currentQuote].text}"</p>
                    <div className="flex items-center justify-between">
                      <p className="text-slate-500">— {quotes[currentQuote].author}</p>
                      <button 
                        onClick={() => setCurrentQuote((prev) => (prev + 1) % quotes.length)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Next quote
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Filter Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400 font-medium text-lg">How are you feeling today?</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(feelingLabels) as Feeling[]).map((feeling) => (
                    <motion.button
                      key={feeling}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter(feeling)}
                      className={`px-6 py-3 rounded-2xl border transition-all duration-200 font-medium ${
                        filter === feeling
                          ? `${feelingColors[feeling]} shadow-lg shadow-indigo-500/20`
                          : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {feelingLabels[feeling]}
                      {filter === feeling && (
                        <span className="ml-2 opacity-75">
                          ({filter === "all" ? stories.length : stories.filter(s => s.feeling === feeling).length})
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Stats Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-between gap-4 mb-10 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-2xl">2,847</span>
                    <span className="text-slate-400 ml-2">students shared</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-2xl">89%</span>
                    <span className="text-slate-400 ml-2">found it helpful</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-2xl">24/7</span>
                    <span className="text-slate-400 ml-2">support available</span>
                  </div>
                </div>
              </motion.div>

              {/* Featured Story Banner */}
              {filter === "all" && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-indigo-500/30 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-amber-400" />
                    <span className="text-amber-400 font-medium">Featured Story</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">You Are Not Alone — A Message to Everyone</h3>
                  <p className="text-slate-300 mb-4 max-w-2xl">
                    No matter what you're going through — loneliness, failure, heartbreak, homesickness — 
                    remember that thousands of students have walked this path and emerged stronger. 
                    Your story matters. Your feelings are valid. And help is always available.
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium"
                    >
                      Read More Stories
                    </motion.button>
                    <button className="px-6 py-3 text-indigo-400 hover:text-indigo-300 font-medium">
                      Share Your Story →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Stories Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <AnimatePresence mode="popLayout">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.08 }}
                      className={`glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all cursor-pointer group overflow-hidden relative ${story.featured ? "ring-2 ring-amber-500/30" : ""}`}
                      onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                    >
                      {story.featured && (
                        <div className="absolute top-4 right-4">
                          <Award className="w-6 h-6 text-amber-400" />
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feelingBgColors[story.feeling]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${feelingColors[story.feeling]}`}>
                            {feelingLabels[story.feeling]}
                          </span>
                          <span className="text-slate-500 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {story.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                          {story.title}
                        </h3>
                        
                        <AnimatePresence>
                          {expandedStory === story.id ? (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-slate-300 leading-relaxed mb-4"
                            >
                              {story.content}
                            </motion.p>
                          ) : (
                            <p className="text-slate-400 leading-relaxed mb-4 line-clamp-3">
                              {story.content}
                            </p>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleLike(story.id); }}
                            className="flex items-center gap-2 text-slate-500 hover:text-pink-400 transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${likedStories.has(story.id) ? "text-pink-500 fill-pink-500" : ""}`} />
                            <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                          </button>
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <span>{story.author}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Share Your Story CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-10 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                    <MessageCircle className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">Have a story to share?</h2>
                  <p className="text-slate-400 mb-8 max-w-lg mx-auto text-lg">
                    Your story could help someone who's going through what you once did. 
                    Share anonymously and make a difference.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-medium text-lg transition-colors shadow-lg shadow-indigo-500/30"
                  >
                    <Send className="w-5 h-5" />
                    Share Your Story Anonymously
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "wellness" && (
            <motion.div
              key="wellness"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* AI Mood Tracker */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-3xl border border-indigo-500/30 mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-indigo-400" />
                  <h2 className="text-2xl font-bold text-white">AI Mood Tracker</h2>
                </div>
                <p className="text-slate-400 mb-8">How are you feeling right now?</p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <motion.button
                      key={score}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMoodScore(score)}
                      className={`w-12 h-12 rounded-full font-bold transition-all ${
                        moodScore === score
                          ? "bg-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/40"
                          : "bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {score}
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-slate-500 mb-4">
                  <span>Struggling</span>
                  <span>Great</span>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                  <p className="text-white font-medium mb-2">AI Insight:</p>
                  <p className="text-slate-400">
                    {moodScore <= 3 ? "Your score suggests you might be going through a difficult time. Consider talking to someone or trying our breathing exercises." 
                      : moodScore <= 6 ? "You're doing okay. Remember to take breaks and practice self-care today."
                      : "Great to see you feeling well! Keep doing what makes you happy."}
                  </p>
                </div>
              </motion.div>

              {/* Breathing Exercise */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-cyan-500/30 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Waves className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-2xl font-bold text-white">2-Minute Breathing</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowBreathing(!showBreathing)}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      showBreathing 
                        ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                        : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    }`}
                  >
                    {showBreathing ? "Stop" : "Start"}
                  </motion.button>
                </div>
                
                {showBreathing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-8"
                  >
                    <motion.div
                      animate={{
                        scale: breathPhase === "inhale" ? 1.3 : breathPhase === "hold" ? 1.1 : 0.9,
                      }}
                      transition={{ duration: 4 }}
                      className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 border-4 border-cyan-500/50 flex items-center justify-center mb-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-cyan-500/40" />
                    </motion.div>
                    <p className="text-2xl font-bold text-white mb-2">
                      {breathPhase === "inhale" ? "Breathe In..." : breathPhase === "hold" ? "Hold..." : "Breathe Out..."}
                    </p>
                    <p className="text-slate-400">Follow the circle to regulate your breath</p>
                  </motion.div>
                )}
                
                {!showBreathing && (
                  <div className="text-center py-4">
                    <p className="text-slate-400 mb-4">A simple 4-7-8 breathing technique to calm your mind</p>
                    <div className="flex justify-center gap-8 text-slate-500">
                      <div className="text-center">
                        <p className="text-white font-bold text-2xl">4</p>
                        <p className="text-sm">seconds inhale</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-2xl">7</p>
                        <p className="text-sm">seconds hold</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-2xl">8</p>
                        <p className="text-sm">seconds exhale</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Wellness Activities Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {wellnessActivities.map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${activity.color}-500/20 flex items-center justify-center mb-4 group-hover:bg-${activity.color}-500/30 transition-colors`}>
                      <activity.icon className={`w-6 h-6 text-${activity.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{activity.title}</h3>
                    <p className="text-slate-400">{activity.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "report" && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Anonymous Report Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-8 rounded-3xl border border-orange-500/30"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Report a Concern</h2>
                    <p className="text-slate-400">Help a friend in need — 100% anonymous</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Noticed a friend behaving differently? Missing meals, skipping classes, 
                  or seeming withdrawn? Send an anonymous alert to our supervisors.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Your identity is completely hidden</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Supervisors will check on them gently</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">No backlash — just care</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium text-lg"
                >
                  Submit Anonymous Report
                </motion.button>
              </motion.div>

              {/* CCTV Monitoring Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-8 rounded-3xl border border-cyan-500/30"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                    <Video className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">CCTV Safety AI</h2>
                    <p className="text-slate-400">Proactive monitoring for student safety</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Our AI-powered surveillance detects concerning patterns like late-night 
                  isolation, unusual behavior, or potential safety risks and alerts supervisors.
                </p>
                
                <div className="space-y-3 mb-6">
                  {[
                    { icon: Target, text: "Late Night Isolation Detection", color: "red" },
                    { icon: Bell, text: "Abnormal Activity Alerts", color: "amber" },
                    { icon: Activity, text: "Fall & Emergency Detection", color: "purple" },
                    { icon: Shield, text: "Authorized Supervisor Access Only", color: "green" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      <span className="text-slate-300">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCCTVModal(true)}
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium text-lg"
                >
                  View Surveillance Dashboard
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emergency Support Modal */}
        <AnimatePresence>
          {showQuickHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowQuickHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel p-8 rounded-3xl border border-red-500/40 bg-gray-900/95 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">
                      <Phone className="w-7 h-7 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Need immediate help?</h3>
                      <p className="text-slate-400">We're here for you 24/7</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowQuickHelp(false)}
                    className="text-slate-500 hover:text-white p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full p-5 rounded-2xl bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition-colors text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <Phone className="w-5 h-5 text-red-400" />
                      <span className="text-white font-semibold text-lg">Emergency Helpline</span>
                    </div>
                    <p className="text-slate-400 ml-8">1800-XXX-XXXX (Toll Free)</p>
                  </button>
                  <button className="w-full p-5 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 transition-colors text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <MessageCircle className="w-5 h-5 text-indigo-400" />
                      <span className="text-white font-semibold text-lg">Talk to a Counselor</span>
                    </div>
                    <p className="text-slate-400 ml-8">Available now</p>
                  </button>
                  <button className="w-full p-5 rounded-2xl bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 transition-colors text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-white font-semibold text-lg">Chat with Peer Listener</span>
                    </div>
                    <p className="text-slate-400 ml-8">Student volunteers</p>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Shield className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 text-sm">Your conversation is 100% confidential</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Anonymous Report Modal */}
        <AnimatePresence>
          {showReportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowReportModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel p-8 rounded-3xl border border-orange-500/40 bg-gray-900/95 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                      <Eye className="w-7 h-7 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Report a Concern</h3>
                      <p className="text-slate-400">Help a friend in need — 100% anonymous</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowReportModal(false)}
                    className="text-slate-500 hover:text-white p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {reportSent ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                    >
                      <Shield className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-3">Report Submitted!</h4>
                    <p className="text-slate-400 mb-6 max-w-sm mx-auto">
                      Your concern has been sent anonymously to our supervisors. 
                      They'll check on your friend with care and discretion.
                    </p>
                    <button 
                      onClick={() => { setReportSent(false); setReportText(""); }}
                      className="text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Submit another concern →
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Language Selection */}
                    <div className="mb-6">
                      <label className="text-slate-400 text-sm mb-3 block flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Select Language
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {languages.slice(0, 8).map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setSelectedLanguage(lang.code)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              selectedLanguage === lang.code
                                ? "bg-orange-500/30 text-orange-300 border border-orange-500/50"
                                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                            }`}
                          >
                            {lang.flag} {lang.name}
                          </button>
                        ))}
                      </div>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="mt-3 w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code} className="bg-gray-900">
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Voice Recording & Text-to-Speech */}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                          isRecording 
                            ? "bg-red-500/80 text-white animate-pulse" 
                            : "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-4 h-4" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4" />
                            Record Voice
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speakText(reportText || "Please enter your concern first.")}
                        disabled={!reportText.trim()}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Volume2 className="w-4 h-4" />
                        Read Aloud
                      </motion.button>
                    </div>

                    {isRecording && (
                      <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-400 text-sm">Recording your concern... Speak now</span>
                      </div>
                    )}

                    <div className="space-y-5">
                      <div>
                        <label className="text-slate-400 text-sm mb-2 block">What have you noticed?</label>
                        <textarea
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          placeholder="e.g., My friend hasn't been eating lunch, missing classes, seems very sad lately, spending too much time alone, etc...

Or click 'Record Voice' to speak your concern in your preferred language."
                          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none resize-none h-40"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-slate-400 text-sm mb-2 block">Friend's Hostel</label>
                          <select className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-orange-500/50 focus:outline-none">
                            <option value="">Select Block</option>
                            <option value="a">Block A</option>
                            <option value="b">Block B</option>
                            <option value="c">Block C</option>
                            <option value="d">Block D</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-400 text-sm mb-2 block">Location (optional)</label>
                          <input 
                            type="text" 
                            placeholder="Floor / Room"
                            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <EyeOff className="w-5 h-5 text-indigo-400" />
                      <p className="text-slate-400 text-sm">Your identity is completely anonymous. Only supervisors can see this report.</p>
                    </div>

                    <button 
                      onClick={() => setReportSent(true)}
                      disabled={!reportText.trim()}
                      className="w-full mt-6 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-medium text-lg transition-colors"
                    >
                      Submit Anonymously
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CCTV Modal */}
        <AnimatePresence>
          {showCCTVModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCCTVModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel p-8 rounded-3xl border border-cyan-500/40 bg-gray-900/95 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                      <Camera className="w-7 h-7 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Use My Camera</h3>
                      <p className="text-slate-400">Real-time AI behavior detection using your camera</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { stopCamera(); setShowCCTVModal(false); }}
                    className="text-slate-500 hover:text-white p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Your Camera Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Camera Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Camera className="w-5 h-5 text-cyan-400" />
                        Your Camera Feed
                      </h4>
                      <div className="flex gap-2">
                        {!cameraActive ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startCamera}
                            disabled={loadingModels}
                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white rounded-xl font-medium flex items-center gap-2"
                          >
                            {loadingModels ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading Models...
                              </>
                            ) : (
                              <>
                                <Camera className="w-4 h-4" />
                                Start Camera
                              </>
                            )}
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={stopCamera}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium flex items-center gap-2"
                          >
                            <CameraOff className="w-4 h-4" />
                            Stop
                          </motion.button>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
                      {cameraActive ? (
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
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {cameraError ? (
                            <>
                              <AlertTriangle className="w-12 h-12 text-red-400 mb-3" />
                              <p className="text-red-400 text-center px-4">{cameraError}</p>
                            </>
                          ) : (
                            <>
                              {loadingModels ? (
                                <>
                                  <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mb-3" />
                                  <p className="text-cyan-400">Loading AI Models...</p>
                                  <p className="text-slate-600 text-sm mt-2">Please wait while we prepare the emotion detector</p>
                                </>
                              ) : (
                                <>
                                  <Camera className="w-16 h-16 text-slate-600 mb-3" />
                                  <p className="text-slate-500">Click "Start Camera" to begin</p>
                                  <p className="text-slate-600 text-sm mt-2">AI will analyze your facial expressions</p>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      {cameraActive && (
                        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-red-500/80 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-white text-xs font-medium">REC</span>
                        </div>
                      )}
                      {cameraActive && (
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 rounded-lg">
                          <p className="text-cyan-400 text-xs">AI Analyzing...</p>
                        </div>
                      )}
                    </div>
                    
                    {cameraActive && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20">
                        <p className="text-white font-medium mb-2">AI Detection Active:</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Posture Analysis</span>
                          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">Movement Patterns</span>
                          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">Facial Expression</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Analysis Panel */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-400" />
                      Real-time AI Analysis
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Mood</span>
                          <span className={`text-sm font-medium ${
                            detectionResults.mood === "Happy" ? "text-green-400" :
                            detectionResults.mood === "Calm" ? "text-blue-400" :
                            detectionResults.mood === "Thoughtful" ? "text-purple-400" :
                            detectionResults.mood === "Tired" ? "text-amber-400" :
                            "text-cyan-400"
                          }`}>{analysisActive ? detectionResults.mood : "—"}</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: analysisActive ? `${detectionResults.confidence}%` : "0%" }}
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Head Pose</span>
                          <span className="text-cyan-400 text-sm">{analysisActive ? detectionResults.headPose : "—"}</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: analysisActive ? "60%" : "0%" }}
                            className="h-full bg-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Eye Blinks</span>
                          <span className="text-purple-400 text-sm">{analysisActive ? detectionResults.eyeBlink : "0"} / min</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: analysisActive ? `${Math.min(detectionResults.eyeBlink * 5, 100)}%` : "0%" }}
                            className="h-full bg-purple-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Smile Detection</span>
                          <span className={`text-sm ${detectionResults.smileDetected ? "text-green-400" : "text-slate-500"}`}>
                            {analysisActive ? (detectionResults.smileDetected ? "Detected" : "Not Detected") : "—"}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: analysisActive ? (detectionResults.smileDetected ? "80%" : "20%") : "0%" }}
                            className={`h-full rounded-full ${detectionResults.smileDetected ? "bg-green-500" : "bg-slate-500"}`}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Face Detection</span>
                          <span className={`text-sm ${detectionResults.faceDetected ? "text-green-400" : "text-red-400"}`}>
                            {analysisActive ? (detectionResults.faceDetected ? "Face Found" : "No Face") : "—"}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: analysisActive ? (detectionResults.faceDetected ? "90%" : "10%") : "0%" }}
                            className={`h-full rounded-full ${detectionResults.faceDetected ? "bg-green-500" : "bg-red-500"}`}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">Confidence</span>
                          <span className="text-amber-400 text-sm">{analysisActive ? `${detectionResults.confidence}%` : "—"}</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: analysisActive ? `${detectionResults.confidence}%` : "0%" }}
                            className="h-full bg-amber-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated CCTV Grid (for demonstration) */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <Video className="w-5 h-5 text-slate-400" />
                    Hostel CCTV Feeds (For Admin Reference)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Block A - Main Lobby", cam: "CAM-001" },
                      { label: "Block A - Floor 1 Corridor", cam: "CAM-002" },
                      { label: "Block B - Main Entrance", cam: "CAM-003" },
                      { label: "Block B - Garden Area", cam: "CAM-004" },
                      { label: "Block C - Common Area", cam: "CAM-005" },
                      { label: "Block D - Study Room", cam: "CAM-006" },
                      { label: "Mess - Entrance", cam: "CAM-007" },
                      { label: "Sports Complex", cam: "CAM-008" },
                    ].map((cam) => (
                      <div key={cam.cam} className="p-4 rounded-2xl bg-black/40 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-slate-500 text-xs font-mono">{cam.cam}</span>
                        </div>
                        <div className="aspect-video bg-slate-800/50 rounded-lg mb-2 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Video className="w-8 h-8 text-slate-600" />
                          </div>
                          <div className="absolute bottom-1 left-1 right-1 text-xs text-slate-500 bg-black/50 px-2 py-1 rounded">
                            LIVE
                          </div>
                        </div>
                        <p className="text-white text-sm font-medium">{cam.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Alert Triggers */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    AI-Powered Alert Triggers
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-white font-semibold">Late Night Isolation</span>
                      </div>
                      <p className="text-slate-400 text-sm">Detects students walking alone after 11 PM</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-red-400">Active</span>
                        <div className="flex-1 h-1 bg-red-500/30 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-red-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/30">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <span className="text-white font-semibold">Unusual Screaming</span>
                      </div>
                      <p className="text-slate-400 text-sm">Detects loud voices/screams in corridors</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-orange-400">Active</span>
                        <div className="flex-1 h-1 bg-orange-500/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/2 bg-orange-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-semibold">Prolonged Isolation</span>
                      </div>
                      <p className="text-slate-400 text-sm">Detects students sitting alone for 30+ mins</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-blue-400">Active</span>
                        <div className="flex-1 h-1 bg-blue-500/30 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-blue-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-semibold">Fall Detection</span>
                      </div>
                      <p className="text-slate-400 text-sm">Detects sudden falls or collapses</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-purple-400">Active</span>
                        <div className="flex-1 h-1 bg-purple-500/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/4 bg-purple-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="p-5 rounded-2xl bg-slate-800/50 border border-white/10">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-400" />
                    Recent System Alerts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-orange-500/10">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <span className="text-slate-300">Block B - Female student sitting alone in garden for 45 mins</span>
                      </div>
                      <span className="text-slate-500 text-xs">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300">Block A - Student in corridor after midnight</span>
                      </div>
                      <span className="text-slate-500 text-xs">15 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">Block C - Resolved: Student returned to room safely</span>
                      </div>
                      <span className="text-slate-500 text-xs">1 hour ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Shield className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 text-sm">CCTV footage is monitored by authorized supervisors only. All alerts are reviewed by trained staff.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {activeTab === "stories" && filteredStories.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-3xl bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">No stories found</h3>
            <p className="text-slate-500 mb-6">Be the first to share your story and help others.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium"
            >
              Share Your Story
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}