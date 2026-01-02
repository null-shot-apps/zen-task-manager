'use client';

import { useState } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false
      }]);
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-2xl mx-auto pt-24 pb-16 px-8">
        <h1 className="text-5xl font-bold text-black tracking-tight">Tasks</h1>
      </div>

      {/* Task List */}
      <div className="max-w-2xl mx-auto px-8 pb-32">
        {tasks.length === 0 && !isAdding && (
          <p className="text-gray-400 text-center py-16">No tasks yet</p>
        )}

        {tasks.map((task, index) => (
          <div key={task.id}>
            {index > 0 && <div className="border-t border-gray-200" />}
            <div className="py-8 flex items-center gap-6 group">
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-shrink-0 w-6 h-6 rounded-full border border-black transition-all hover:bg-black hover:border-black"
              >
                {task.completed && (
                  <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className={`flex-1 text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-black'}`}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-black"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Add Task Input */}
        {isAdding && (
          <div>
            {tasks.length > 0 && <div className="border-t border-gray-200" />}
            <div className="py-8 flex items-center gap-6">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-300" />
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTask();
                  if (e.key === 'Escape') {
                    setIsAdding(false);
                    setNewTaskText('');
                  }
                }}
                placeholder="What needs to be done?"
                className="flex-1 text-lg text-black placeholder-gray-400 outline-none bg-transparent"
                autoFocus
              />
              <button
                onClick={addTask}
                className="text-black hover:text-gray-600 font-medium"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="fixed bottom-12 right-12 w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}

