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
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: -10 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="w-full flex justify-center mt-4"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.02, 1],
      }}
      transition={{ 
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
      className="p-4 px-8 sm:p-5 sm:px-10 rounded-full border-2 motivational-message"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25), rgba(236, 72, 153, 0.25))',
        borderImage: 'linear-gradient(135deg, #60a5fa, #a78bfa, #ec4899) 1',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '9999px',
        boxShadow: '0 0 40px rgba(147, 51, 234, 0.5), 0 0 80px rgba(147, 51, 234, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <p className="text-white font-bold text-base sm:text-xl text-center drop-shadow-lg whitespace-nowrap">
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
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ pointerEvents: 'none' }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" style={{ pointerEvents: 'none' }}></div>
      
      {/* Confetti particles OUTSIDE the modal */}
      <div className="absolute inset-0 z-30 overflow-hidden" style={{ pointerEvents: 'none' }}>
        {[...Array(25)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / 25;
          const distance = 300 + Math.random() * 200;
          const xMovement = Math.cos(angle) * distance;
          const yMovement = Math.sin(angle) * distance - 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                background: ['#60a5fa', '#a78bfa', '#ec4899', '#34d399', '#fbbf24'][Math.floor(Math.random() * 5)],
                width: Math.random() * 10 + 6 + 'px',
                height: Math.random() * 10 + 6 + 'px',
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: [0, xMovement],
                y: [0, yMovement],
                opacity: [1, 1, 0],
                scale: [0, 1, 0.8],
                rotate: [0, Math.random() * 360]
              }}
              transition={{
                duration: 2 + Math.random() * 0.8,
                ease: [0.34, 1.56, 0.64, 1],
                delay: Math.random() * 0.15
              }}
            />
          );
        })}
      </div>
      
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="glass-card p-8 sm:p-12 rounded-[32px] border-4 border-green-400/50 shadow-2xl relative z-20 max-w-[90vw]"
        style={{
          background: 'rgba(34, 197, 94, 0.15)',
          boxShadow: '0 0 60px rgba(34, 197, 94, 0.4), 0 0 120px rgba(34, 197, 94, 0.2), inset 0 0 60px rgba(34, 197, 94, 0.1)',
          pointerEvents: 'none'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, times: [0, 0.6, 1] }}
          className="flex flex-col items-center relative z-10"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="mb-4 sm:mb-6"
          >
            <CheckCircle2 className="w-20 h-20 sm:w-32 sm:h-32 text-green-400 drop-shadow-lg success-checkmark" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-3 tracking-tight"
          >
            Task Complete!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-2xl text-green-300 font-medium text-center max-w-md px-4"
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
    initial={{ opacity: 0, y: -100, x: 0 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, y: -100, x: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="fixed top-4 sm:top-8 right-4 sm:right-8 z-50 w-auto max-w-[90vw] sm:max-w-md"
  >
    <div 
      className="glass-card p-4 px-6 sm:p-5 sm:px-8 rounded-[24px] border-2 shadow-2xl notification-glow"
      style={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))',
        borderColor: 'rgba(74, 222, 128, 0.6)',
        boxShadow: '0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(34, 197, 94, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex items-center space-x-3">
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 drop-shadow-lg" />
        <p className="text-white font-semibold text-base sm:text-lg break-words drop-shadow-lg">{message}</p>
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
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 mb-2 rounded-lg border ${statusClass} fade-in gap-2 sm:gap-0`}
    >
      <div className="flex items-center flex-grow min-w-0 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="form-checkbox h-5 w-5 text-blue-500 bg-white/10 border-white/30 rounded focus:ring-blue-500 transition duration-150 ease-in-out flex-shrink-0"
        />
        <span
          className={`ml-3 text-base sm:text-lg font-medium break-words ${
            task.completed ? 'line-through text-white/50' : 'text-white'
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3 ml-8 sm:ml-4 w-full sm:w-auto justify-end">
        <span className={`text-sm font-mono ${isCurrent ? 'text-yellow-400' : 'text-white/70'}`}>
          {formatTime(task.timeRemaining)}
        </span>
        {!task.completed && (
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onStart(task.id)}
            className={`p-2 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border ${
              isCurrent && !isPaused 
                ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 border-red-400/30' 
                : 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 border-green-400/30'
            }`}
            title={isCurrent && !isPaused ? 'Pause' : 'Play'}
          >
            {isCurrent && !isPaused ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 text-white" />
            )}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(task.id)}
          className="p-2 h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-red-500/60 via-red-600/60 to-red-700/60 hover:from-red-600/70 hover:via-red-700/70 hover:to-red-800/70 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border border-red-400/30"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const TaskList = ({ tasks, currentTaskId, isPaused, onToggle, onRemove, onStart }) => {
  const activeTasks = tasks.filter(t => !t.completed);
  
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center text-white">
        <List className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Active Tasks
      </h2>
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        {activeTasks.length === 0 ? (
          <p className="text-white/50 text-center py-10 text-sm sm:text-base">No active tasks. Add one to get started!</p>
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
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center text-white">
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-400" /> Completed Tasks
      </h2>
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        {completedTasks.length === 0 ? (
          <p className="text-white/50 text-center py-10 text-sm sm:text-base">No completed tasks yet.</p>
        ) : (
          <AnimatePresence>
            {completedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 mb-2 rounded-lg border bg-green-500/10 border-green-500/30 fade-in gap-2 sm:gap-0"
              >
                <div className="flex items-center flex-grow min-w-0 w-full sm:w-auto">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-medium line-through text-white/70 break-words">
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-8 sm:ml-4 w-full sm:w-auto justify-end">
                  <span className="text-sm font-mono text-green-400">
                    {formatTime(task.initialTime)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(task.id)}
                    className="p-2 h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-red-500/60 via-red-600/60 to-red-700/60 hover:from-red-600/70 hover:via-red-700/70 hover:to-red-800/70 flex items-center justify-center rounded-xl transition-all duration-300 shadow-lg border border-red-400/30"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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

const TimerDisplay = ({ currentTask, isPaused, motivationalMessage }) => {
  if (!currentTask) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/70 py-8">
        <Clock className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6" />
        <p className="text-lg sm:text-2xl font-light text-center px-4">Select a task to start the timer.</p>
      </div>
    );
  }

  const percentage =
    100 - (currentTask.timeRemaining / currentTask.initialTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full relative py-4 sm:py-8 px-4">
      <h2 className="text-2xl sm:text-4xl font-bold text-white/90 mb-6 sm:mb-8 text-center tracking-tight break-words max-w-full">
        {currentTask.text}
      </h2>
      
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-6 sm:mb-8 timer-display-mobile flex-shrink-0">
        {/* Glow effect background */}
        <div className="absolute inset-0 rounded-full timer-glow"></div>
        
        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 256 256">
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
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="128"
            cy="128"
          />
          <motion.circle
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - percentage / 100)}
            strokeLinecap="round"
            stroke="url(#timerGradient)"
            fill="transparent"
            filter="url(#glow)"
            r="120"
            cx="128"
            cy="128"
            initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - percentage / 100) }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            key={currentTask.timeRemaining}
            className={`text-5xl sm:text-8xl font-extrabold ${
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
      
      <div className={`flex items-center space-x-2 sm:space-x-3 text-base sm:text-xl font-semibold mb-4 ${isPaused ? 'text-red-400 pulse-animation' : 'text-green-400'}`}>
        {isPaused ? (
          <>
            <Pause className="w-5 h-5 sm:w-7 sm:h-7" />
            <span className="tracking-wide">Paused</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 sm:w-7 sm:h-7" />
            <span className="tracking-wide">In Progress</span>
          </>
        )}
      </div>

      {/* Motivational message displayed under the timer */}
      <AnimatePresence>
        {motivationalMessage && !isPaused && (
          <MotivationalMessage message={motivationalMessage} />
        )}
      </AnimatePresence>
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
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Clock className="w-5 h-5 text-white/70 hidden sm:block" />
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              className="w-14 sm:w-16 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
            />
            <span className="text-white/70 text-xs sm:text-sm">hrs</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="59"
              className="w-14 sm:w-16 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
            />
            <span className="text-white/70 text-xs sm:text-sm">min</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="59"
              className="w-14 sm:w-16 p-2 rounded-lg bg-white/10 border border-white/20 text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
            />
            <span className="text-white/70 text-xs sm:text-sm">sec</span>
          </div>
        </div>
        <Button
          type="submit"
          className="flex-grow w-full sm:w-auto"
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
    setTimeout(() => setNotification(null), 5000); // Increased to 5 seconds
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
    let motivationTimeout = null;

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

      // Function to cycle motivational messages
      const cycleMotivation = () => {
        // Clear any existing message
        setMotivationalMessage(null);
        
        // Show new message after a brief delay
        motivationTimeout = setTimeout(() => {
          setMotivationalMessage(getRandomMotivation());
        }, 100);
      };

      // Show initial motivation when task starts
      cycleMotivation();
      
      // Show new motivational message every 10 seconds
      motivationInterval = setInterval(() => {
        cycleMotivation();
      }, 10000); // Changed to 10 seconds

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
      if (motivationTimeout) clearTimeout(motivationTimeout);
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
    <div className="p-2 sm:p-4 w-full min-h-screen flex flex-col items-center">
      <AnimatePresence>
        {notification && <Notification message={notification} />}
        {celebratingTask && (
          <CompletionCelebration 
            taskName={celebratingTask} 
            onComplete={() => setCelebratingTask(null)}
          />
        )}
      </AnimatePresence>
      
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-8 drop-shadow-lg tracking-tight text-center">
        <Timer className="inline w-8 h-8 sm:w-10 sm:h-10 mr-2 text-blue-400" />
        Jas Focus
      </h1>
      <div className="bento-grid">
        {/* Timer Display - No box, just the content */}
        <div className="bento-item-1" style={{ minHeight: '400px' }}>
          <TimerDisplay currentTask={currentTask} isPaused={isPaused} motivationalMessage={motivationalMessage} />
        </div>

        {/* Bento Item 2: Task List and Input - Blue */}
        <div className="bento-item-2 bento-box-tasks flex flex-col p-4 sm:p-6" style={{ minHeight: '400px' }}>
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
        <div className="bento-item-3 bento-box-stats flex flex-col justify-between p-4 sm:p-6" style={{ minHeight: '250px' }}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center text-white tracking-tight">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Progress
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-base sm:text-lg">
              <span className="text-white/70">Total Tasks:</span>
              <span className="font-bold text-white">{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center text-base sm:text-lg">
              <span className="text-white/70">Completed:</span>
              <span className="font-bold text-green-400">{completedTasks}</span>
            </div>
            <div className="flex justify-between items-center text-base sm:text-lg">
              <span className="text-white/70">Total Time:</span>
              <span className="font-bold text-white">{formatTime(totalTimeSeconds)}</span>
            </div>
            <div className="flex justify-between items-center text-base sm:text-lg">
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
            className="mt-4 w-full text-sm sm:text-base"
            icon={Trash2}
            variant="danger"
          >
            Reset All Tasks
          </Button>
        </div>

        {/* Bento Item 4: Completed Tasks - Green */}
        <div className="bento-item-4 bento-box-completed flex flex-col p-4 sm:p-6" style={{ minHeight: '250px' }}>
          <CompletedTasksList tasks={tasks} onRemove={handleRemoveTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
