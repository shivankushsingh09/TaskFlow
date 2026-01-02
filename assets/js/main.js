document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.nav-link');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const taskCountSpan = document.getElementById('taskCount');
    const emptyState = document.getElementById('emptyState');

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTasks();

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Set Filter
            currentFilter = e.target.getAttribute('data-filter');
            renderTasks();
        });
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);

    // Functions
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.unshift(newTask); // Add to top
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }

    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);

        // Enhance removal with animation
        if (taskElement) {
            taskElement.classList.add('slide-out');
            taskElement.addEventListener('animationend', () => {
                tasks = tasks.filter(task => task.id !== id);
                saveTasks();
                renderTasks();
            });
        } else {
            // Fallback
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }
    }

    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateStats();
    }

    function updateStats() {
        const activeCount = tasks.filter(t => !t.completed).length;
        taskCountSpan.textContent = activeCount;
    }

    function renderTasks() {
        // Clear List
        taskList.innerHTML = '';

        // Filter Tasks
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }

        // Handle Empty State
        if (filteredTasks.length === 0) {
            emptyState.classList.remove('d-none');
        } else {
            emptyState.classList.add('d-none');
        }

        // Create Elements
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', task.id);

            li.innerHTML = `
                <input type="checkbox" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="delete-btn" title="Delete Task">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;

            // Add Listeners directly to elements
            const checkbox = li.querySelector('.custom-checkbox');
            checkbox.addEventListener('change', () => toggleTask(task.id));

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskList.appendChild(li);
        });

        updateStats();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
