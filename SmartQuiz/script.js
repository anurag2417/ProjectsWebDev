// --- DATA MOCK ---
const initialData = [
  {
    id: 1,
    title: "Kinematics - Full Chapter",
    subject: "physics",
    difficulty: "medium",
    duration: 15,
    totalQuestions: 5,
    attemptsLeft: 1,
    status: "completed",
    bestScore: 12,
    score: 12,
    bookmarks: [2],
    wrongIndices: [1, 3],
    questions: [
      {
        q: "Displacement is proportional to:",
        options: ["t", "t²", "t³", "√t"],
        correct: 1,
      },
      {
        q: "Which is a vector?",
        options: ["Speed", "Distance", "Displacement", "Mass"],
        correct: 2,
      },
      {
        q: "Slope of V-T graph is:",
        options: ["Distance", "Acceleration", "Speed", "Position"],
        correct: 1,
      },
      {
        q: "40m in 4s. Avg speed?",
        options: ["12 m/s", "8 m/s", "10 m/s", "100 m/s"],
        correct: 2,
      },
      {
        q: "Initial velocity from rest?",
        options: ["0", "9.8", "Infinity", "Depends"],
        correct: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Atomic Structure Mock",
    subject: "chemistry",
    difficulty: "hard",
    duration: 20,
    totalQuestions: 5,
    attemptsLeft: 3,
    status: "pending",
    bestScore: null,
    score: 0,
    bookmarks: [],
    wrongIndices: [],
    questions: [
      {
        q: "Nucleus contains:",
        options: [
          "Electrons",
          "Protons+Neutrons",
          "Electrons+Protons",
          "Neutrons",
        ],
        correct: 1,
      },
      {
        q: "Least mass?",
        options: ["Proton", "Neutron", "Electron", "Alpha"],
        correct: 2,
      },
      {
        q: "Isotopes same in:",
        options: ["Neutrons", "Protons", "Mass", "None"],
        correct: 1,
      },
      {
        q: "Max electrons in M shell:",
        options: ["8", "18", "32", "2"],
        correct: 1,
      },
      {
        q: "Rutherford proved:",
        options: ["Electron", "Neutron", "Nucleus", "Orbit"],
        correct: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Calculus Fundamentals",
    subject: "maths",
    difficulty: "easy",
    duration: 30,
    totalQuestions: 5,
    attemptsLeft: 3,
    status: "pending",
    bestScore: null,
    score: 0,
    bookmarks: [],
    wrongIndices: [],
    questions: [
      { q: "Derivative of x²:", options: ["x", "2x", "x/2", "2"], correct: 1 },
      {
        q: "Reverse of Integration:",
        options: ["Differentiation", "Limits", "Functions", "None"],
        correct: 0,
      },
      {
        q: "limit sin(x)/x at 0:",
        options: ["0", "1", "Inf", "NaN"],
        correct: 1,
      },
      {
        q: "d/dx(sin x):",
        options: ["cos x", "-cos x", "tan x", "sec x"],
        correct: 0,
      },
      { q: "Slope of y=x at 1:", options: ["0", "1", "2", "-1"], correct: 1 },
    ],
  },
];

// --- RESOURCES DATA MOCK ---
const resourcesData = {
  formula: [
    {
      title: "Physics: Kinematics",
      type: "PDF",
      size: "1.2 MB",
      icon: "fa-file-pdf",
      color: "#f472b6",
    },
    {
      title: "Physics: Thermodynamics",
      type: "PDF",
      size: "2.5 MB",
      icon: "fa-file-pdf",
      color: "#f472b6",
    },
    {
      title: "Maths: Calculus Cheat Sheet",
      type: "PDF",
      size: "0.8 MB",
      icon: "fa-file-pdf",
      color: "#f472b6",
    },
    {
      title: "Chemistry: Periodic Table",
      type: "IMG",
      size: "3.0 MB",
      icon: "fa-image",
      color: "#f472b6",
    },
  ],
  video: [
    {
      title: "Newton's Laws in 10 Mins",
      type: "Video",
      size: "10:05",
      icon: "fa-play-circle",
      color: "#60a5fa",
    },
    {
      title: "Understanding Limits",
      type: "Video",
      size: "15:20",
      icon: "fa-play-circle",
      color: "#60a5fa",
    },
    {
      title: "Organic Chemistry Basics",
      type: "Video",
      size: "45:00",
      icon: "fa-play-circle",
      color: "#60a5fa",
    },
  ],
  notes: [
    {
      title: "My Physics Notes",
      type: "Doc",
      size: "Last edited 2d ago",
      icon: "fa-file-lines",
      color: "#fbbf24",
    },
    {
      title: "Maths Important Qs",
      type: "Doc",
      size: "Last edited 5d ago",
      icon: "fa-file-lines",
      color: "#fbbf24",
    },
  ],
};

// --- APP CONTROLLER ---
const app = {
  data: [],
  doubts: [],
  activeTab: "pending",
  profileChart: null,

  init: function () {
    const storedData = localStorage.getItem("rs_data_v3");
    this.data = storedData
      ? JSON.parse(storedData)
      : JSON.parse(JSON.stringify(initialData));

    const storedDoubts = localStorage.getItem("rs_doubts");
    this.doubts = storedDoubts ? JSON.parse(storedDoubts) : [];

    this.saveData();
    this.showScreen("dashboard");
    this.updateSidebarStats();
  },

  saveData: function () {
    localStorage.setItem("rs_data_v3", JSON.stringify(this.data));
    localStorage.setItem("rs_doubts", JSON.stringify(this.doubts));
  },

  resetSystem: function () {
    if (confirm("Reset entire system?")) {
      localStorage.removeItem("rs_data_v3");
      localStorage.removeItem("rs_doubts");
      location.reload();
    }
  },

  // --- FIXED SHOW SCREEN FUNCTION ---
  showScreen: function (name) {
    // 1. Hide all standard screens
    document
      .querySelectorAll(".rs-screen")
      .forEach((s) => s.classList.remove("active"));

    // 2. FORCE CLOSE the instructions modal (This is the fix)
    document.getElementById("screen-instructions").classList.remove("active");

    // 3. Show the requested screen
    const target = document.getElementById("screen-" + name);
    if (target) target.classList.add("active");

    window.scrollTo(0, 0);
    if (name === "dashboard") this.renderDashboard();
  },

  // --- DASHBOARD LOGIC ---
  switchTab: function (tab) {
    this.activeTab = tab;
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b.textContent.toLowerCase().includes(tab));
    });
    this.renderDashboard();
  },

  filterTests: function () {
    this.renderDashboard();
  },

  renderDashboard: function () {
    const container = document.getElementById("test-list-container");
    const search = document.getElementById("searchInput").value.toLowerCase();
    const subFilter = document.getElementById("subjectFilter").value;
    const diffFilter = document.getElementById("difficultyFilter").value;

    container.innerHTML = "";
    let visibleCount = 0;

    this.data.forEach((test) => {
      if (this.activeTab !== test.status) return;
      if (subFilter !== "all" && test.subject !== subFilter) return;
      if (diffFilter !== "all" && test.difficulty !== diffFilter) return;
      if (!test.title.toLowerCase().includes(search)) return;

      visibleCount++;
      const isDone = test.status === "completed";
      const diffClass = `diff-${test.difficulty}`;

      let actionButtons = isDone
        ? `<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                                <button class="btn btn-outline btn-sm" onclick="app.revisionMode(${test.id})"><i class="fa-solid fa-rotate-left"></i> Review</button>
                                <button class="btn btn-primary btn-sm" onclick="alert('Score: ${test.score}')">Result</button>
                           </div>`
        : `<button class="btn btn-primary" style="width:100%" onclick="app.prepTest(${test.id})">Start Test</button>`;

      const bookmarkCount = test.bookmarks ? test.bookmarks.length : 0;

      container.innerHTML += `
                        <div class="test-card card">
                            <div class="card-header">
                                <span class="diff-badge ${diffClass}">${test.difficulty}</span>
                                <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">${test.subject}</div>
                            </div>
                            <h3 style="margin-bottom:10px;">${test.title}</h3>
                            <div class="text-xs text-muted" style="margin-bottom:12px;">${test.totalQuestions} Qs • ${test.duration} Mins</div>
                            <div class="chip-container">
                                <span class="info-chip"><i class="fa-solid fa-trophy"></i> Best: ${test.bestScore ?? "--"}</span>
                                <span class="info-chip"><i class="fa-solid fa-bolt"></i> Left: ${test.attemptsLeft}</span>
                                ${bookmarkCount > 0 ? `<span class="info-chip" style="color:#fbbf24"><i class="fa-solid fa-star"></i> ${bookmarkCount}</span>` : ""}
                            </div>
                            <div style="margin-top:auto;">${actionButtons}</div>
                        </div>`;
    });
    document.getElementById("empty-state").style.display =
      visibleCount === 0 ? "block" : "none";

    this.updateMistakesPanel();
    this.updateSidebarStats();
  },

  updateMistakesPanel: function () {
    let totalWrong = 0;
    let totalBookmarks = 0;
    let lastTest = null;

    this.data.forEach((t) => {
      if (t.status === "completed") {
        lastTest = t;
        if (t.wrongIndices) totalWrong += t.wrongIndices.length;
      }
      if (t.bookmarks) totalBookmarks += t.bookmarks.length;
    });

    document.getElementById("mis-total-wrong").innerText = totalWrong;
    document.getElementById("mis-total-book").innerText = totalBookmarks;

    if (lastTest) {
      document.getElementById("mis-last-test-name").innerText = lastTest.title;
      document.getElementById("mis-last-count").innerText =
        lastTest.wrongIndices ? lastTest.wrongIndices.length : 0;
    } else {
      document.getElementById("mis-last-test-name").innerText =
        "No tests taken";
    }
  },

  // --- AGGREGATE REVIEW FUNCTIONS ---
  reviewGlobalMistakes: function () {
    const allMistakes = [];
    this.data.forEach((t) => {
      if (
        t.status === "completed" &&
        t.wrongIndices &&
        t.wrongIndices.length > 0
      ) {
        t.wrongIndices.forEach((idx) => {
          allMistakes.push(t.questions[idx]);
        });
      }
    });

    if (allMistakes.length === 0)
      return alert("Great job! No pending mistakes found.");

    const reviewTest = {
      id: 999,
      title: "Mistakes Review",
      subject: "Mixed",
      difficulty: "Adaptive",
      duration: 20,
      questions: allMistakes,
      bookmarks: [],
    };

    if (
      confirm(
        `Ready to review ${allMistakes.length} incorrect questions from past tests?`,
      )
    ) {
      quiz.start(reviewTest, true);
    }
  },

  reviewGlobalBookmarks: function () {
    const allBookmarks = [];
    this.data.forEach((t) => {
      if (t.bookmarks && t.bookmarks.length > 0) {
        t.bookmarks.forEach((idx) => {
          allBookmarks.push(t.questions[idx]);
        });
      }
    });

    if (allBookmarks.length === 0) return alert("No questions bookmarked yet.");

    const reviewTest = {
      id: 998,
      title: "Bookmarks Revision",
      subject: "Mixed",
      difficulty: "Adaptive",
      duration: 30,
      questions: allBookmarks,
      bookmarks: [], // reset for this session
    };

    if (
      confirm(`Start revision of ${allBookmarks.length} bookmarked questions?`)
    ) {
      quiz.start(reviewTest, true);
    }
  },

  updateSidebarStats: function () {
    const completed = this.data.filter((t) => t.status === "completed");
    document.getElementById("user-taken").innerText = completed.length;

    let totalObtained = 0,
      totalMax = 0;
    completed.forEach((t) => {
      totalObtained += t.score;
      totalMax += t.totalQuestions * 4;
    });
    const acc =
      totalMax > 0
        ? Math.round((Math.max(0, totalObtained) / totalMax) * 100)
        : 0;
    document.getElementById("user-accuracy").innerText = acc + "%";

    const solvedDoubts = this.doubts.filter(
      (d) => d.status === "Solved",
    ).length;
    document.getElementById("solved-count").innerText =
      `${solvedDoubts} Solved`;

    const ctx = document.getElementById("progressChart").getContext("2d");
    if (this.profileChart) this.profileChart.destroy();
    this.profileChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Pending"],
        datasets: [
          {
            data: [completed.length, this.data.length - completed.length],
            backgroundColor: ["#6366f1", "#2e364f"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: { legend: { display: false } },
      },
    });
  },

  // --- RESOURCES LOGIC ---
  openResources: function (type) {
    const titles = {
      formula: "Formula Sheets",
      video: "Concept Videos",
      notes: "My Notes",
    };
    document.getElementById("res-screen-title").innerText = titles[type];

    const container = document.getElementById("resource-container");
    container.innerHTML = "";

    const items = resourcesData[type] || [];
    items.forEach((item) => {
      container.innerHTML += `
                        <div class="card res-card" onclick="alert('Opening ${item.title}...')">
                            <div class="res-icon" style="color:${item.color}; width:50px; height:50px; font-size:1.5rem;">
                                <i class="fa-solid ${item.icon}"></i>
                            </div>
                            <div>
                                <div style="font-weight:600; margin-bottom:4px;">${item.title}</div>
                                <div class="text-xs text-muted">${item.type} • ${item.size}</div>
                            </div>
                        </div>
                    `;
    });
    this.showScreen("resources");
  },

  // --- DOUBTS LOGIC ---
  openDoubts: function () {
    this.doubtTab("ask");
    this.showScreen("doubts");
  },

  doubtTab: function (tab) {
    document
      .querySelectorAll("#screen-doubts .tab-btn")
      .forEach((b) =>
        b.classList.toggle(
          "active",
          b.textContent
            .toLowerCase()
            .includes(tab === "ask" ? "ask" : "history"),
        ),
      );
    document.getElementById("doubt-ask-panel").style.display =
      tab === "ask" ? "block" : "none";
    document.getElementById("doubt-history-panel").style.display =
      tab === "history" ? "block" : "none";
    if (tab === "history") this.renderDoubts();
  },

  submitDoubt: function () {
    const sub = document.getElementById("doubt-subject").value;
    const txt = document.getElementById("doubt-text").value;
    if (!txt) return alert("Please enter your question.");

    this.doubts.unshift({
      subject: sub,
      question: txt,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    });
    this.saveData();
    document.getElementById("doubt-text").value = "";
    alert("Doubt submitted successfully!");
    this.doubtTab("history");
    this.updateSidebarStats();
  },

  renderDoubts: function () {
    const cont = document.getElementById("doubt-list-container");
    cont.innerHTML = "";
    if (this.doubts.length === 0) {
      cont.innerHTML =
        '<div class="text-muted" style="text-align:center;">No doubts yet.</div>';
      return;
    }
    this.doubts.forEach((d) => {
      const statusColor =
        d.status === "Solved" ? "var(--success)" : "var(--warning)";
      cont.innerHTML += `
                        <div class="doubt-item">
                            <div class="flex-between" style="margin-bottom:8px;">
                                <div class="text-xs text-muted" style="text-transform:uppercase; font-weight:700;">${d.subject} • ${d.date}</div>
                                <span class="info-chip" style="color:${statusColor}">${d.status}</span>
                            </div>
                            <div>${d.question}</div>
                        </div>
                    `;
    });
  },

  // --- TEST PREP & QUIZ LOGIC ---
  prepTest: function (id) {
    const test = this.data.find((t) => t.id === id);
    document.getElementById("ins-title").innerText = test.title;
    document.getElementById("ins-subtitle").innerText = test.subject;
    document.getElementById("ins-duration").innerText = test.duration;
    document.getElementById("ins-qcount").innerText = test.totalQuestions;

    // NEW: Populate Dynamic Topics based on subject
    const topicMap = {
      physics: [
        "Newton's Laws",
        "Kinematics 1D & 2D",
        "Work Power Energy",
        "Friction",
      ],
      chemistry: [
        "Atomic Structure",
        "Mole Concept",
        "Periodic Properties",
        "Chemical Bonding",
      ],
      maths: [
        "Calculus Basics",
        "Limits & Derivatives",
        "Functions",
        "Trigonometry",
      ],
    };

    const topics = topicMap[test.subject] || [
      "General Concepts",
      "Problem Solving",
      "Critical Thinking",
    ];
    const topicList = document.getElementById("ins-topic-list");
    topicList.innerHTML = topics.map((t) => `<li>${t}</li>`).join("");

    // Update Difficulty Badge
    const badge = document.getElementById("ins-badge-diff");
    badge.innerText = test.difficulty;
    badge.style.color =
      test.difficulty === "easy"
        ? "var(--success)"
        : test.difficulty === "medium"
          ? "var(--warning)"
          : "var(--danger)";

    const chk = document.getElementById("agree-chk");
    const btn = document.getElementById("btn-start-test");
    chk.checked = false;
    btn.disabled = true;
    chk.onchange = () => (btn.disabled = !chk.checked);
    btn.onclick = () => quiz.start(test, false);

    this.showScreen("instructions");
  },

  toggleAccordion: function (header) {
    const item = header.parentElement;
    item.classList.toggle("active");
  },

  revisionMode: function (id) {
    const test = this.data.find((t) => t.id === id);
    const mistakes = test.wrongIndices || [];
    const saved = test.bookmarks || [];
    const targetIndices = [...new Set([...mistakes, ...saved])];

    if (targetIndices.length === 0)
      return alert("No mistakes or bookmarks to review.");

    if (confirm(`Review ${targetIndices.length} questions?`)) {
      const revTest = JSON.parse(JSON.stringify(test));
      revTest.questions = targetIndices.map((i) => test.questions[i]);
      quiz.start(revTest, true);
    }
  },
};

// --- QUIZ CONTROLLER ---
const quiz = {
  activeTest: null,
  isRevision: false,
  qIndex: 0,
  answers: [],
  timer: null,
  time: 0,

  start: function (test, revisionMode) {
    this.activeTest = test;
    this.isRevision = revisionMode;
    this.qIndex = 0;
    this.answers = new Array(test.questions.length).fill(null);
    this.time = test.duration * 60;

    app.showScreen("quiz");
    document.getElementById("quiz-subject").innerText = test.title;
    document.getElementById("quiz-mode-badge").innerText = revisionMode
      ? "Revision Mode"
      : "Full Test Mode";

    this.renderPalette();
    this.loadQuestion(0);
    this.startTimer();
  },

  loadQuestion: function (idx) {
    this.qIndex = idx;
    const q = this.activeTest.questions[idx];
    document.getElementById("q-number").innerText = idx + 1;
    document.getElementById("q-text").innerText = q.q;

    const btnBook = document.getElementById("btn-bookmark");
    let isBookmarked = false;
    if (!this.isRevision && this.activeTest.bookmarks)
      isBookmarked = this.activeTest.bookmarks.includes(idx);
    btnBook.innerHTML = isBookmarked
      ? '<i class="fa-solid fa-star" style="color:#fbbf24"></i> Saved'
      : '<i class="fa-regular fa-star"></i> Save';

    const cont = document.getElementById("options-container");
    cont.innerHTML = "";
    q.options.forEach((opt, i) => {
      const isSelected = this.answers[idx] === i;
      cont.innerHTML += `
                        <div class="option-row ${isSelected ? "selected" : ""}" onclick="quiz.selectOption(${idx}, ${i})">
                            <div style="width:20px; height:20px; border:2px solid var(--surface-border); border-radius:50%; display:flex; align-items:center; justify-content:center; margin-right:15px;">
                                ${isSelected ? '<div style="width:10px; height:10px; background:var(--primary); border-radius:50%"></div>' : ""}
                            </div>
                            ${opt}
                        </div>`;
    });

    document.getElementById("btn-prev").disabled = idx === 0;
    document.getElementById("btn-next").innerText =
      idx === this.activeTest.questions.length - 1 ? "Finish" : "Next";
    document.getElementById("btn-next").onclick = () =>
      idx === this.activeTest.questions.length - 1
        ? this.submitTest()
        : this.nextQuestion();

    this.updatePaletteHighlight();
  },

  selectOption: function (qIdx, optIdx) {
    this.answers[qIdx] = optIdx;
    this.loadQuestion(qIdx);
    this.renderPalette();
  },

  toggleBookmark: function () {
    if (this.isRevision) return alert("Bookmarking disabled in Revision Mode");
    const idx = this.qIndex;
    const list = this.activeTest.bookmarks || [];
    if (list.includes(idx)) list.splice(list.indexOf(idx), 1);
    else list.push(idx);
    this.activeTest.bookmarks = list;
    this.loadQuestion(idx);
    this.renderPalette();
  },

  renderPalette: function () {
    const cont = document.getElementById("palette-container");
    cont.innerHTML = "";
    this.activeTest.questions.forEach((_, i) => {
      let classes = "p-btn";
      if (this.answers[i] !== null) classes += " answered";
      if (
        !this.isRevision &&
        this.activeTest.bookmarks &&
        this.activeTest.bookmarks.includes(i)
      )
        classes += " bookmarked";
      cont.innerHTML += `<button class="${classes}" id="pbtn-${i}" onclick="quiz.loadQuestion(${i})">${i + 1}</button>`;
    });
    this.updatePaletteHighlight();
  },

  updatePaletteHighlight: function () {
    document.querySelectorAll(".p-btn").forEach((b, i) => {
      if (i === this.qIndex) b.style.border = "2px solid var(--primary)";
      else b.style.border = "none";
    });
  },

  nextQuestion: function () {
    if (this.qIndex < this.activeTest.questions.length - 1)
      this.loadQuestion(this.qIndex + 1);
  },
  prevQuestion: function () {
    if (this.qIndex > 0) this.loadQuestion(this.qIndex - 1);
  },

  startTimer: function () {
    clearInterval(this.timer);
    const display = document.getElementById("timer");
    this.timer = setInterval(() => {
      this.time--;
      let m = Math.floor(this.time / 60);
      let s = this.time % 60;
      display.innerText = `${m}:${s < 10 ? "0" + s : s}`;
      if (this.time <= 0) this.submitTest();
    }, 1000);
  },

  submitTest: function () {
    clearInterval(this.timer);
    let correct = 0,
      wrong = 0,
      score = 0,
      wrongIndices = [];
    this.activeTest.questions.forEach((q, i) => {
      const ans = this.answers[i];
      if (ans === q.correct) {
        correct++;
        score += 4;
      } else if (ans !== null) {
        wrong++;
        score -= 1;
        wrongIndices.push(i);
      }
    });

    if (!this.isRevision) {
      const realTest = app.data.find((t) => t.id === this.activeTest.id);
      realTest.status = "completed";
      realTest.attemptsLeft = Math.max(0, realTest.attemptsLeft - 1);
      realTest.score = score;
      realTest.wrongIndices = wrongIndices;
      realTest.bookmarks = this.activeTest.bookmarks;
      if (realTest.bestScore === null || score > realTest.bestScore)
        realTest.bestScore = score;
      app.saveData();
    }

    document.getElementById("res-score").innerText = score;
    document.getElementById("res-correct").innerText = correct;
    document.getElementById("res-wrong").innerText = wrong;
    const acc = Math.round(
      (Math.max(0, score) / (this.activeTest.questions.length * 4)) * 100,
    );
    document.getElementById("res-acc").innerText = acc + "%";

    new Chart(document.getElementById("resultChart"), {
      type: "doughnut",
      data: {
        labels: ["Correct", "Wrong", "Skipped"],
        datasets: [
          {
            data: [
              correct,
              wrong,
              this.activeTest.questions.length - (correct + wrong),
            ],
            backgroundColor: ["#10b981", "#ef4444", "#2e364f"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "85%",
        plugins: { legend: { display: false } },
      },
    });

    app.showScreen("results");
  },
};

window.onload = () => app.init();
