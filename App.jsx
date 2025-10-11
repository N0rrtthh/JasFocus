import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Play, Pause, Check, Trash2, Clock, List, Zap } from 'lucide-react';

// --- Utility Functions ---

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

const Button = ({ children, onClick, className = '', icon: Icon, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${className}`}
    {...props}
  >
    {Icon && <Icon className="w-5 h-5 mr-2" />}
    {children}
  </motion.button>
);

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
          <Button
            onClick={() => onStart(task.id)}
            className={`p-2 h-10 w-10 flex items-center justify-center ${
              isCurrent && !isPaused ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
            title={isCurrent && !isPaused ? 'Pause' : 'Play'}
          >
            {isCurrent && !isPaused ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>
        )}
        <Button
          onClick={() => onRemove(task.id)}
          className="p-2 h-10 w-10 bg-red-500/50 hover:bg-red-600/70 flex items-center justify-center"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

const TaskList = ({ tasks, currentTaskId, isPaused, onToggle, onRemove, onStart }) => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
        <List className="w-6 h-6 mr-2" /> Task List
      </h2>
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        {tasks.length === 0 ? (
          <p className="text-white/50 text-center py-10">No tasks yet. Add one to get started!</p>
        ) : (
          tasks.map((task) => (
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

const TimerDisplay = ({ currentTask, isPaused }) => {
  if (!currentTask) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/70">
        <Clock className="w-20 h-20 mb-6" />
        <p className="text-2xl">Select a task to start the timer.</p>
      </div>
    );
  }

  const percentage =
    100 - (currentTask.timeRemaining / currentTask.initialTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="relative w-64 h-64 mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-white/20"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="128"
            cy="128"
          />
          <motion.circle
            className="text-blue-400"
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - percentage / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
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
            className={`text-7xl font-extrabold ${
              isPaused ? 'text-red-400' : 'text-white'
            } drop-shadow-lg font-mono`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {formatTime(currentTask.timeRemaining)}
          </motion.p>
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-white/90 mb-4 truncate max-w-full px-4 text-center">
        {currentTask.text}
      </h2>
      <div className={`flex items-center space-x-2 text-xl font-medium ${isPaused ? 'text-red-400 pulse-animation' : 'text-green-400'}`}>
        {isPaused ? (
          <>
            <Pause className="w-6 h-6" />
            <span>Paused</span>
          </>
        ) : (
          <>
            <Play className="w-6 h-6" />
            <span>In Progress</span>
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
      setHours(0);
      setMinutes(25);
      setSeconds(0);
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
          className="flex-grow bg-blue-600 hover:bg-blue-700 text-white"
          icon={Plus}
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

// --- Main App Component ---

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design UI Components', initialTime: 1500, timeRemaining: 1500, completed: false }, // 25 mins
    { id: 2, text: 'Implement Timer Logic', initialTime: 1200, timeRemaining: 1200, completed: false }, // 20 mins
    { id: 3, text: 'Deploy to Sandbox', initialTime: 600, timeRemaining: 600, completed: false }, // 10 mins
  ]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  const currentTask = tasks.find(t => t.id === currentTaskId);

  // Function to find the next uncompleted task
  const findNextTask = useCallback(() => {
    const currentIndex = tasks.findIndex(t => t.id === currentTaskId);
    const nextTask = tasks.slice(currentIndex + 1).find(t => !t.completed);
    return nextTask ? nextTask.id : null;
  }, [tasks, currentTaskId]);

  // Timer Effect
  useEffect(() => {
    let interval = null;

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
    } else if (currentTask && currentTask.timeRemaining === 0) {
      // Task completed, auto-advance logic
      clearInterval(interval);
      setIsPaused(true);

      // 1. Mark current task as completed
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === currentTaskId ? { ...task, completed: true, timeRemaining: 0 } : task
        )
      );

      // 2. Find and start the next task
      const nextTaskId = findNextTask();
      if (nextTaskId) {
        setCurrentTaskId(nextTaskId);
        setIsPaused(false); // Auto-start the next task
      } else {
        setCurrentTaskId(null); // No more tasks
      }
    }

    return () => clearInterval(interval);
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
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
        <Zap className="inline w-10 h-10 mr-2 text-blue-400" />
        Jas Focus
      </h1>
      <div className="bento-grid">
        {/* Bento Item 1: Current Task Timer - NOW AT TOP */}
        <GlassCard className="bento-item-1" style={{ minHeight: '400px' }}>
          <TimerDisplay currentTask={currentTask} isPaused={isPaused} />
        </GlassCard>

        {/* Bento Item 2: Task List and Input */}
        <GlassCard className="bento-item-2 flex flex-col" style={{ minHeight: '500px' }}>
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
        </GlassCard>

        {/* Bento Item 3: Stats and Controls */}
        <GlassCard className="bento-item-3 flex flex-col justify-between" style={{ minHeight: '250px' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
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
            className="mt-4 w-full bg-red-600/70 hover:bg-red-700/80 text-white"
            icon={Trash2}
          >
            Reset All Tasks
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}

export default App;

