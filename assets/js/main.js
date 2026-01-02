// ===================================
// TaskFlow - Main JavaScript
// ===================================

// State Management
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const filterTabs = document.querySelectorAll('.filter-tab');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// Statistics Elements
const totalTasksEl = document.getElementById('total-tasks');
const activeTasksEl = document.getElementById('active-tasks');
const completedTasksEl = document.getElementById('completed-tasks');

// ===================================
// Initialize App
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    renderTasks();
    updateStatistics();
    attachEventListeners();
});

// ===================================
// Event Listeners
// ===================================
function attachEventListeners() {
    // Add task button click
    addTaskBtn.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveFilter(tab.dataset.filter);
        });
    });

    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
}

// ===================================
// Task Management Functions
// ===================================

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        // Add shake animation to input
        taskInput.classList.add('shake');
        setTimeout(() => taskInput.classList.remove('shake'), 500);
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    taskInput.value = '';

    saveTasksToStorage();
    renderTasks();
    updateStatistics();

    // Focus back on input
    taskInput.focus();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateStatistics();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToStorage();
    renderTasks();
    updateStatistics();
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt('Edit task:', task.text);

    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasksToStorage();
        renderTasks();
    }
}

// Clear all completed tasks
function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;

    if (completedCount === 0) {
        return;
    }

    if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasksToStorage();
        renderTasks();
        updateStatistics();
    }
}

// ===================================
// Filter Functions
// ===================================
function setActiveFilter(filter) {
    currentFilter = filter;

    // Update active tab
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === filter) {
            tab.classList.add('active');
        }
    });

    renderTasks();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// ===================================
// Render Functions
// ===================================
function renderTasks() {
    const filteredTasks = getFilteredTasks();

    // Clear task list
    taskList.innerHTML = '';

    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
        updateEmptyStateMessage();
    } else {
        emptyState.classList.add('hidden');
    }

    // Render each task
    filteredTasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            onchange="toggleTask(${task.id})"
        >
        <span class="task-text">${escapeHtml(task.text)}</span>
        <div class="task-actions">
            <button class="task-btn edit-btn" onclick="editTask(${task.id})" title="Edit Task">
                <i class="fas fa-edit"></i>
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    return li;
}

function updateEmptyStateMessage() {
    const emptyStateText = emptyState.querySelector('p');

    switch (currentFilter) {
        case 'active':
            emptyStateText.textContent = 'No active tasks. Great job!';
            break;
        case 'completed':
            emptyStateText.textContent = 'No completed tasks yet.';
            break;
        default:
            emptyStateText.textContent = 'No tasks yet. Add one to get started!';
    }
}

// ===================================
// Statistics Functions
// ===================================
function updateStatistics() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    animateValue(totalTasksEl, parseInt(totalTasksEl.textContent) || 0, total, 300);
    animateValue(activeTasksEl, parseInt(activeTasksEl.textContent) || 0, active, 300);
    animateValue(completedTasksEl, parseInt(completedTasksEl.textContent) || 0, completed, 300);
}

// Animate number changes
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }

        element.textContent = Math.round(current);
    }, 16);
}

// ===================================
// Local Storage Functions
// ===================================
function saveTasksToStorage() {
    try {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

function loadTasksFromStorage() {
    try {
        const storedTasks = localStorage.getItem('taskflow_tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        tasks = [];
    }
}

// ===================================
// Utility Functions
// ===================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Add shake animation CSS dynamically
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.5s;
    }
`;
document.head.appendChild(style);