// Audio Context for generating sound
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playDingSound() {
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

  gainNode.gain.setValueAtTime(0.3, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  oscillator.start(now);
  oscillator.stop(now + 0.3);
}

// Task management
let tasks = [];
let currentFilter = null;
let selectedPriority = "none";
let currentSubtasks = [];

const taskModal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskNameInput");
const doneBtn = document.getElementById("doneBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const stats = document.getElementById("stats");
const priorityOptions = document.querySelectorAll(".priority-option");
const priorityFilters = document.querySelectorAll(".priority-btn");
const subtaskInput = document.querySelector(".subtask-input");
const btnAddSubtask = document.querySelector(".btn-add-subtask");
const subtaskList = document.getElementById("subtaskList");
const dueDateInput = document.getElementById("dueDateInput");

// Timer tracking
let timers = {};

// Modal handling
addTaskBtn.addEventListener("click", () => {
  taskModal.classList.add("active");
  taskNameInput.focus();
});

closeModal.addEventListener("click", () => {
  taskModal.classList.remove("active");
  resetForm();
});

taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    taskModal.classList.remove("active");
    resetForm();
  }
});

// Priority selection in form
priorityOptions.forEach((option) => {
  option.addEventListener("click", () => {
    priorityOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
    selectedPriority = option.dataset.priority;
  });
});

// Priority filter buttons
priorityFilters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const priority = btn.dataset.priority;

    if (currentFilter === priority) {
      currentFilter = null;
      btn.classList.remove("active");
    } else {
      priorityFilters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = priority;
    }

    updateUI();
  });
});

// Done button click
doneBtn.addEventListener("click", () => {
  addTask();
});

// Subtask management
btnAddSubtask.addEventListener("click", () => {
  addSubtask();
});

subtaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addSubtask();
  }
});

function addSubtask() {
  const text = subtaskInput.value.trim();
  if (text === "") return;

  currentSubtasks.push(text);
  subtaskInput.value = "";
  renderSubtasks();
}

function removeSubtask(index) {
  currentSubtasks.splice(index, 1);
  renderSubtasks();
}

function renderSubtasks() {
  subtaskList.innerHTML = "";
  currentSubtasks.forEach((subtask, index) => {
    const li = document.createElement("li");
    li.className = "subtask-item";
    li.innerHTML = `
                    <span>${subtask}</span>
                    <button class="btn-remove-subtask">Remove</button>
                `;

    const removeBtn = li.querySelector(".btn-remove-subtask");
    removeBtn.addEventListener("click", () => removeSubtask(index));

    subtaskList.appendChild(li);
  });
}

function addTask() {
  const text = taskNameInput.value.trim();

  if (text === "") {
    taskNameInput.focus();
    return;
  }

  const taskId = Date.now();
  const newTask = {
    id: taskId,
    text: text,
    priority: selectedPriority,
    completed: false,
    subtasks: [...currentSubtasks],
    dueDate: dueDateInput.value || null,
    timeSpent: 0,
    timerRunning: true,
  };

  tasks.push(newTask);

  // Start timer immediately
  timers[taskId] = {
    startTime: Date.now(),
    interval: setInterval(() => {
      newTask.timeSpent += 1;
      // Update only the timer display without re-rendering entire UI
      const timerElement = document.querySelector(
        `[data-timer-id="${taskId}"]`
      );
      if (timerElement) {
        timerElement.textContent = formatTime(newTask.timeSpent);
      }
    }, 1000),
  };

  taskModal.classList.remove("active");
  resetForm();
  updateUI();
}

function resetForm() {
  taskNameInput.value = "";
  dueDateInput.value = "";
  selectedPriority = "none";
  currentSubtasks = [];
  subtaskList.innerHTML = "";
  priorityOptions.forEach((opt) => opt.classList.remove("selected"));
  document
    .querySelector('.priority-option[data-priority="none"]')
    .classList.add("selected");
}

function toggleTimer(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  if (task.timerRunning) {
    // Stop timer
    task.timerRunning = false;
    if (timers[taskId]) {
      clearInterval(timers[taskId].interval);
      delete timers[taskId];
    }
  } else {
    // Start timer
    task.timerRunning = true;
    timers[taskId] = {
      startTime: Date.now(),
      interval: setInterval(() => {
        task.timeSpent += 1;
        // Update only the timer display without re-rendering entire UI
        const timerElement = document.querySelector(
          `[data-timer-id="${taskId}"]`
        );
        if (timerElement) {
          timerElement.textContent = formatTime(task.timeSpent);
        }
      }, 1000),
    };
  }

  updateUI();
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

function getDueDateStatus(dueDate) {
  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      status: "overdue",
      text: `Overdue by ${Math.abs(diffDays)} day(s)`,
    };
  } else if (diffDays === 0) {
    return { status: "today", text: "Due Today" };
  } else if (diffDays === 1) {
    return { status: "upcoming", text: "Due Tomorrow" };
  } else {
    return { status: "upcoming", text: `Due in ${diffDays} days` };
  }
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    // Clear all timers
    Object.values(timers).forEach((timer) => {
      clearInterval(timer.interval);
    });
    timers = {};
    tasks = [];
    updateUI();
  }
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    if (task.completed) {
      // Stop timer if running
      if (task.timerRunning) {
        toggleTimer(id);
      }
      playDingSound();
    }
    updateUI();
  }
}

function updateUI() {
  taskList.innerHTML = "";

  const filteredTasks = currentFilter
    ? tasks.filter((t) => t.priority === currentFilter)
    : tasks;

  if (filteredTasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""} priority-${
        task.priority
      }`;

      const dueDateStatus = getDueDateStatus(task.dueDate);

      li.innerHTML = `
                        <div class="task-checkbox"></div>
                        <div class="task-content">
                            <div class="task-text">${task.text}</div>
                            <div class="task-meta">
                                <span class="task-priority ${task.priority}">${
        task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
      }</span>
                                ${
                                  dueDateStatus
                                    ? `<span class="task-due-date ${dueDateStatus.status}">📅 ${dueDateStatus.text}</span>`
                                    : ""
                                }
                                <span class="task-timer">
                                    ⏱️ <span data-timer-id="${
                                      task.id
                                    }">${formatTime(task.timeSpent)}</span>
                                    <button class="timer-btn ${
                                      task.timerRunning ? "active" : ""
                                    }" data-task-id="${task.id}">
                                        ${task.timerRunning ? "Stop" : "Start"}
                                    </button>
                                </span>
                            </div>
                            ${
                              task.subtasks.length > 0
                                ? `
                                <div class="task-subtasks">
                                    ${task.subtasks
                                      .map(
                                        (sub) =>
                                          `<div class="task-subtask-item">${sub}</div>`
                                      )
                                      .join("")}
                                </div>
                            `
                                : ""
                            }
                        </div>
                        <button class="task-delete-btn" data-delete-id="${
                          task.id
                        }">Delete</button>
                    `;

      const checkbox = li.querySelector(".task-checkbox");
      checkbox.addEventListener("click", () => toggleTask(task.id));

      const timerBtn = li.querySelector(".timer-btn");
      timerBtn.addEventListener("click", () => toggleTimer(task.id));

      const deleteBtn = li.querySelector(".task-delete-btn");
      deleteBtn.addEventListener("click", () => deleteTask(task.id));

      taskList.appendChild(li);
    });
  }

  updateStats();
}

function updateStats() {
  const completedCount = tasks.filter((t) => t.completed).length;
  stats.textContent = `${completedCount} completed / ${tasks.length} total`;
}

deleteAllBtn.addEventListener("click", deleteAllTasks);

// Initialize
updateUI();