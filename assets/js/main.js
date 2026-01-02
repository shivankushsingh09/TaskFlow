/**
 * TaskFlow - To Do List App
 * Main JavaScript File
 * A professional task management application with modern features
 */

class TaskFlow {
    constructor() {
        this.tasks = this.loadFromLocalStorage();
        this.currentFilter = 'all';
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.render();
        this.updateStats();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Task input and button
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('input[name="filter"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.render();
            });
        });

        // Clear completed button
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
    }

    /**
     * Add a new task
     */
    addTask() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (taskText === '') {
            this.showNotification('Please enter a task!', 'warning');
            return;
        }

        if (taskText.length > 200) {
            this.showNotification('Task is too long! Maximum 200 characters.', 'warning');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString(),
            dueDate: null
        };

        this.tasks.unshift(task);
        this.saveToLocalStorage();
        this.render();
        this.updateStats();
        input.value = '';
        input.focus();

        // Show success notification
        this.showNotification('Task added successfully!', 'success');
    }

    /**
     * Delete a task
     */
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
            this.showNotification('Task deleted!', 'info');
        }
    }

    /**
     * Toggle task completion status
     */
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
        }
    }

    /**
     * Edit a task
     */
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt('Edit your task:', task.text);
        
        if (newText !== null) {
            const trimmedText = newText.trim();
            
            if (trimmedText === '') {
                this.showNotification('Task cannot be empty!', 'warning');
                return;
            }

            if (trimmedText.length > 200) {
                this.showNotification('Task is too long! Maximum 200 characters.', 'warning');
                return;
            }

            task.text = trimmedText;
            this.saveToLocalStorage();
            this.render();
            this.showNotification('Task updated!', 'success');
        }
    }

    /**
     * Clear all completed tasks
     */
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'info');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
            this.showNotification('Completed tasks cleared!', 'info');
        }
    }

    /**
     * Filter tasks based on current filter
     */
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'all':
            default:
                return this.tasks;
        }
    }

    /**
     * Render the task list
     */
    render() {
        const tasksList = document.getElementById('tasksList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = `
                <li class="list-group-item text-center text-muted py-5">
                    <i class="fas fa-inbox fs-3 mb-2"></i>
                    <p class="mb-0">
                        ${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : 
                          this.currentFilter === 'active' ? 'No active tasks. Great job!' :
                          'No completed tasks yet.'}
                    </p>
                </li>
            `;
            return;
        }

        tasksList.innerHTML = filteredTasks.map(task => `
            <li class="list-group-item task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask(${task.id})"
                    aria-label="Toggle task completion"
                >
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <div class="task-actions">
                    <button 
                        class="btn-edit" 
                        onclick="app.editTask(${task.id})"
                        title="Edit task"
                        aria-label="Edit task"
                    >
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button 
                        class="btn-delete" 
                        onclick="app.deleteTask(${task.id})"
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </li>
        `).join('');
    }

    /**
     * Update statistics display
     */
    updateStats() {
        const total = this.tasks.length;
        const active = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;

        // Show/hide empty state alert
        const emptyStateAlert = document.getElementById('emptyStateAlert');
        if (total === 0) {
            emptyStateAlert.style.display = 'block';
        } else {
            emptyStateAlert.style.display = 'none';
        }
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        
        const icons = {
            'success': 'fa-check-circle',
            'warning': 'fa-exclamation-circle',
            'danger': 'fa-times-circle',
            'info': 'fa-info-circle'
        };

        const icon = icons[type] || icons['info'];

        alertDiv.innerHTML = `
            <i class="fas ${icon} me-2"></i>
            <strong>${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        const container = document.querySelector('.container');
        const firstCard = container.querySelector('.card');
        container.insertBefore(alertDiv, firstCard);

        // Auto remove notification after 3 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }

    /**
     * Escape HTML special characters to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Save tasks to local storage
     */
    saveToLocalStorage() {
        try {
            localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving to local storage:', error);
            this.showNotification('Error saving tasks!', 'danger');
        }
    }

    /**
     * Load tasks from local storage
     */
    loadFromLocalStorage() {
        try {
            const tasks = localStorage.getItem('taskflow_tasks');
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error loading from local storage:', error);
            return [];
        }
    }

    /**
     * Export tasks as JSON
     */
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `taskflow_tasks_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Import tasks from JSON file
     */
    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.tasks = importedTasks;
                    this.saveToLocalStorage();
                    this.render();
                    this.updateStats();
                    this.showNotification('Tasks imported successfully!', 'success');
                } else {
                    this.showNotification('Invalid file format!', 'danger');
                }
            } catch (error) {
                this.showNotification('Error importing tasks!', 'danger');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    }

    /**
     * Clear all tasks
     */
    clearAllTasks() {
        if (this.tasks.length === 0) {
            this.showNotification('No tasks to clear!', 'info');
            return;
        }

        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
            this.tasks = [];
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'info');
        }
    }

    /**
     * Get task statistics
     */
    getStats() {
        return {
            total: this.tasks.length,
            active: this.tasks.filter(t => !t.completed).length,
            completed: this.tasks.filter(t => t.completed).length,
            completionRate: this.tasks.length > 0 
                ? Math.round((this.tasks.filter(t => t.completed).length / this.tasks.length) * 100)
                : 0
        };
    }
}

// Initialize the app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TaskFlow();
    console.log('TaskFlow initialized successfully!');
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (app) {
        app.saveToLocalStorage();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+N or Cmd+N: Focus on input
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('taskInput').focus();
    }
    
    // Ctrl+L or Cmd+L: Clear completed
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        app.clearCompleted();
    }
});
