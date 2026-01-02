// Main JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const emptyState = document.getElementById('emptyState');

    // State Variables
    let tasks = [];
    let currentFilter = 'all';

    // Initialize App
    init();

    function init() {
        loadTasks();
        renderTasks();
        setupEventListeners();
    }

    // --- State Management ---

    function loadTasks() {
        const storedTasks = localStorage.getItem('taskflow_tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    }

    function saveTasks() {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
        updateEmptyState();
    }

    function addTask(text) {
        if (!text.trim()) return;

        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask); // Add to top
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }

    function toggleTask(id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function setFilter(filter) {
        currentFilter = filter;

        // Update Active Button UI
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        renderTasks();
    }

    // --- DOM Rendering ---

    function renderTasks() {
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        if (filteredTasks.length === 0) {
            emptyState.classList.add('visible');
            taskList.style.display = 'none';
        } else {
            emptyState.classList.remove('visible');
            taskList.style.display = 'block';

            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;

                li.innerHTML = `
                    <div class="checkbox" onclick="window.toggleTaskItem(${task.id})"></div>
                    <span class="task-text">${escapeHtml(task.text)}</span>
                    <button class="delete-btn" onclick="window.deleteTaskItem(${task.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                `;

                taskList.appendChild(li);
            });
        }
    }

    function updateEmptyState() {
        // Handled in renderTasks based on filter, but nice to have a check
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // --- Event Listeners ---

    function setupEventListeners() {
        // Add Task Button
        addTaskBtn.addEventListener('click', () => {
            addTask(taskInput.value);
        });

        // Enter Key to Add
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask(taskInput.value);
            }
        });

        // Filter Buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setFilter(btn.dataset.filter);
            });
        });
    }

    // Expose functions to window for onclick handlers in HTML string
    // This is a simple pattern for vanilla JS apps without a framework
    window.toggleTaskItem = (id) => toggleTask(id);
    window.deleteTaskItem = (id) => deleteTask(id);
});
