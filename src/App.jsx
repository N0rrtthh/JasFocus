import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Play, Pause, Check, Trash2, Clock, List, Timer, CheckCircle2, ArrowRight } from 'lucide-react';

// --- Utility Functions ---

// Motivational messages array
const motivationalMessages = [
  "You're doing amazing! 💪",
  "Keep up the great work! 🌟",
  "Focus mode: activated! 🎯",
  "You've got this! 🚀",
  "Crushing it right now! 🔥",
  "Stay focused, stay awesome! ✨",
  "Your future self will thank you! 🙌",
  "Progress over perfection! 📈",
  "One task closer to your goals! 🎉",
  "You're unstoppable! ⚡",
  "Making it happen! 💯",
  "Discipline is choosing between what you want now and what you want most! 🎓",
  "Small steps, big results! 👣",
  "You're building momentum! 🌊",
  "Keep the energy flowing! ⚡",
  "Productivity ninja in action! 🥷",
  "Time well invested! ⏰",
  "Focused and fierce! 🦁",
  "You're in the zone! 🎮",
  "Excellence in progress! 👑"
];

// Get random motivational message
const getRandomMotivation = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

// Format seconds into HH:MM:SS
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

// --- Components ---

const MotivationalMessage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: -20 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 1, -1, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
      className="glass-card p-4 px-8 rounded-2xl border-2 border-yellow-400/50 shadow-2xl"
      style={{
        background: 'rgba(251, 191, 36, 0.15)',
        boxShadow: '0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.2)'
      }}
    >
      <p className="text-white font-bold text-xl text-center whitespace-nowrap">
        {message}
      </p>
    </motion.div>
  </motion.div>
);

const CompletionCelebration = ({ taskName, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      {/* Confetti particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: ['#60a5fa', '#a78bfa', '#ec4899', '#34d399', '#fbbf24'][Math.floor(Math.random() * 5)],
            width: Math.random() * 12 + 6 + 'px',
            height: Math.random() * 12 + 6 + 'px',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: [(Math.random() - 0.5) * 800],
            y: [-300 - Math.random() * 300],
            opacity: [1, 1, 0],
            scale: [0, 1, 1],
            rotate: [0, Math.random() * 720]
          }}
          transition={{
            duration: 2 + Math.random() * 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: Math.random() * 0.2
          }}
        />
      ))}
      
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="glass-card p-12 rounded-3xl border-4 border-green-400/50 shadow-2xl relative z-10"
        style={{
          background: 'rgba(34, 197, 94, 0.15)',
          boxShadow: '0 0 60px rgba(34, 197, 94, 0.4), 0 0 120px rgba(34, 197, 94, 0.2), inset 0 0 60px rgba(34, 197, 94, 0.1)'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, times: [0, 0.6, 1] }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="mb-6"
          >
            <CheckCircle2 className="w-32 h-32 text-green-400 drop-shadow-lg success-checkmark" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-3 tracking-tight"
          >
            Task Complete!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-green-300 font-medium text-center max-w-md"
          >
            "{taskName}"
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Notification = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -100, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -100, scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-lg px-4"
  >
    <div className="glass-card p-5 px-8 rounded-2xl border-2 border-green-400/50 shadow-2xl notification-glow">
      <div className="flex items-center justify-center space-x-3">
        <ArrowRight className="w-6 h-6 text-green-400 flex-shrink-0" />
        <p className="text-white font-semibold text-lg text-center break-words">{message}</p>
      </div>
    </div>
  </motion.div>
);

const GlassCard = ({ children, className = '', ...props }) => (
  <motion.div
    className={`glass-card p-6 rounded-xl ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    {...props}
  >
    {children}
  </motion.div>
);

const Button = ({ children, onClick, className = '', icon: Icon, variant = 'default', ...props }) => {
  const baseClasses = 'flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg';
  
  const variantClasses = {
    default: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white border border-blue-400/30',
    success: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white border border-green-400/30',
    danger: 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white border border-red-400/30',
    warning: 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white border border-orange-400/30',
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </motion.button>
  );
};

const TaskItem = ({ task, onToggle, onRemove, onStart, isCurrent, isPaused }) => {
  const statusClass = task.completed
    ? 'bg-green-500/20 border-green-500/50'
    : isCurrent
    ? 'bg-blue-500/20 border-blue-500/50'
    : 'bg-white/10 border-white/20';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between p-3 mb-2 rounded-lg border ${statusClass} fade-in`}
    >
      <div className="flex items-center flex-grow min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="form-checkbox h-5 w-5 text-blue-500 bg-white/10 border-white/30 rounded focus:ring-blue-500 transition duration-150 ease-in-out"
        />
        <span
          className={`ml-3 text-lg font-medium truncate ${
            task.completed ? 'line-through text-white/50' : 'text-white'
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="flex items-center space-x-3 ml-4">
        <span className={`text-sm font-mono ${isCurrent ? 'text-yellow-400' : 'text-white/70'}`}>
          {formatTime(task.timeRemaining)}
        </span>
        {!task.completed && (
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onStart(task.id)}
            className={`p-2 h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border ${
              isCurrent && !isPaused 
                ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 border-red-400/30' 
                : 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 border-green-400/30'
            }`}
            title={isCurrent && !isPaused ? 'Pause' : 'Play'}
          >
            {isCurrent && !isPaused ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 text-white" />
            )}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(task.id)}
          className="p-2 h-10 w-10 bg-gradient-to-br from-red-500/60 via-red-600/60 to-red-700/60 hover:from-red-600/70 hover:via-red-700/70 hover:to-red-800/70 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border border-red-400/30"
          title="Delete"
        >
          <Trash2 className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const TaskList = ({ tasks, currentTaskId, isPaused, onToggle, onRemove, onStart }) => {
  const activeTasks = tasks.filter(t => !t.completed);
  
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
        <List className="w-6 h-6 mr-2" /> Active Tasks
      </h2>
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        {activeTasks.length === 0 ? (
          <p className="text-white/50 text-center py-10">No active tasks. Add one to get started!</p>
        ) : (
          activeTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onRemove={onRemove}
              onStart={onStart}
              isCurrent={task.id === currentTaskId}
              isPaused={isPaused}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CompletedTasksList = ({ tasks, onRemove }) => {
  const completedTasks = tasks.filter(t => t.completed);
  
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
        <CheckCircle2 className="w-6 h-6 mr-2 text-green-400" /> Completed Tasks
      </h2>
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        {completedTasks.length === 0 ? (
          <p className="text-white/50 text-center py-10">No completed tasks yet.</p>
        ) : (
          <AnimatePresence>
            {completedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 mb-2 rounded-lg border bg-green-500/10 border-green-500/30 fade-in"
              >
                <div className="flex items-center flex-grow min-w-0">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-lg font-medium line-through text-white/70 truncate">
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <span className="text-sm font-mono text-green-400">
                    {formatTime(task.initialTime)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(task.id)}
                    className="p-2 h-10 w-10 bg-gradient-to-br from-red-500/60 via-red-600/60 to-red-700/60 hover:from-red-600/70 hover:via-red-700/70 hover:to-red-800/70 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border border-red-400/30"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const TimerDisplay = ({ currentTask, isPaused }) => {
  if (!currentTask) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/70">
        <Clock className="w-20 h-20 mb-6" />
        <p className="text-2xl font-light">Select a task to start the timer.</p>
      </div>
    );
  }

  const percentage =
    100 - (currentTask.timeRemaining / currentTask.initialTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full relative py-8">
      <h2 className="text-4xl font-bold text-white/90 mb-8 truncate max-w-full px-4 text-center tracking-tight">
        {currentTask.text}
      </h2>
      
      <div className="relative w-80 h-80 mb-8">
        {/* Glow effect background */}
        <div className="absolute inset-0 rounded-full timer-glow"></div>
        
        <svg className="w-full h-full transform -rotate-90 relative z-10">
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            className="text-white/10"
            strokeWidth="16"
            stroke="currentColor"
            fill="transparent"
            r="150"
            cx="160"
            cy="160"
          />
          <motion.circle
            strokeWidth="16"
            strokeDasharray={2 * Math.PI * 150}
            strokeDashoffset={2 * Math.PI * 150 * (1 - percentage / 100)}
            strokeLinecap="round"
            stroke="url(#timerGradient)"
            fill="transparent"
            filter="url(#glow)"
            r="150"
            cx="160"
            cy="160"
            initial={{ strokeDashoffset: 2 * Math.PI * 150 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 150 * (1 - percentage / 100) }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            key={currentTask.timeRemaining}
            className={`text-8xl font-extrabold ${
              isPaused ? 'text-red-400' : 'timer-text-gradient'
            } drop-shadow-2xl timer-font`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {formatTime(currentTask.timeRemaining)}
          </motion.p>
        </div>
      </div>
      
      <div className={`flex items-center space-x-3 text-xl font-semibold ${isPaused ? 'text-red-400 pulse-animation' : 'text-green-400'}`}>
        {isPaused ? (
          <>
            <Pause className="w-7 h-7" />
            <span className="tracking-wide">Paused</span>
          </>
        ) : (
          <>
            <Play className="w-7 h-7" />
            <span className="tracking-wide">In Progress</span>
          </>
        )}
      </div>
    </div>
  );
};

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (text.trim() && totalSeconds > 0) {
      onAddTask(text.trim(), totalSeconds);
      setText('');
      // Don't reset time inputs - keep them for next task
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Task description (e.g., Code review)"
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
      />
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-white/70" />
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            className="w-16 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <span className="text-white/70 text-sm">hrs</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            max="59"
            className="w-16 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <span className="text-white/70 text-sm">min</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
            min="0"
            max="59"
            className="w-16 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <span className="text-white/70 text-sm">sec</span>
        </div>
        <Button
          type="submit"
          className="flex-grow"
          icon={Plus}
          variant="default"
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

// --- Main App Component ---

function App() {
  // Load initial state from localStorage or use defaults
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('jasFocusTasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { id: 1, text: 'Design UI Components', initialTime: 1500, timeRemaining: 1500, completed: false },
      { id: 2, text: 'Implement Timer Logic', initialTime: 1200, timeRemaining: 1200, completed: false },
      { id: 3, text: 'Deploy to Sandbox', initialTime: 600, timeRemaining: 600, completed: false },
    ];
  });

  const [currentTaskId, setCurrentTaskId] = useState(() => {
    const savedCurrentTaskId = localStorage.getItem('jasFocusCurrentTaskId');
    return savedCurrentTaskId ? parseInt(savedCurrentTaskId) : null;
  });

  const [isPaused, setIsPaused] = useState(() => {
    const savedIsPaused = localStorage.getItem('jasFocusIsPaused');
    return savedIsPaused !== null ? savedIsPaused === 'true' : true;
  });

  const [notification, setNotification] = useState(null);
  const [celebratingTask, setCelebratingTask] = useState(null);
  const [motivationalMessage, setMotivationalMessage] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jasFocusTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save currentTaskId to localStorage whenever it changes
  useEffect(() => {
    if (currentTaskId !== null) {
      localStorage.setItem('jasFocusCurrentTaskId', currentTaskId.toString());
    } else {
      localStorage.removeItem('jasFocusCurrentTaskId');
    }
  }, [currentTaskId]);

  // Save isPaused to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jasFocusIsPaused', isPaused.toString());
  }, [isPaused]);

  const currentTask = tasks.find(t => t.id === currentTaskId);

  // Function to show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  // Function to show motivational message
  const showMotivation = () => {
    setMotivationalMessage(getRandomMotivation());
    setTimeout(() => setMotivationalMessage(null), 3000);
  };

  // Function to find the next uncompleted task
  const findNextTask = useCallback(() => {
    const currentIndex = tasks.findIndex(t => t.id === currentTaskId);
    const nextTask = tasks.slice(currentIndex + 1).find(t => !t.completed);
    return nextTask;
  }, [tasks, currentTaskId]);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    let motivationInterval = null;

    if (currentTaskId && !isPaused && currentTask && currentTask.timeRemaining > 0) {
      interval = setInterval(() => {
        setTasks(prevTasks =>
          prevTasks.map(task => {
            if (task.id === currentTaskId) {
              return { ...task, timeRemaining: task.timeRemaining - 1 };
            }
            return task;
          })
        );
      }, 1000);

      // Show motivational messages every 30 seconds while task is running
      motivationInterval = setInterval(() => {
        showMotivation();
      }, 30000);

      // Show initial motivation when task starts
      showMotivation();
    } else if (currentTask && currentTask.timeRemaining === 0) {
      // Task completed, auto-advance logic
      clearInterval(interval);
      setIsPaused(true);

      // Show celebration animation
      setCelebratingTask(currentTask.text);

      // 1. Mark current task as completed
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === currentTaskId ? { ...task, completed: true, timeRemaining: 0 } : task
        )
      );

      // 2. Find and prepare the next task (will start after celebration)
      const nextTask = findNextTask();
      if (nextTask) {
        // Next task will be started after celebration completes
        setTimeout(() => {
          showNotification(`Starting: "${nextTask.text}"`);
          setCurrentTaskId(nextTask.id);
          setIsPaused(false);
        }, 2500);
      } else {
        setTimeout(() => {
          showNotification('All tasks completed! Great job! 🎉');
          setCurrentTaskId(null);
        }, 2500);
      }
    }

    return () => {
      clearInterval(interval);
      if (motivationInterval) clearInterval(motivationInterval);
    };
  }, [currentTaskId, isPaused, currentTask, findNextTask]);

  // Handlers
  const handleAddTask = (text, timeInSeconds) => {
    const newTask = {
      id: Date.now(),
      text,
      initialTime: timeInSeconds,
      timeRemaining: timeInSeconds,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        // If marking as complete, stop the timer if it's the current task
        if (!task.completed && task.id === currentTaskId) {
          setIsPaused(true);
          setCurrentTaskId(null);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (id === currentTaskId) {
      setIsPaused(true);
      setCurrentTaskId(null);
    }
  };

  const handleStartTask = (id) => {
    if (id === currentTaskId) {
      // Toggle pause/play for the current task
      setIsPaused(!isPaused);
    } else {
      // Switch to a new task and start it
      setCurrentTaskId(id);
      setIsPaused(false);
    }
  };

  // Stats for the third bento item
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTimeSeconds = tasks.reduce((sum, t) => sum + t.initialTime, 0);
  const timeSpentSeconds = tasks.reduce((sum, t) => sum + (t.initialTime - t.timeRemaining), 0);

  return (
    <div className="p-4 w-full min-h-screen flex flex-col items-center">
      <AnimatePresence>
        {notification && <Notification message={notification} />}
        {motivationalMessage && <MotivationalMessage message={motivationalMessage} />}
        {celebratingTask && (
          <CompletionCelebration 
            taskName={celebratingTask} 
            onComplete={() => setCelebratingTask(null)}
          />
        )}
      </AnimatePresence>
      
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg tracking-tight">
        <Timer className="inline w-10 h-10 mr-2 text-blue-400" />
        Jas Focus
      </h1>
      <div className="bento-grid">
        {/* Timer Display - No box, just the content */}
        <div className="bento-item-1" style={{ minHeight: '450px' }}>
          <TimerDisplay currentTask={currentTask} isPaused={isPaused} />
        </div>

        {/* Bento Item 2: Task List and Input - Blue */}
        <div className="bento-item-2 bento-box-tasks flex flex-col p-6" style={{ minHeight: '500px' }}>
          <TaskInput onAddTask={handleAddTask} />
          <div className="mt-4 flex-grow">
            <TaskList
              tasks={tasks}
              currentTaskId={currentTaskId}
              isPaused={isPaused}
              onToggle={handleToggleTask}
              onRemove={handleRemoveTask}
              onStart={handleStartTask}
            />
          </div>
        </div>

        {/* Bento Item 3: Stats and Controls - Purple */}
        <div className="bento-item-3 bento-box-stats flex flex-col justify-between p-6" style={{ minHeight: '250px' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center text-white tracking-tight">
            <Clock className="w-6 h-6 mr-2" /> Progress
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-lg">
              <span className="text-white/70">Total Tasks:</span>
              <span className="font-bold text-white">{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-white/70">Completed:</span>
              <span className="font-bold text-green-400">{completedTasks}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-white/70">Total Time:</span>
              <span className="font-bold text-white">{formatTime(totalTimeSeconds)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-white/70">Time Spent:</span>
              <span className="font-bold text-yellow-400">{formatTime(timeSpentSeconds)}</span>
            </div>
          </div>
          <Button
            onClick={() => {
              // Reset all tasks to their initial state
              setTasks(tasks.map(t => ({
                ...t,
                completed: false,
                timeRemaining: t.initialTime
              })));
              setCurrentTaskId(null);
              setIsPaused(true);
            }}
            className="mt-4 w-full"
            icon={Trash2}
            variant="danger"
          >
            Reset All Tasks
          </Button>
        </div>

        {/* Bento Item 4: Completed Tasks - Green */}
        <div className="bento-item-4 bento-box-completed flex flex-col p-6" style={{ minHeight: '300px' }}>
          <CompletedTasksList tasks={tasks} onRemove={handleRemoveTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
