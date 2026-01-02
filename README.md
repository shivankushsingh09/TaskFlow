# TaskFlow - Your Personal Task Manager

<div align="center">

![TaskFlow](https://img.shields.io/badge/TaskFlow-To%20Do%20List%20App-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**A modern, user-friendly task management application to organize your work and boost productivity!**

[Live Demo](#features) • [Installation](#installation) • [Features](#features) • [Usage](#usage) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [About TaskFlow](#about-taskflow)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Project Structure](#project-structure)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🎯 About TaskFlow

TaskFlow is a professional, modern to-do list application designed to help users manage their tasks efficiently. Built with vanilla JavaScript, HTML5, CSS3, and Bootstrap framework, it provides a seamless user experience with an intuitive interface and powerful features.

Whether you're managing daily chores, work projects, or personal goals, TaskFlow keeps you organized and productive with an easy-to-use interface and reliable task management.

---

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Quickly add new tasks with a simple input field
- ✅ **Edit Tasks** - Modify existing tasks with a single click
- ✅ **Delete Tasks** - Remove unwanted tasks permanently
- ✅ **Mark Complete** - Check off completed tasks with a checkbox
- ✅ **Clear Completed** - Remove all completed tasks at once

### Filtering & Organization
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 📊 **Task Statistics** - Real-time display of total, active, and completed tasks
- 📈 **Progress Tracking** - Monitor your task completion rate

### User Experience
- 💾 **Local Storage** - Automatically save tasks to browser storage
- 🎨 **Beautiful Design** - Modern UI with smooth animations
- 📱 **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Mode Support** - Automatic dark mode preference detection
- ⌨️ **Keyboard Shortcuts** - Quick commands for power users
- 🔔 **Notifications** - Visual feedback for user actions
- ♿ **Accessibility** - WCAG compliant with proper ARIA labels

### Advanced Features
- 📤 **Export Tasks** - Save your tasks as JSON files
- 📥 **Import Tasks** - Load tasks from JSON files
- 🎯 **Task Validation** - Prevent empty or excessively long tasks
- 🛡️ **XSS Protection** - HTML escaping to prevent security vulnerabilities

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| HTML5 | Latest | Structure and semantics |
| CSS3 | Latest | Styling and animations |
| JavaScript | ES6+ | Core functionality and logic |
| Bootstrap | 5.3.0 | Responsive grid and components |
| Font Awesome | 6.4.0 | Beautiful icons |

---

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser!

### Steps

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/TaskFlow.git
   cd TaskFlow
   ```

2. **Open the Application**
   - Simply double-click `index.html` in your file explorer, OR
   - Open it with your preferred web browser

3. **Alternative: Use a Local Server**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js (with http-server)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```
   Then visit `http://localhost:8000` in your browser

---

## 🚀 Usage

### Adding a Task
1. Type your task in the input field
2. Press Enter or click the "Add Task" button
3. Your task appears in the list instantly

### Managing Tasks
- **Mark Complete**: Click the checkbox next to a task
- **Edit Task**: Click the "Edit" button and modify the text
- **Delete Task**: Click the "Delete" button to remove a task

### Filtering Tasks
- Click "All" to see all tasks
- Click "Active" to see incomplete tasks only
- Click "Completed" to see finished tasks only

### Clearing Completed Tasks
- Click "Clear Completed" button to remove all finished tasks at once

### Viewing Statistics
- **Total Tasks**: Total number of tasks created
- **Active Tasks**: Number of incomplete tasks
- **Completed**: Number of finished tasks

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Add new task (when input is focused) |
| `Ctrl+N` / `Cmd+N` | Focus on task input field |
| `Ctrl+L` / `Cmd+L` | Clear all completed tasks |

---

## 📂 Project Structure

```
TaskFlow/
├── index.html                 # Main HTML file with structure
├── README.md                  # Project documentation
├── License.md                 # MIT License
├── .gitignore                 # Git ignore rules
└── assets/
    ├── css/
    │   └── main.css          # Styling and animations
    └── js/
        └── main.js           # JavaScript functionality
```

### File Descriptions

- **index.html**: Contains the complete HTML structure with Bootstrap integration, navbar, input section, filter buttons, statistics cards, and task list container

- **main.css**: Comprehensive styling with:
  - Modern gradient backgrounds
  - Smooth animations and transitions
  - Responsive design for all screen sizes
  - Dark mode support
  - Print-friendly styles
  - Accessibility features

- **main.js**: Object-oriented JavaScript implementation with:
  - `TaskFlow` class managing all functionality
  - Local storage integration
  - Event handling and DOM manipulation
  - Import/export functionality
  - Validation and error handling
  - Keyboard shortcut support

---

## 🌐 Browser Support

| Browser | Support | Version |
|---------|---------|---------|
| Chrome | ✅ Full | Latest |
| Firefox | ✅ Full | Latest |
| Safari | ✅ Full | Latest |
| Edge | ✅ Full | Latest |
| Opera | ✅ Full | Latest |
| Internet Explorer | ❌ No | Not supported |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/TaskFlow.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Write clean, maintainable code
   - Add comments for complex logic
   - Test thoroughly in multiple browsers

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues

### Code Style Guidelines
- Use meaningful variable and function names
- Follow ES6+ conventions
- Write self-documenting code with comments
- Keep functions small and focused
- Use consistent indentation (4 spaces)

---

## 📋 Future Enhancements

- [ ] Task due dates and reminders
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Cloud sync across devices
- [ ] Collaborative task sharing
- [ ] Mobile app version
- [ ] Integration with calendar apps
- [ ] Voice command support
- [ ] Task priority levels
- [ ] Time tracking feature

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details.

---

## 👨‍💻 Author

**TaskFlow Project**
- Created as a modern task management solution
- Designed with user experience and productivity in mind
- Open source and continuously improving

---

## 🙏 Acknowledgments

- **Bootstrap Team** - For the amazing responsive framework
- **Font Awesome** - For beautiful, scalable icons
- **Open Source Community** - For inspiration and best practices
- **Users** - For feedback and feature requests

---

## 📞 Support

If you need help or have questions:
- Check the [README.md](README.md) for common questions
- Review the code comments for implementation details
- Open an issue on GitHub
- Check browser console for error messages

---

## 🔒 Privacy Policy

TaskFlow respects your privacy:
- All data is stored **locally** in your browser
- No data is sent to any server
- No cookies are used for tracking
- You have complete control over your data
- You can export or delete your data anytime

---

## 📊 Statistics

- **Lines of HTML**: ~200+
- **Lines of CSS**: ~500+
- **Lines of JavaScript**: ~400+
- **Features**: 20+
- **Browser Support**: 95%+

---

<div align="center">

**Made with ❤️ for productive people**

⭐ If you find TaskFlow helpful, please consider giving it a star!

[Back to Top](#taskflow---your-personal-task-manager)

</div>