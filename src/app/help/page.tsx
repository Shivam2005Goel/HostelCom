"use client";

import { useState } from "react";
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
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Feeling = "all" | "lonely" | "failure" | "breakup" | "homesick";

interface Story {
  id: number;
  feeling: Exclude<Feeling, "all">;
  title: string;
  content: string;
  author: string;
  likes: number;
  readTime: string;
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
  },
  {
    id: 5,
    feeling: "lonely",
    title: "The Roommate Who Became Family",
    content: "I was always the 'quiet one' - never reached out, always kept to myself. My roommate made it her mission to include me. She dragged me to events, introduced me to people. Now I run the cultural club! You don't have to be extroverted to connect - sometimes one person is enough.",
    author: "Anonymous, 1st Year",
    likes: 312,
    readTime: "2 min",
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
];

const quickTips = [
  { icon: Calendar, title: "Daily Check-in", desc: "Track your mood daily" },
  { icon: BookOpen, title: "Resource Library", desc: "Articles & guides" },
  { icon: Phone, title: "Emergency Line", desc: "24/7 support" },
  { icon: Lightbulb, title: "Quick Tips", desc: "Instant advice" },
];

const feelingLabels: Record<Feeling, string> = {
  all: "All",
  lonely: "Lonely",
  failure: "Failure",
  breakup: "Breakup",
  homesick: "Homesick",
};

const feelingColors: Record<Feeling, string> = {
  all: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  lonely: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  failure: "bg-red-500/20 text-red-300 border-red-500/30",
  breakup: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  homesick: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const feelingBgColors: Record<Feeling, string> = {
  all: "from-indigo-500/20 to-purple-500/20",
  lonely: "from-blue-500/20 to-cyan-500/20",
  failure: "from-red-500/20 to-orange-500/20",
  breakup: "from-pink-500/20 to-rose-500/20",
  homesick: "from-amber-500/20 to-yellow-500/20",
};

export default function HelpPage() {
  const [filter, setFilter] = useState<Feeling>("all");
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [showQuickHelp, setShowQuickHelp] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());

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
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>You're not alone</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hold-on <span className="text-gradient">Help</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real stories from students who've been where you are. 
            Sometimes, knowing you're not alone is the first step to feeling better.
          </p>
        </motion.div>

        {/* Quick Actions Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {quickTips.map((tip, index) => (
            <motion.button
              key={tip.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => index === 2 && setShowQuickHelp(true)}
              className="glass-panel p-4 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all text-left group"
            >
              <tip.icon className="w-6 h-6 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white text-sm">{tip.title}</h3>
              <p className="text-slate-500 text-xs">{tip.desc}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Daily Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Quote className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-lg text-white italic mb-2">"{quotes[currentQuote].text}"</p>
              <p className="text-slate-500 text-sm">— {quotes[currentQuote].author}</p>
            </div>
            <button 
              onClick={() => setCurrentQuote((prev) => (prev + 1) % quotes.length)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 font-medium">How are you feeling today?</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(feelingLabels) as Feeling[]).map((feeling) => (
              <motion.button
                key={feeling}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(feeling)}
                className={`px-5 py-2.5 rounded-xl border transition-all duration-200 font-medium ${
                  filter === feeling
                    ? `${feelingColors[feeling]} shadow-lg`
                    : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:border-white/20"
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
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-400" />
            <span className="text-slate-400">
              <span className="text-white font-semibold">2,847</span> students shared their story
            </span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-slate-400">
              <span className="text-white font-semibold">89%</span> found it helpful
            </span>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group overflow-hidden relative`}
                onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feelingBgColors[story.feeling]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${feelingColors[story.feeling]}`}>
                      {feelingLabels[story.feeling]}
                    </span>
                    <span className="text-slate-500 text-sm flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
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
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Heart className={`w-4 h-4 ${likedStories.has(story.id) ? "text-pink-500 fill-pink-500" : ""}`} />
                      <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                      <span className="mx-2">•</span>
                      <span>{story.author}</span>
                    </div>
                    <span className="text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {expandedStory === story.id ? "Show less" : "Read more"}
                    </span>
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
          transition={{ delay: 0.3 }}
          className="glass-panel p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-center"
        >
          <MessageCircle className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Have a story to share?</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Your story could help someone who's going through what you once did. 
            Share anonymously and make a difference.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors"
          >
            <Send className="w-5 h-5" />
            Share Your Story
          </motion.button>
        </motion.div>

        {/* Emergency Support Modal */}
        <AnimatePresence>
          {showQuickHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowQuickHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel p-8 rounded-2xl border border-red-500/30 bg-gray-900/90 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Need immediate help?</h3>
                      <p className="text-slate-400 text-sm">We're here for you 24/7</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowQuickHelp(false)}
                    className="text-slate-500 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full p-4 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors text-left">
                    <span className="text-white font-semibold">Emergency Helpline</span>
                    <p className="text-slate-400 text-sm">1800-XXX-XXXX (Toll Free)</p>
                  </button>
                  <button className="w-full p-4 rounded-xl bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors text-left">
                    <span className="text-white font-semibold">Talk to a Counselor</span>
                    <p className="text-slate-400 text-sm">Available now</p>
                  </button>
                  <button className="w-full p-4 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-colors text-left">
                    <span className="text-white font-semibold">Chat with Peer Listener</span>
                    <p className="text-slate-400 text-sm">Student volunteers</p>
                  </button>
                </div>
                
                <p className="text-slate-500 text-sm text-center mt-6 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your conversation is 100% confidential
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No stories found</h3>
            <p className="text-slate-500">Be the first to share your story and help others.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}