// TaskFlow - Main JavaScript File

// Task Storage Key
const STORAGE_KEY = 'taskflow_tasks';
let tasks = [];
let currentFilter = 'all';

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    renderTasks();
    setupEventListeners();
    updateStatistics();
});

/**
 * Set up event listeners
 */
function setupEventListeners() {
    const taskInput = document.getElementById('taskInput');
    
    // Allow Enter key to add task
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Close error message when user starts typing
    taskInput.addEventListener('input', function () {
        const errorMsg = document.getElementById('errorMessage');
        if (errorMsg && !errorMsg.classList.contains('d-none')) {
            errorMsg.classList.add('d-none');
        }
    });
}

/**
 * Add a new task
 */
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const errorMsg = document.getElementById('errorMessage');

    if (taskText === '') {
        errorMsg.classList.remove('d-none');
        taskInput.focus();
        setTimeout(() => {
            errorMsg.classList.add('d-none');
        }, 3000);
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    updateStatistics();
    taskInput.value = '';
    taskInput.focus();

    // Show success feedback
    showSuccessMessage('Task added successfully!');
}

/**
 * Toggle task completion status
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStatistics();
    }
}

/**
 * Delete a task
 */
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStatistics();
        showSuccessMessage('Task deleted!');
    }
}

/**
 * Filter tasks by status
 */
function filterTasks(filter) {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.btn-outline-primary, .btn-outline-warning, .btn-outline-success').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    renderTasks();
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStatistics();
        showSuccessMessage('Completed tasks cleared!');
    }
}

/**
 * Render tasks to the DOM
 */
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-inbox fa-3x mb-3"></i>
                <p>${
                    currentFilter === 'completed' ? 'No completed tasks yet!' :
                    currentFilter === 'pending' ? 'No pending tasks! Great job!' :
                    'No tasks yet. Add one to get started!'
                }</p>
            </div>
        `;
        return;
    }

    // Render tasks
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksList.appendChild(taskElement);
    });

    // Show/hide clear completed button
    const clearBtn = document.getElementById('clearCompletedBtn');
    const hasCompleted = tasks.some(t => t.completed);
    clearBtn.style.display = hasCompleted ? 'inline-block' : 'none';
}

/**
 * Create a task element
 */
function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-item ${task.completed ? 'completed' : ''}`;
    div.innerHTML = `
        <div class="task-content">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''} 
                onchange="toggleTask(${task.id})"
                aria-label="Toggle task completion"
            >
            <span class="task-text">${escapeHtml(task.text)}</span>
            <span class="task-date">${task.createdAt}</span>
        </div>
        <div class="task-actions">
            <button 
                class="btn-delete" 
                onclick="deleteTask(${task.id})"
                title="Delete task"
            >
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;
    return div;
}

/**
 * Update task statistics
 */
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks from localStorage
 */
function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
        try {
            tasks = JSON.parse(savedTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
            tasks = [];
        }
    } else {
        tasks = [];
    }
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    // You can enhance this with a toast notification library if needed
    console.log(message);
}

/**
 * Export tasks as JSON
 */
function exportTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

/**
 * Import tasks from JSON file
 */
function importTasks(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedTasks = JSON.parse(e.target.result);
            if (Array.isArray(importedTasks)) {
                // Merge with existing tasks or replace
                if (confirm('Replace existing tasks or merge with them?')) {
                    tasks = importedTasks;
                } else {
                    tasks = [...tasks, ...importedTasks];
                }
                saveTasks();
                renderTasks();
                updateStatistics();
                showSuccessMessage('Tasks imported successfully!');
            }
        } catch (error) {
            alert('Error importing tasks: Invalid file format');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}
