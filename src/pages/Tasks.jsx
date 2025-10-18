import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiCheck, FiEdit2, FiTrash2, FiSave, FiX, FiList } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editText, setEditText] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const savedTasks = localStorage.getItem('learnify_tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks)
    localStorage.setItem('learnify_tasks', JSON.stringify(updatedTasks))
  }

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      const updatedTasks = [...tasks, task]
      saveTasks(updatedTasks)
      setNewTask('')
      toast.success('Task added successfully!')
    }
  }

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    saveTasks(updatedTasks)
    toast.info('Task status updated!')
  }

  const startEditing = (task) => {
    setEditingTaskId(task.id)
    setEditText(task.text)
  }

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTaskId ? { ...task, text: editText.trim() } : task
      )
      saveTasks(updatedTasks)
      setEditingTaskId(null)
      setEditText('')
      toast.success('Task updated successfully!')
    }
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditText('')
  }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    saveTasks(updatedTasks)
    toast.success('Task deleted successfully!')
  }

  const filteredTasks = tasks.filter(task => {
    switch (activeFilter) {
      case 'completed':
        return task.completed
      case 'incomplete':
        return !task.completed
      default:
        return true
    }
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    incomplete: tasks.filter(task => !task.completed).length
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-indigo-500/20 mb-6">
            <FiList className="text-indigo-400 mr-2" />
            <span className="text-sm text-gray-300">Daily Learning Tasks</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your <span className="gradient-text">Tasks</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Organize your learning journey. Track your progress and stay motivated.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-effect-white rounded-2xl p-4 text-center border border-indigo-500/20">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Tasks</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center border border-green-500/20">
            <div className="text-2xl font-bold text-white">{stats.completed}</div>
            <div className="text-gray-400 text-sm">Completed</div>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center border border-orange-500/20">
            <div className="text-2xl font-bold text-white">{stats.incomplete}</div>
            <div className="text-gray-400 text-sm">Remaining</div>
          </div>
        </motion.div>

        {/* Add Task */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 mb-8 border border-indigo-500/20"
        >
          <div className="flex space-x-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What do you want to learn today?"
              className="flex-1 px-4 py-3 bg-zinc-800/50 border border-indigo-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTask}
              className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <FiPlus size={20} />
              <span>Add Task</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-2 mb-6"
        >
          {[
            { key: 'all', label: 'All Tasks', count: stats.total },
            { key: 'incomplete', label: 'Incomplete', count: stats.incomplete },
            { key: 'completed', label: 'Completed', count: stats.completed }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeFilter === filter.key
                  ? 'gradient-bg text-white shadow-lg'
                  : 'glass-effect text-gray-400 hover:text-white border border-indigo-500/20'
              }`}
            >
              <span>{filter.label}</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tasks List */}
        <motion.div
          layout
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-effect rounded-2xl p-12 text-center border border-indigo-500/20"
              >
                <FiList className="text-gray-500 text-4xl mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-400">
                  {activeFilter === 'completed' 
                    ? 'No completed tasks yet. Keep learning!' 
                    : activeFilter === 'incomplete'
                    ? 'All tasks completed! Great job!'
                    : 'Add your first task to get started!'}
                </p>
              </motion.div>
            ) : (
              filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-effect rounded-2xl p-4 border transition-all duration-300 ${
                    task.completed
                      ? 'border-green-500/20 bg-green-500/5'
                      : 'border-indigo-500/20 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-500 hover:border-green-500'
                        }`}
                      >
                        {task.completed && <FiCheck size={14} />}
                      </motion.button>

                      {editingTaskId === task.id ? (
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                            className="flex-1 bg-zinc-800/50 border border-indigo-500/30 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            autoFocus
                          />
                          <div className="flex space-x-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={saveEdit}
                              className="p-1 text-green-400 hover:bg-green-400/10 rounded"
                            >
                              <FiSave size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={cancelEdit}
                              className="p-1 text-red-400 hover:bg-red-400/10 rounded"
                            >
                              <FiX size={16} />
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <p className={`text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>
                              {task.text}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {!task.completed && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => startEditing(task)}
                                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all duration-200"
                              >
                                <FiEdit2 size={16} />
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteTask(task.id)}
                              className="p-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200"
                            >
                              <FiTrash2 size={16} />
                            </motion.button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Tips */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 glass-effect rounded-2xl p-6 border border-indigo-500/20"
          >
            <h4 className="text-white font-semibold mb-3">💡 Learning Tips</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Break complex topics into smaller, manageable tasks</li>
              <li>• Set realistic daily goals to maintain consistency</li>
              <li>• Review completed tasks to track your progress</li>
              <li>• Mix different types of learning resources</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Tasks