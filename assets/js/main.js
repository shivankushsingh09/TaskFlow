document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const taskCount = document.getElementById('taskCount');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompleted');

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
                completed: false,
                createdAt: new Date()
            };
            tasks.push(newTask);
            saveAndRender();
            todoInput.value = '';
        }
    });

    // Handle Task Actions (Check/Delete)
    todoList.addEventListener('click', (e) => {
        const id = e.target.closest('li')?.dataset.id;
        if (!id) return;

        if (e.target.closest('.custom-checkbox') || e.target.closest('.task-text')) {
            toggleTask(parseInt(id));
        } else if (e.target.closest('.delete-btn')) {
            deleteTask(parseInt(id));
        }
    });

    // Filter Tasks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Clear Completed
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveAndRender();
    });

    function toggleTask(id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveAndRender();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    }

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        let filteredTasks = tasks;
        if (currentFilter === 'pending') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }

        if (filteredTasks.length === 0) {
            todoList.innerHTML = `
                <li class="list-group-item d-flex justify-content-center align-items-center py-5 text-muted empty-state">
                    <div class="text-center">
                        <i class="bi bi-clipboard2-check display-1 mb-3 opacity-50"></i>
                        <p class="mb-0">No tasks found!</p>
                        <small>${currentFilter === 'all' ? 'Add something above to get started.' : 'Try changing the filter.'}</small>
                    </div>
                </li>
            `;
        } else {
            todoList.innerHTML = filteredTasks.map(task => `
                <li class="list-group-item d-flex align-items-center ${task.completed ? 'task-completed' : ''}" data-id="${task.id}">
                    <div class="custom-checkbox">
                        <i class="bi bi-check"></i>
                    </div>
                    <div class="task-text">${task.text}</div>
                    <button class="btn btn-link text-danger btn-action delete-btn p-0 ms-2">
                        <i class="bi bi-trash"></i>
                    </button>
                </li>
            `).join('');
        }

        // Update count
        const pendingCount = tasks.filter(t => !t.completed).length;
        taskCount.innerText = `${pendingCount} Task${pendingCount !== 1 ? 's' : ''} left`;
    }
});
