/* ========================================
   TaskFlow - JavaScript Functionality
   Complete Task Management System
   ======================================== */

// ==================== Task Data Structure ====================
class Task {
    constructor(text, priority = 'medium', category = '', dueDate = '') {
        this.id = Date.now() + Math.random();
        this.text = text;
        this.completed = false;
        this.priority = priority;
        this.category = category;
        this.dueDate = dueDate;
        this.createdAt = new Date().toISOString();
    }
}

// ==================== Application State ====================
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.attachEventListeners();
        this.render();
    }

    // Cache DOM Elements
    cacheDOMElements() {
        // Input elements
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.categoryInput = document.getElementById('categoryInput');
        this.dueDateInput = document.getElementById('dueDateInput');

        // Filter elements
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('searchInput');

        // Display elements
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');

        // Stats elements
        this.totalTasksEl = document.getElementById('totalTasks');
        this.activeTasksEl = document.getElementById('activeTasks');
        this.completedTasksEl = document.getElementById('completedTasks');

        // Action buttons
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
    }

    // Attach Event Listeners
    attachEventListeners() {
        // Add task events
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter events
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Search event
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });

        // Clear completed
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    // Add New Task
    addTask() {
        const text = this.taskInput.value.trim();

        if (!text) {
            this.shakeInput();
            return;
        }

        const priority = this.prioritySelect.value;
        const category = this.categoryInput.value.trim();
        const dueDate = this.dueDateInput.value;

        const task = new Task(text, priority, category, dueDate);
        this.tasks.unshift(task);

        this.saveTasks();
        this.render();
        this.clearInputs();

        // Show feedback animation
        this.showNotification('Task added successfully!');
    }

    // Toggle Task Completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    // Delete Task
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
        this.showNotification('Task deleted');
    }

    // Clear Completed Tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;

        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.showNotification('Completed tasks cleared');
        }
    }

    // Set Filter
    setFilter(filter) {
        this.currentFilter = filter;

        // Update active button
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
    }

    // Get Filtered Tasks
    getFilteredTasks() {
        let filtered = this.tasks;

        // Apply status filter
        if (this.currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(t =>
                t.text.toLowerCase().includes(this.searchQuery) ||
                (t.category && t.category.toLowerCase().includes(this.searchQuery))
            );
        }

        return filtered;
    }

    // Render Tasks
    render() {
        const tasks = this.getFilteredTasks();

        // Clear task list
        this.taskList.innerHTML = '';

        // Show/hide empty state
        if (tasks.length === 0) {
            this.emptyState.classList.add('show');
        } else {
            this.emptyState.classList.remove('show');

            // Render each task
            tasks.forEach(task => {
                const taskEl = this.createTaskElement(task);
                this.taskList.appendChild(taskEl);
            });
        }

        // Update statistics
        this.updateStats();
    }

    // Create Task Element
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        // Checkbox
        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'task-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => this.toggleTask(task.id));

        const checkboxCustom = document.createElement('span');
        checkboxCustom.className = 'checkbox-custom';

        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(checkboxCustom);

        // Task Content
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const taskText = document.createElement('div');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const taskMeta = document.createElement('div');
        taskMeta.className = 'task-meta';

        // Priority Badge
        if (task.priority) {
            const priorityBadge = document.createElement('span');
            priorityBadge.className = `priority-badge ${task.priority}`;
            priorityBadge.textContent = task.priority;
            taskMeta.appendChild(priorityBadge);
        }

        // Category Badge
        if (task.category) {
            const categoryBadge = document.createElement('span');
            categoryBadge.className = 'category-badge';
            categoryBadge.textContent = task.category;
            taskMeta.appendChild(categoryBadge);
        }

        // Due Date Badge
        if (task.dueDate) {
            const dateBadge = document.createElement('span');
            dateBadge.className = 'date-badge';
            dateBadge.textContent = `📅 ${this.formatDate(task.dueDate)}`;
            taskMeta.appendChild(dateBadge);
        }

        taskContent.appendChild(taskText);
        if (taskMeta.children.length > 0) {
            taskContent.appendChild(taskMeta);
        }

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        // Assemble task item
        li.appendChild(checkboxLabel);
        li.appendChild(taskContent);
        li.appendChild(deleteBtn);

        return li;
    }

    // Update Statistics
    updateStats() {
        const total = this.tasks.length;
        const active = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        this.totalTasksEl.textContent = total;
        this.activeTasksEl.textContent = active;
        this.completedTasksEl.textContent = completed;
    }

    // Save Tasks to LocalStorage
    saveTasks() {
        localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
    }

    // Load Tasks from LocalStorage
    loadTasks() {
        const stored = localStorage.getItem('taskflow_tasks');
        return stored ? JSON.parse(stored) : [];
    }

    // Clear Input Fields
    clearInputs() {
        this.taskInput.value = '';
        this.categoryInput.value = '';
        this.dueDateInput.value = '';
        this.prioritySelect.value = 'medium';
        this.taskInput.focus();
    }

    // Shake Input Animation
    shakeInput() {
        this.taskInput.style.animation = 'none';
        setTimeout(() => {
            this.taskInput.style.animation = 'shake 0.5s ease';
        }, 10);
    }

    // Format Date
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Show Notification (Simple feedback)
    showNotification(message) {
        // Simple console log - could be enhanced with toast notifications
        console.log(`✓ ${message}`);
    }
}

// ==================== Shake Animation ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// ==================== Initialize Application ====================
let app;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new TaskManager();
    });
} else {
    app = new TaskManager();
}

// ==================== Keyboard Shortcuts ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// ==================== Export for testing (optional) ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Task, TaskManager };
}
