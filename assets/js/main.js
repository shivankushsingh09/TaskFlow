/**
 * TaskFlow - Modern To-Do List Application
 * JavaScript Functionality
 */

// ===================================
// Task Class
// ===================================
class Task {
    constructor(id, text, priority = 'medium', dueDate = null, completed = false) {
        this.id = id;
        this.text = text;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = completed;
        this.createdAt = new Date().toISOString();
    }
}

// ===================================
// TaskFlow App
// ===================================
class TaskFlowApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.storageKey = 'taskflow_tasks';

        // DOM Elements
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.dueDateInput = document.getElementById('dueDateInput');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearCompletedContainer = document.getElementById('clearCompletedContainer');

        // Edit Modal Elements
        this.editModal = new bootstrap.Modal(document.getElementById('editModal'));
        this.editTaskId = document.getElementById('editTaskId');
        this.editTaskInput = document.getElementById('editTaskInput');
        this.editPrioritySelect = document.getElementById('editPrioritySelect');
        this.editDueDateInput = document.getElementById('editDueDateInput');
        this.saveEditBtn = document.getElementById('saveEditBtn');

        // Initialize
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
        this.setDefaultDueDate();
    }

    // Set today as default due date
    setDefaultDueDate() {
        const today = new Date().toISOString().split('T')[0];
        this.dueDateInput.min = today;
        this.editDueDateInput.min = today;
    }

    // Event Bindings
    bindEvents() {
        // Add Task Form
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter Buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.render();
            });
        });

        // Clear Completed
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        // Save Edit
        this.saveEditBtn.addEventListener('click', () => {
            this.saveEdit();
        });

        // Allow Enter key in edit modal
        this.editTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.saveEdit();
            }
        });
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add Task
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = new Task(
            this.generateId(),
            text,
            this.prioritySelect.value,
            this.dueDateInput.value || null
        );

        this.tasks.unshift(task);
        this.saveTasks();
        this.render();

        // Reset form
        this.taskForm.reset();
        this.prioritySelect.value = 'medium';
        this.taskInput.focus();

        // Show success animation
        this.showNotification('Task added successfully!', 'success');
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
        const taskEl = document.querySelector(`[data-task-id="${id}"]`);
        if (taskEl) {
            taskEl.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.saveTasks();
                this.render();
                this.showNotification('Task deleted!', 'danger');
            }, 300);
        }
    }

    // Open Edit Modal
    openEditModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.editTaskId.value = task.id;
            this.editTaskInput.value = task.text;
            this.editPrioritySelect.value = task.priority;
            this.editDueDateInput.value = task.dueDate || '';
            this.editModal.show();
        }
    }

    // Save Edit
    saveEdit() {
        const id = this.editTaskId.value;
        const text = this.editTaskInput.value.trim();

        if (!text) {
            this.editTaskInput.focus();
            return;
        }

        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = text;
            task.priority = this.editPrioritySelect.value;
            task.dueDate = this.editDueDateInput.value || null;
            this.saveTasks();
            this.render();
            this.editModal.hide();
            this.showNotification('Task updated!', 'info');
        }
    }

    // Clear Completed Tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) return;

        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
        this.render();
        this.showNotification(`${completedCount} completed task(s) cleared!`, 'warning');
    }

    // Filter Tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Format Due Date
    formatDueDate(dateStr) {
        if (!dateStr) return null;

        const due = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Reset time for comparison
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let className = 'due-upcoming';
        let text = '';

        if (diffDays < 0) {
            className = 'due-overdue';
            text = 'Overdue';
        } else if (diffDays === 0) {
            className = 'due-today';
            text = 'Today';
        } else if (diffDays === 1) {
            className = 'due-upcoming';
            text = 'Tomorrow';
        } else {
            text = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        return { text, className };
    }

    // Render Task List
    render() {
        const filteredTasks = this.getFilteredTasks();
        const completedCount = this.tasks.filter(t => t.completed).length;

        // Update stats
        this.totalTasksEl.textContent = this.tasks.length;
        this.completedTasksEl.textContent = completedCount;

        // Show/hide clear completed button
        if (completedCount > 0) {
            this.clearCompletedContainer.classList.remove('d-none');
        } else {
            this.clearCompletedContainer.classList.add('d-none');
        }

        // Render task list
        if (filteredTasks.length === 0) {
            this.taskList.innerHTML = '';
            this.taskList.appendChild(this.createEmptyState());
            return;
        }

        this.taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');

        // Bind task events
        this.bindTaskEvents();
    }

    // Create Empty State
    createEmptyState() {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';

        let message = '';
        switch (this.currentFilter) {
            case 'active':
                message = '<i class="bi bi-emoji-smile empty-icon"></i><h5>All caught up!</h5><p>No active tasks remaining</p>';
                break;
            case 'completed':
                message = '<i class="bi bi-clipboard-x empty-icon"></i><h5>No completed tasks</h5><p>Complete some tasks to see them here</p>';
                break;
            default:
                message = '<i class="bi bi-clipboard2-check empty-icon"></i><h5>No tasks yet!</h5><p>Add your first task above to get started</p>';
        }

        emptyDiv.innerHTML = message;
        return emptyDiv;
    }

    // Create Task HTML
    createTaskHTML(task) {
        const priorityEmoji = {
            low: '🟢',
            medium: '🟡',
            high: '🔴'
        };

        let dueDateHTML = '';
        if (task.dueDate) {
            const formatted = this.formatDueDate(task.dueDate);
            dueDateHTML = `<span class="${formatted.className}"><i class="bi bi-calendar3"></i> ${formatted.text}</span>`;
        }

        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-action="toggle">
                    ${task.completed ? '<i class="bi bi-check-lg"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-text">${this.escapeHTML(task.text)}</div>
                    <div class="task-meta">
                        <span class="priority-badge priority-${task.priority}">
                            ${priorityEmoji[task.priority]} ${task.priority}
                        </span>
                        ${dueDateHTML}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-btn edit-btn" data-action="edit" title="Edit task">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="action-btn delete-btn" data-action="delete" title="Delete task">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Escape HTML to prevent XSS
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Bind Task Events
    bindTaskEvents() {
        this.taskList.querySelectorAll('.task-item').forEach(taskEl => {
            const taskId = taskEl.dataset.taskId;

            // Toggle completion
            taskEl.querySelector('[data-action="toggle"]').addEventListener('click', () => {
                this.toggleTask(taskId);
            });

            // Edit task
            taskEl.querySelector('[data-action="edit"]').addEventListener('click', () => {
                this.openEditModal(taskId);
            });

            // Delete task
            taskEl.querySelector('[data-action="delete"]').addEventListener('click', () => {
                this.deleteTask(taskId);
            });
        });
    }

    // Local Storage Operations
    saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    loadTasks() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.tasks = JSON.parse(stored);
        }
    }

    // Show Notification Toast
    showNotification(message, type = 'info') {
        // Create toast container if not exists
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '1100';
            document.body.appendChild(toastContainer);
        }

        const toastId = 'toast-' + Date.now();
        const bgClass = {
            success: 'bg-success',
            danger: 'bg-danger',
            warning: 'bg-warning',
            info: 'bg-primary'
        };

        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgClass[type] || bgClass.info} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);

        const toastEl = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
        toast.show();

        // Remove toast from DOM after hidden
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }
}

// Add slide out animation to CSS dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(styleSheet);

// Initialize App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.taskFlowApp = new TaskFlowApp();
});
