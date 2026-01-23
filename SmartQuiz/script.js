document.addEventListener('DOMContentLoaded', () => {
  const timerElement = document.getElementById('timer');
  const finalSubmitBtn = document.getElementById('final-submit-btn');
  let timeLeft = 10799; // approx 3 hours in seconds

  const questionTitle = document.getElementById('question-title');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const sections = ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'];

  const questionsData = {
    PHYSICS: [
      { question: "The characteristic distance at which quantum gravitational effects are significant, the Planck length, can be determined from a suitable combination of the fundamental physical constants G, h, and c. Which of the following correctly gives the Planck length?", options: ["G h² c³", "G² h c", "sqrt(h G / c³)", "(h c / G)²"], correctOption: "sqrt(h G / c³)" },
      { question: "A particle is moving with uniform velocity. What is the acceleration of the particle?", options: ["Zero", "Constant non-zero", "Increasing", "Decreasing"], correctOption: "Zero" },
      { question: "Which physical quantity is a scalar?", options: ["Displacement", "Velocity", "Speed", "Acceleration"], correctOption: "Speed" },
      { question: "Physics Placeholder Question 4?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 5?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 6?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 7?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 8?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 9?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 10?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 11?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 12?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 13?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 14?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 15?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 16?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 17?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 18?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 19?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Placeholder Question 20?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Physics Integer Question 21?", integerAnswer: true, correctOption: "42" },
      { question: "Physics Integer Question 22?", integerAnswer: true, correctOption: "17" },
      { question: "Physics Integer Question 23?", integerAnswer: true, correctOption: "8" },
      { question: "Physics Integer Question 24?", integerAnswer: true, correctOption: "19" },
      { question: "Physics Integer Question 25?", integerAnswer: true, correctOption: "5" }
    ],
    CHEMISTRY: [
      { question: "Which of the following is the correct molecular formula of ozone?", options: ["O₂", "O₃", "O", "O₄"], correctOption: "O₃" },
      { question: "The pH of pure water at 25°C is approximately:", options: ["0", "7", "14", "1"], correctOption: "7" },
      { question: "Which gas is known as 'laughing gas'?", options: ["Nitrogen monoxide", "Nitrous oxide", "Nitrogen dioxide", "Ammonia"], correctOption: "Nitrous oxide" },
      { question: "Chemistry Placeholder Question 4?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 5?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 6?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 7?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 8?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 9?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 10?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 11?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 12?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 13?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 14?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 15?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 16?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 17?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 18?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 19?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Placeholder Question 20?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Chemistry Integer Question 21?", integerAnswer: true, correctOption: "10" },
      { question: "Chemistry Integer Question 22?", integerAnswer: true, correctOption: "3" },
      { question: "Chemistry Integer Question 23?", integerAnswer: true, correctOption: "7" },
      { question: "Chemistry Integer Question 24?", integerAnswer: true, correctOption: "21" },
      { question: "Chemistry Integer Question 25?", integerAnswer: true, correctOption: "12" }
    ],
    MATHEMATICS: [
      { question: "What is the value of sin(90°)?", options: ["0", "1", "√2/2", "Undefined"], correctOption: "1" },
      { question: "If f(x) = x², what is f'(x)?", options: ["x", "2x", "x²", "1/2x"], correctOption: "2x" },
      { question: "The roots of the equation x² - 5x + 6 = 0 are:", options: ["2 and 3", "1 and 6", "-2 and -3", "-1 and -6"], correctOption: "2 and 3" },
      { question: "Mathematics Placeholder Question 4?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 5?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 6?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 7?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 8?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 9?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 10?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 11?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 12?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 13?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 14?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 15?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 16?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 17?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 18?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 19?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Placeholder Question 20?", options: ["Option A", "Option B", "Option C", "Option D"], correctOption: "Option A" },
      { question: "Mathematics Integer Question 21?", integerAnswer: true, correctOption: "9" },
      { question: "Mathematics Integer Question 22?", integerAnswer: true, correctOption: "15" },
      { question: "Mathematics Integer Question 23?", integerAnswer: true, correctOption: "4" },
      { question: "Mathematics Integer Question 24?", integerAnswer: true, correctOption: "6" },
      { question: "Mathematics Integer Question 25?", integerAnswer: true, correctOption: "11" }
    ]
  };

  const state = {};
  sections.forEach(section => {
    const length = 25;
    state[section] = Array(length).fill(null).map(() => ({ answer: null, status: 'not-visited' }));
  });

  sections.forEach(section => {
    const grid = document.getElementById(section.toLowerCase() + '-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 25; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('q-btn', 'not-visited');
      btn.dataset.section = section;
      btn.dataset.index = i - 1;
      grid.appendChild(btn);
    }
  });

  sections.forEach(section => {
    const gridSection = document.getElementById(section);
    gridSection.style.display = section === 'PHYSICS' ? 'grid' : 'none';
  });

  let currentSection = 'PHYSICS';
  let currentIndex = 0;

  function updateSidebarCounts() {
    const counts = {
      'not-visited': 0,
      'not-answered': 0,
      'answered': 0,
      'marked-review': 0,
      'answered-marked': 0
    };
    sections.forEach(section => {
      state[section].forEach(q => {
        counts[q.status]++;
      });
    });
    document.querySelector('.status-row.not-visited .count').textContent = counts['not-visited'];
    document.querySelector('.status-row.not-answered .count').textContent = counts['not-answered'];
    document.querySelector('.status-row.answered .count').textContent = counts['answered'];
    document.querySelector('.status-row.marked-review .count').textContent = counts['marked-review'];
    document.querySelector('.status-row.answered-marked .count').textContent = counts['answered-marked'];
  }

  function updateQuestionGridButtons() {
    sections.forEach(section => {
      const grid = document.getElementById(section.toLowerCase() + '-grid');
      [...grid.children].forEach(btn => {
        const idx = parseInt(btn.dataset.index, 10);
        const status = state[section][idx].status;
        btn.className = 'q-btn ' + status;
        if (section === currentSection && idx === currentIndex) {
          btn.classList.add('current-question');
        }
      });
    });
  }

  function loadQuestion(section, index) {
    currentSection = section;
    currentIndex = index;
    const questionObj = questionsData[section][index];
    questionTitle.textContent = `Question ${index + 1}:`;
    questionText.textContent = questionObj.question;
    optionsContainer.innerHTML = '';

    if (questionObj.integerAnswer) {
      const input = document.createElement('input');
      input.type = 'number';
      input.name = 'answer';
      input.id = 'integer-answer';
      input.style.fontSize = '20px';
      input.style.padding = '5px';
      input.style.marginBottom = '15px';  // Margin added here
      input.style.width = '100%';
      input.style.boxSizing = 'border-box';
      input.placeholder = 'Enter integer answer here';
      const saved = state[section][index].answer;
      if (saved !== null && saved !== undefined) {
        input.value = saved;
      }
      optionsContainer.appendChild(input);
    } else {
      questionObj.options.forEach((opt, idx) => {
        const optionId = `opt-${section}-${index}-${idx}`;
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerHTML = `
              <input type="radio" name="answer" id="${optionId}" value="${opt}">
              <label for="${optionId}">${opt}</label>
          `;
        optionsContainer.appendChild(optionDiv);
      });
      const saved = state[section][index].answer;
      if (saved !== null) {
        const options = optionsContainer.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
          if (option.value === saved) {
            option.checked = true;
          }
        });
      }
    }

    if (state[section][index].status === 'not-visited') {
      state[section][index].status = state[section][index].answer ? 'answered' : 'not-answered';
    }

    updateSidebarCounts();
    updateQuestionGridButtons();
  }

  function enableFinalSubmitBtn() {
    finalSubmitBtn.disabled = false;
    finalSubmitBtn.classList.add('enabled');
    finalSubmitBtn.style.cursor = 'pointer';
    finalSubmitBtn.style.opacity = '1';
  }

  function updateFinalSubmitButton() {
    enableFinalSubmitBtn();
  }

  function saveAnswer() {
    const questionObj = questionsData[currentSection][currentIndex];
    let selectedAnswer = null;
    if (questionObj.integerAnswer) {
      const input = optionsContainer.querySelector('input[type="number"]');
      if (input && input.value.trim() !== '') {
        selectedAnswer = input.value.trim();
      }
    } else {
      const selectedOption = optionsContainer.querySelector('input[type="radio"]:checked');
      if (selectedOption) {
        selectedAnswer = selectedOption.value;
      }
    }
    state[currentSection][currentIndex].answer = selectedAnswer;

    if (state[currentSection][currentIndex].status === 'marked-review' || state[currentSection][currentIndex].status === 'answered-marked') {
      state[currentSection][currentIndex].status = selectedAnswer ? 'answered-marked' : 'marked-review';
    } else {
      state[currentSection][currentIndex].status = selectedAnswer ? 'answered' : 'not-answered';
    }

    updateSidebarCounts();
    updateQuestionGridButtons();
    updateFinalSubmitButton();
  }

  function clearResponse() {
    const questionObj = questionsData[currentSection][currentIndex];
    if (questionObj.integerAnswer) {
      const input = optionsContainer.querySelector('input[type="number"]');
      if (input) input.value = '';
    } else {
      const options = optionsContainer.querySelectorAll('input[type="radio"]');
      options.forEach(option => option.checked = false);
    }

    state[currentSection][currentIndex].answer = null;

    if (state[currentSection][currentIndex].status === 'marked-review' || state[currentSection][currentIndex].status === 'answered-marked') {
      state[currentSection][currentIndex].status = 'marked-review';
    } else {
      state[currentSection][currentIndex].status = 'not-answered';
    }

    updateSidebarCounts();
    updateQuestionGridButtons();
    updateFinalSubmitButton();
  }

  function markForReview() {
    const questionObj = questionsData[currentSection][currentIndex];
    let savedAnswer = null;
    if (questionObj.integerAnswer) {
      const input = optionsContainer.querySelector('input[type="number"]');
      savedAnswer = input ? input.value.trim() : null;
    } else {
      const selectedOption = optionsContainer.querySelector('input[type="radio"]:checked');
      savedAnswer = selectedOption ? selectedOption.value : null;
    }
    if (savedAnswer && savedAnswer !== '') {
      state[currentSection][currentIndex].answer = savedAnswer;
      state[currentSection][currentIndex].status = 'answered-marked';
    } else {
      state[currentSection][currentIndex].answer = null;
      state[currentSection][currentIndex].status = 'marked-review';
    }
    updateSidebarCounts();
    updateQuestionGridButtons();
    if (currentIndex < 24) {
      loadQuestion(currentSection, currentIndex + 1);
    }
  }

  function nextQuestion() {
    if (currentIndex < 24) {
      loadQuestion(currentSection, currentIndex + 1);
    } else {
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1];
        loadQuestion(nextSection, 0);
        currentSection = nextSection;
        currentIndex = 0;
        document.querySelectorAll('.subject-nav li').forEach(li => {
          li.classList.toggle('active', li.dataset.section === nextSection);
        });
        sections.forEach(sec => {
          document.getElementById(sec).style.display = (sec === nextSection) ? 'grid' : 'none';
        });
      }
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      loadQuestion(currentSection, currentIndex - 1);
    }
  }

  function evaluateTestWithNegativeMarking(questionsData, userAnswers) {
    let totalQuestions = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    const sectionStats = {};

    for (const section in questionsData) {
      const questions = questionsData[section];
      const answers = userAnswers[section] || [];

      let sectionCorrect = 0;
      let sectionIncorrect = 0;
      let sectionUnanswered = 0;

      totalQuestions += questions.length;

      questions.forEach((q, idx) => {
        const userAnswer = answers[idx]?.answer;
        const correctOption = q.correctOption;

        if (!userAnswer) {
          unanswered++;
          sectionUnanswered++;
        } else if (userAnswer === correctOption) {
          correctAnswers++;
          sectionCorrect++;
        } else {
          incorrectAnswers++;
          sectionIncorrect++;
        }
      });

      sectionStats[section] = {
        correct: sectionCorrect,
        incorrect: sectionIncorrect,
        unanswered: sectionUnanswered
      };
    }

    const score = (correctAnswers * 4) - incorrectAnswers;

    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      score,
      sectionStats
    };
  }

  function submitTest() {
    const result = evaluateTestWithNegativeMarking(questionsData, state);
    alert(`Test Submitted!\nYou scored ${result.score} marks.\n` +
          `Total Questions: ${result.totalQuestions}\n` +
          `Correct Answers: ${result.correctAnswers}\n` +
          `Incorrect Answers: ${result.incorrectAnswers}\n` +
          `Unanswered: ${result.unanswered}`);

    sessionStorage.setItem('testScore', JSON.stringify(result));
    sessionStorage.setItem('testAnswers', JSON.stringify(state));
    sessionStorage.setItem('questionsData', JSON.stringify(questionsData));

    window.location.href = 'preview.html';
  }

  finalSubmitBtn.addEventListener('click', () => {
    if (!finalSubmitBtn.disabled) {
      submitTest();
    }
  });

  document.getElementById('save-next-btn').addEventListener('click', () => {
    saveAnswer();
    if (currentIndex < 24) {
      loadQuestion(currentSection, currentIndex + 1);
    } else {
      nextQuestion();
    }
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    nextQuestion();
  });

  document.getElementById('prev-btn').addEventListener('click', () => {
    prevQuestion();
  });

  document.getElementById('clear-response-btn').addEventListener('click', () => {
    clearResponse();
  });

  document.getElementById('mark-review-btn').addEventListener('click', () => {
    markForReview();
  });

  document.querySelectorAll('.q-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      const index = parseInt(btn.dataset.index, 10);
      loadQuestion(section, index);
      document.querySelectorAll('.subject-nav li').forEach(li => {
        li.classList.toggle('active', li.dataset.section === section);
      });
      sections.forEach(sec => {
        document.getElementById(sec).style.display = (sec === section) ? 'grid' : 'none';
      });
    });
  });

  document.querySelectorAll('.subject-nav li').forEach(li => {
    li.addEventListener('click', () => {
      const selectedSection = li.dataset.section;
      if (!sections.includes(selectedSection)) return;
      sections.forEach(section => {
        document.getElementById(section).style.display = (section === selectedSection) ? 'grid' : 'none';
      });
      li.classList.add('active');
      document.querySelectorAll('.subject-nav li').forEach(other => {
        if (other !== li) other.classList.remove('active');
      });
      loadQuestion(selectedSection, 0);
    });
  });

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Submitting test...');
      submitTest();
    } else {
      timeLeft--;
      timerElement.textContent = formatTime(timeLeft);
      updateFinalSubmitButton();
    }
  }, 1000);

  updateFinalSubmitButton();
  loadQuestion(currentSection, currentIndex);
});