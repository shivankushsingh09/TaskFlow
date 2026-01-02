document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const filterButtons = document.querySelectorAll('[data-filter]');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const emptyState = document.getElementById('empty-state');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTasks();

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now(),
                text,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            todoInput.value = '';
            renderTasks();
        }
    });

    // Handle Task Click (Toggle / Delete)
    todoList.addEventListener('click', (e) => {
        const id = parseInt(e.target.closest('.list-group-item')?.dataset.id);
        if (!id) return;

        if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) {
            tasks = tasks.filter(t => t.id !== id);
        } else if (e.target.type === 'checkbox' || e.target.classList.contains('task-text')) {
            const task = tasks.find(t => t.id === id);
            if (task) task.completed = !task.completed;
        }

        saveTasks();
        renderTasks();
    });

    // Filter Tasks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Clear Completed
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    });

    function renderTasks() {
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        todoList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.classList.remove('d-none');
            todoList.classList.add('d-none');
        } else {
            emptyState.classList.add('d-none');
            todoList.classList.remove('d-none');

            filteredTasks.forEach(task => {
                const li = document.createElement('div');
                li.className = `list-group-item d-flex align-items-center bg-white ${task.completed ? 'task-completed' : ''}`;
                li.dataset.id = task.id;
                li.innerHTML = `
                    <div class="form-check mb-0 me-3">
                        <input class="form-check-input" type="checkbox" ${task.completed ? 'checked' : ''}>
                    </div>
                    <span class="task-text flex-grow-1">${task.text}</span>
                    <button class="btn delete-btn btn-sm border-0 ms-2">
                        <i class="bi bi-trash3"></i>
                    </button>
                `;
                todoList.appendChild(li);
            });
        }

        updateCount();
    }

    function updateCount() {
        const activeCount = tasks.filter(t => !t.completed).length;
        taskCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
