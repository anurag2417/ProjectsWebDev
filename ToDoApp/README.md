# TaskFlow - Modern To-Do List Application

A feature-rich task management application built with HTML, CSS, and JavaScript, featuring real-time time tracking, priority management, and an elegant dark theme interface.

## Features

### Core Functionality
- ✅ Create and manage tasks with an intuitive interface
- 🎯 Set task priorities (High, Medium, Low, None)
- 📅 Add due dates with visual status indicators
- ⏱️ Built-in time tracker that auto-starts on task creation
- 📝 Add subtasks for detailed task breakdown
- ✓ Mark tasks as complete with satisfying sound effects
- 🗑️ Delete individual tasks

### Smart Features
- 🔔 Audio feedback using Web Audio API (ding sound on completion)
- 🎨 Priority-based color coding and filtering
- ⏰ Real-time timer tracking work duration
- 📊 Task statistics (completed/total)
- 🌙 Modern dark theme UI

### Due Date Status
- 🔴 **Overdue** - Past due date
- 🟡 **Due Today** - Task due today
- ⚪ **Upcoming** - Shows days remaining

## How to Use

1. **Create a Task**
   - Click "Add Task" button
   - Enter task name
   - Select priority level
   - Set due date (optional)
   - Add subtasks (optional)
   - Click "Done" - timer starts automatically!

2. **Manage Tasks**
   - Click checkbox to mark complete/incomplete
   - Use Start/Stop to control timer
   - Click Delete to remove task
   - Filter by priority using colored buttons

3. **Track Time**
   - Timer starts automatically when task is created
   - Click "Stop" to pause, "Start" to resume
   - Timer shows hours, minutes, and seconds
   - Auto-stops when task is marked complete

## Technical Details

- **Built with:** Pure HTML, CSS, and JavaScript
- **No dependencies:** Everything runs in the browser
- **Audio:** Web Audio API for sound generation
- **Storage:** In-memory (tasks reset on page refresh)
- **Responsive:** Works on desktop and mobile devices

## Browser Compatibility

Works on all modern browsers that support:
- Web Audio API
- ES6+ JavaScript
- CSS Grid and Flexbox

## Project Structure
```
taskflow/
├── index.html         
├── style.css
├── script.js
└── README.md          # This file
```

## Future Enhancements

Potential features for future versions:
- LocalStorage persistence
- Task categories/projects
- Drag-and-drop reordering
- Export/import tasks
- Task search functionality
- Recurring tasks
- Task notes/descriptions

## License

MIT License - feel free to use and modify as needed!

## Author

Created as a learning project for task management and time tracking.

---

⭐ If you find this useful, please star the repository!