# TaskFlow - Your Personal Task Manager

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-v1.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green)

## 📋 Overview

**TaskFlow** is a modern, lightweight, and user-friendly to-do list application built with HTML5, CSS3, JavaScript, and Bootstrap 5. It helps you stay organized and boost your productivity by managing your daily tasks efficiently.

## ✨ Features

### Core Functionality
- ✅ **Add Tasks**: Easily add new tasks with a clean and intuitive interface
- ✏️ **Mark Complete**: Check off completed tasks with a single click
- 🗑️ **Delete Tasks**: Remove tasks you no longer need
- 🔍 **Filter Tasks**: View all tasks, pending tasks, or completed tasks
- 📊 **Task Statistics**: Track total, completed, and pending tasks at a glance
- 💾 **Local Storage**: Your tasks are automatically saved in your browser
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### User Experience
- 🎨 **Modern UI**: Beautiful gradient background with smooth animations
- ⚡ **Fast Performance**: Lightweight and optimized for speed
- 🎯 **Keyboard Support**: Press Enter to quickly add tasks
- 🔒 **Security**: Input validation and XSS protection
- 📅 **Task Timestamps**: Each task shows when it was created
- 🎭 **Interactive Elements**: Hover effects and smooth transitions

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or server setup required!

### Installation

1. **Clone or Download the repository**
   ```bash
   git clone https://github.com/yourusername/TaskFlow.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd TaskFlow
   ```

3. **Open `index.html` in your browser**
   - Simply double-click `index.html`, or
   - Right-click and select "Open with" your preferred browser, or
   - Use a local server (optional)

### Using a Local Server (Recommended)

**With Python 3:**
```bash
python -m http.server 8000
```

**With Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**With Node.js (http-server):**
```bash
npm install -g http-server
http-server
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
TaskFlow/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── main.css       # Custom styles and animations
│   └── js/
│       └── main.js        # JavaScript functionality
├── README.md              # This file
├── License.md             # MIT License
└── .gitignore            # Git ignore rules
```

## 🎮 How to Use

### Adding a Task
1. Enter your task in the input field
2. Click the "Add" button or press Enter
3. Your task appears in the task list

### Completing a Task
1. Click the checkbox next to the task
2. The task will be marked as completed (strikethrough text)
3. It moves to the "Completed" section when filtered

### Deleting a Task
1. Click the trash icon next to the task
2. Confirm the deletion
3. The task is removed from your list

### Filtering Tasks
- **All**: View all tasks
- **Pending**: View only incomplete tasks
- **Completed**: View only finished tasks

### Clearing Completed Tasks
- Click "Clear Completed Tasks" button to remove all finished tasks at once

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Custom styling with gradients, animations, and flexbox
- **JavaScript**: Vanilla JS (no dependencies for core functionality)
- **Bootstrap 5**: Responsive grid system and component styles
- **Font Awesome 6**: Beautiful icons for UI elements
- **LocalStorage API**: Client-side data persistence

## 💻 Features Breakdown

### JavaScript Functions

| Function | Purpose |
|----------|---------|
| `addTask()` | Add a new task to the list |
| `toggleTask(id)` | Mark task as complete/incomplete |
| `deleteTask(id)` | Remove a task |
| `filterTasks(filter)` | Filter tasks by status |
| `clearCompleted()` | Remove all completed tasks |
| `renderTasks()` | Update the DOM with current tasks |
| `updateStatistics()` | Update task count statistics |
| `saveTasks()` | Save tasks to localStorage |
| `loadTasks()` | Load tasks from localStorage |
| `escapeHtml()` | Prevent XSS attacks |

### CSS Classes

- `.task-item` - Individual task container
- `.task-completed` - Style for completed tasks
- `.task-list` - Task list wrapper
- `.task-content` - Task content area
- `.task-actions` - Action buttons area

## 🎨 Customization

### Colors
Edit CSS variables in `assets/css/main.css`:
```css
:root {
    --primary-color: #0d6efd;
    --success-color: #198754;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
}
```

### Fonts
Change the font family in the body selector:
```css
body {
    font-family: 'Your Font Name', sans-serif;
}
```

### Background
Modify the body background gradient:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📦 Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Opera (Latest)

## 🔐 Security Features

- Input validation to prevent empty tasks
- HTML escaping to prevent XSS attacks
- Confirmation dialogs for destructive actions
- Local storage for privacy (no server-side data)

## 📈 Future Enhancements

- [ ] Task categories and tags
- [ ] Task priority levels
- [ ] Due dates and reminders
- [ ] Dark mode toggle
- [ ] Cloud sync with accounts
- [ ] Mobile app version
- [ ] Task notes and descriptions
- [ ] Recurring tasks
- [ ] Export/Import functionality
- [ ] Collaborative tasks

## 🐛 Known Issues

None currently reported. Please open an issue if you find any bugs!

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- For bug reports and feature requests, open an [Issue](https://github.com/yourusername/TaskFlow/issues)
- For questions or suggestions, start a [Discussion](https://github.com/yourusername/TaskFlow/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**TaskFlow** was created by [Your Name]

## 🙏 Acknowledgments

- Bootstrap 5 for the responsive framework
- Font Awesome for the icons
- The open-source community for inspiration

## 🔗 Quick Links

- [Visit TaskFlow](#) - Live Demo
- [GitHub Repository](https://github.com/yourusername/TaskFlow)
- [Report Issues](https://github.com/yourusername/TaskFlow/issues)
- [Request Features](https://github.com/yourusername/TaskFlow/discussions)

---

Made with ❤️ by TaskFlow Contributors

**Stay organized. Stay productive. Stay on TaskFlow.**