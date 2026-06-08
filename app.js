// State Management
let state = {
  currentPlan: 'short',
  currentCategory: 'all',
  currentWordIndex: 0,
  filteredWords: [],
  bookmarks: [],
  activeTab: 'dashboard',
  streakCount: 0,
  lastLearnDate: null,
  correctSpellingWords: new Set(),
  correctQuizWords: new Set(),
  masteryPercentage: 0
};

// Quiz Session State
let quizState = {
  active: false,
  type: null, // 'choice' or 'spelling'
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false
};

// DOM Elements
const elements = {
  // Navigation & Filters
  tabs: document.querySelectorAll('.tab-btn'),
  panels: document.querySelectorAll('.tab-panel'),
  filters: document.querySelectorAll('.filter-btn'),
  streakDisplay: document.getElementById('streak-display'),
  scoreDisplay: document.getElementById('score-display'),
  toast: document.getElementById('toast-msg'),
  planSelect: document.getElementById('plan-select'),
  resetProgressBtn: document.getElementById('reset-progress-btn'),

  // Dashboard Tab
  mainCard: document.getElementById('main-vocab-card'),
  cardBadge: document.getElementById('card-badge'),
  cardWord: document.getElementById('card-word'),
  cardPos: document.getElementById('card-pos'),
  cardPhonetic: document.getElementById('card-phonetic'),
  cardTranslation: document.getElementById('card-translation'),
  cardDefinition: document.getElementById('card-definition'),
  cardExamples: document.getElementById('card-examples-container'),
  cardSpeakBtn: document.getElementById('card-speak-btn'),
  dashboardBookmarkBtn: document.getElementById('dashboard-bookmark-btn'),
  nextWordBtn: document.getElementById('next-word-btn'),

  // Flashcards Tab
  fcWrapper: document.getElementById('flashcard-wrapper'),
  fcBadge: document.getElementById('fc-badge'),
  fcWord: document.getElementById('fc-word'),
  fcPos: document.getElementById('fc-pos'),
  fcPhonetic: document.getElementById('fc-phonetic'),
  fcTranslation: document.getElementById('fc-translation'),
  fcDefinition: document.getElementById('fc-definition'),
  fcExamples: document.getElementById('fc-examples-container'),
  fcPrevBtn: document.getElementById('fc-prev-btn'),
  fcNextBtn: document.getElementById('fc-next-btn'),

  // Quiz Tab
  quizMenuView: document.getElementById('quiz-menu-view'),
  quizQuestionView: document.getElementById('quiz-question-view'),
  quizSpellingView: document.getElementById('quiz-spelling-view'),
  quizResultView: document.getElementById('quiz-result-view'),
  startChoiceBtn: document.getElementById('start-choice-quiz-btn'),
  startSpellingBtn: document.getElementById('start-spelling-quiz-btn'),
  quizCounter: document.getElementById('quiz-counter'),
  quizScore: document.getElementById('quiz-score'),
  quizProgress: document.getElementById('quiz-progress'),
  quizQWord: document.getElementById('quiz-q-word'),
  quizOptionsContainer: document.getElementById('quiz-options-container'),
  quizNextBtn: document.getElementById('quiz-next-btn'),
  spellingCounter: document.getElementById('spelling-counter'),
  spellingScore: document.getElementById('spelling-score'),
  spellingProgress: document.getElementById('spelling-progress'),
  spellingHintSentence: document.getElementById('spelling-hint-sentence'),
  spellingHintZh: document.getElementById('spelling-hint-zh'),
  spellingInput: document.getElementById('spelling-input'),
  spellingHintBtn: document.getElementById('spelling-hint-btn'),
  spellingCheckBtn: document.getElementById('spelling-check-btn'),
  resultIconDisplay: document.getElementById('result-icon-display'),
  resultTitle: document.getElementById('result-title'),
  resultStatsText: document.getElementById('result-stats-text'),
  quizRestartBtn: document.getElementById('quiz-restart-btn'),

  // Bookmarks Tab
  bookmarksEmptyView: document.getElementById('bookmarks-empty-view'),
  bookmarksContainer: document.getElementById('bookmarks-list-container')
};

// Initialize Application
function init() {
  loadLocalStorage();
  updateStreak();
  filterVocabulary();
  setupEventListeners();
  renderDashboard();
  renderBookmarks();
  updateMasteryUI();
  
  // Audio configuration warm-up
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
}

// Local Storage Helper Functions
function loadLocalStorage() {
  // Bookmarks
  const savedBookmarks = localStorage.getItem('vocab_bookmarks');
  if (savedBookmarks) {
    state.bookmarks = JSON.parse(savedBookmarks);
  }

  // Streak
  const savedStreak = localStorage.getItem('vocab_streak_count');
  if (savedStreak) {
    state.streakCount = parseInt(savedStreak, 10);
  }
  state.lastLearnDate = localStorage.getItem('vocab_last_learn_date');

  // Plan
  const savedPlan = localStorage.getItem('vocab_current_plan');
  if (savedPlan) {
    state.currentPlan = savedPlan;
    elements.planSelect.value = savedPlan;
  }

  // Mastery Stats
  const savedSpellingCorrect = localStorage.getItem('vocab_correct_spelling');
  if (savedSpellingCorrect) {
    state.correctSpellingWords = new Set(JSON.parse(savedSpellingCorrect));
  }
  const savedQuizCorrect = localStorage.getItem('vocab_correct_quiz');
  if (savedQuizCorrect) {
    state.correctQuizWords = new Set(JSON.parse(savedQuizCorrect));
  }
}

function saveBookmarks() {
  localStorage.setItem('vocab_bookmarks', JSON.stringify(state.bookmarks));
}

function saveMastery() {
  localStorage.setItem('vocab_correct_spelling', JSON.stringify([...state.correctSpellingWords]));
  localStorage.setItem('vocab_correct_quiz', JSON.stringify([...state.correctQuizWords]));
}

// Streak Calculation Logic
function updateStreak() {
  const today = new Date().toDateString();
  
  if (state.lastLearnDate) {
    const lastDate = new Date(state.lastLearnDate);
    const timeDiff = new Date(today) - lastDate;
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff === 1) {
      // Studied yesterday, increment streak
      state.streakCount++;
      state.lastLearnDate = today;
    } else if (dayDiff > 1) {
      // Missed days, reset streak to 1
      state.streakCount = 1;
      state.lastLearnDate = today;
    }
    // If dayDiff === 0, it means they already studied today, keep current streak
  } else {
    // First time studying
    state.streakCount = 1;
    state.lastLearnDate = today;
  }

  localStorage.setItem('vocab_streak_count', state.streakCount);
  localStorage.setItem('vocab_last_learn_date', state.lastLearnDate);

  elements.streakDisplay.querySelector('span').textContent = `連續學習 ${state.streakCount} 天`;
}

// Calculate overall vocabulary mastery percentage
  function updateMasteryUI() {
    const planWords = VOCAB_DATABASE.filter(w => w.plan === state.currentPlan);
    const totalWords = planWords.length;
    // A word is mastered if it is correctly answered in BOTH spelling and multiple choice quizzes
    const masteredCount = planWords.filter(w => 
      state.correctSpellingWords.has(w.word) || state.correctQuizWords.has(w.word)
    ).length;
  
    state.masteryPercentage = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;
    elements.scoreDisplay.querySelector('span').textContent = `熟練度 ${state.masteryPercentage}%`;
  }

// Text to Speech (TTS)
function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any current audio
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for language learners

    // Attempt to pick a natural sounding English voice
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en-') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
    if (enVoice) {
      utterance.voice = enVoice;
    }
    window.speechSynthesis.speak(utterance);
  } else {
    showToast("瀏覽器不支援發音功能");
  }
}

// Filter vocabulary words based on chosen category and plan
function filterVocabulary() {
  // Filter by active plan first
  let tempWords = VOCAB_DATABASE.filter(w => w.plan === state.currentPlan);
  
  if (state.currentCategory === 'all') {
    state.filteredWords = tempWords;
  } else {
    state.filteredWords = tempWords.filter(w => w.category === state.currentCategory);
  }
  
  // Randomize list to keep it fresh every session
  shuffleArray(state.filteredWords);
  state.currentWordIndex = 0;
}

// Shuffle helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Render Dashboard Panel
function renderDashboard() {
  if (state.filteredWords.length === 0) return;
  const wordObj = state.filteredWords[state.currentWordIndex];

  // Set card info
  elements.cardWord.textContent = wordObj.word;
  elements.cardPos.textContent = wordObj.pos;
  elements.cardPhonetic.textContent = wordObj.phonetic;
  elements.cardTranslation.textContent = wordObj.translation;
  elements.cardDefinition.textContent = wordObj.definition;

  // Category badges
  elements.cardBadge.className = `category-badge badge-${wordObj.category}`;
  elements.cardBadge.textContent = wordObj.category === 'conversation' ? '生活會話' : '職場英文';

  // Bookmark button state
  if (state.bookmarks.includes(wordObj.word)) {
    elements.dashboardBookmarkBtn.classList.add('bookmarked');
  } else {
    elements.dashboardBookmarkBtn.classList.remove('bookmarked');
  }

  // Render example sentences
  elements.cardExamples.innerHTML = '';
  wordObj.examples.forEach(ex => {
    const item = document.createElement('div');
    item.className = 'example-item';
    item.innerHTML = `
      <div class="example-text-en">${ex.en}</div>
      <div class="example-text-zh">${ex.zh}</div>
      <button class="example-speaker" title="朗讀例句">
        <i class="fa-solid fa-volume-high"></i>
      </button>
    `;

    // Speak example sentence when clicking the small audio button
    item.querySelector('.example-speaker').addEventListener('click', (e) => {
      e.stopPropagation();
      speak(ex.en);
    });

    elements.cardExamples.appendChild(item);
  });
}

// Render Flashcards Panel
function renderFlashcards() {
  if (state.filteredWords.length === 0) return;
  const wordObj = state.filteredWords[state.currentWordIndex];

  // Reset flip status
  elements.fcWrapper.classList.remove('flipped');

  // Front face
  elements.fcWord.textContent = wordObj.word;
  elements.fcPos.textContent = wordObj.pos;
  elements.fcPhonetic.textContent = wordObj.phonetic;
  elements.fcBadge.className = `category-badge badge-${wordObj.category}`;
  elements.fcBadge.textContent = wordObj.category === 'conversation' ? '生活會話' : '職場英文';

  // Back face
  elements.fcTranslation.textContent = wordObj.translation;
  elements.fcDefinition.textContent = wordObj.definition;

  // Back face examples
  elements.fcExamples.innerHTML = '';
  wordObj.examples.forEach(ex => {
    const item = document.createElement('div');
    item.className = 'example-item';
    item.style.padding = '0.75rem';
    item.innerHTML = `
      <div class="example-text-en" style="font-size: 0.95rem;">${ex.en}</div>
      <div class="example-text-zh" style="font-size: 0.85rem;">${ex.zh}</div>
    `;
    elements.fcExamples.appendChild(item);
  });
}

// Render Bookmarks Panel
function renderBookmarks() {
  elements.bookmarksContainer.innerHTML = '';
  
  if (state.bookmarks.length === 0) {
    elements.bookmarksEmptyView.style.display = 'block';
    return;
  }
  
  elements.bookmarksEmptyView.style.display = 'none';

  state.bookmarks.forEach(wordName => {
    // Find matching word details
    const wordObj = VOCAB_DATABASE.find(w => w.word === wordName);
    if (!wordObj) return;

    const miniCard = document.createElement('div');
    miniCard.className = 'bookmark-mini-card glass-panel';
    miniCard.innerHTML = `
      <div class="word-info">
        <span class="category-badge badge-${wordObj.category}" style="margin-bottom: 0.5rem; font-size: 0.65rem;">
          ${wordObj.category === 'conversation' ? '生活' : '職場'}
        </span>
        <div>
          <span class="mini-title">${wordObj.word}</span>
          <span class="word-pos" style="font-size: 0.9rem;">${wordObj.pos}</span>
        </div>
        <div class="mini-translation">${wordObj.translation}</div>
      </div>
      <div class="actions-right">
        <button class="pronounce-btn" title="播放發音"><i class="fa-solid fa-volume-high"></i></button>
        <button class="remove-bookmark-btn" title="移出生字簿"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;

    // Click word title to redirect to home dashboard and show full details
    miniCard.querySelector('.mini-title').addEventListener('click', () => {
      // Find filtered index or update list
      let idx = state.filteredWords.findIndex(w => w.word === wordObj.word);
      if (idx !== -1) {
        state.currentWordIndex = idx;
      } else {
        // Fallback: reset plan and category filters to match the word's plan
        state.currentPlan = wordObj.plan;
        elements.planSelect.value = wordObj.plan;
        localStorage.setItem('vocab_current_plan', wordObj.plan);
        
        state.currentCategory = 'all';
        elements.filters.forEach(btn => {
          if (btn.dataset.category === 'all') btn.classList.add('active');
          else btn.classList.remove('active');
        });
        
        filterVocabulary();
        state.currentWordIndex = state.filteredWords.findIndex(w => w.word === wordObj.word);
        updateMasteryUI();
      }

      // Switch Tab to Dashboard
      switchTab('dashboard');
      renderDashboard();
    });

    // Speak word
    miniCard.querySelector('.pronounce-btn').addEventListener('click', () => speak(wordObj.word));

    // Delete bookmark
    miniCard.querySelector('.remove-bookmark-btn').addEventListener('click', () => {
      state.bookmarks = state.bookmarks.filter(w => w !== wordObj.word);
      saveBookmarks();
      renderBookmarks();
      renderDashboard();
      showToast("已從生字簿移除");
    });

    elements.bookmarksContainer.appendChild(miniCard);
  });
}

// Generate Toast Alert
function showToast(message) {
  elements.toast.querySelector('span').textContent = message;
  elements.toast.classList.add('show');
  
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 2000);
}

// Setup Event Listeners
function setupEventListeners() {
  // Tab Switcher
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      switchTab(targetTab);
    });
  });

  // Category Filters
  elements.filters.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      
      filterVocabulary();
      renderDashboard();
      renderFlashcards();
      
      // If quiz is ongoing, reset it back to menu
      if (quizState.active) {
        resetQuiz();
      }
    });
  });

  // Speak main word
  elements.cardSpeakBtn.addEventListener('click', () => {
    const wordObj = state.filteredWords[state.currentWordIndex];
    if (wordObj) speak(wordObj.word);
  });

  // Toggle Bookmark status
  elements.dashboardBookmarkBtn.addEventListener('click', () => {
    const wordObj = state.filteredWords[state.currentWordIndex];
    if (!wordObj) return;

    if (state.bookmarks.includes(wordObj.word)) {
      state.bookmarks = state.bookmarks.filter(w => w !== wordObj.word);
      elements.dashboardBookmarkBtn.classList.remove('bookmarked');
      showToast("已從生字簿移除");
    } else {
      state.bookmarks.push(wordObj.word);
      elements.dashboardBookmarkBtn.classList.add('bookmarked');
      showToast("已加入生字簿！");
    }
    
    saveBookmarks();
    renderBookmarks();
  });

  // Next Word in Dashboard
  elements.nextWordBtn.addEventListener('click', () => {
    state.currentWordIndex = (state.currentWordIndex + 1) % state.filteredWords.length;
    renderDashboard();
  });

  // Flashcard flipping toggles card state
  elements.fcWrapper.addEventListener('click', () => {
    elements.fcWrapper.classList.toggle('flipped');
  });

  // Flashcards prev/next actions
  elements.fcPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.currentWordIndex = (state.currentWordIndex - 1 + state.filteredWords.length) % state.filteredWords.length;
    renderFlashcards();
  });

  elements.fcNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.currentWordIndex = (state.currentWordIndex + 1) % state.filteredWords.length;
    renderFlashcards();
  });

  // Quiz Event Listeners
  elements.startChoiceBtn.addEventListener('click', () => startQuiz('choice'));
  elements.startSpellingBtn.addEventListener('click', () => startQuiz('spelling'));
  
  elements.quizNextBtn.addEventListener('click', () => {
    quizState.currentIndex++;
    showNextQuizQuestion();
  });

  elements.spellingCheckBtn.addEventListener('click', checkSpellingAnswer);
  
  // Submit spelling answer on Enter key
  elements.spellingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkSpellingAnswer();
    }
  });

  elements.spellingHintBtn.addEventListener('click', revealSpellingHintLetter);
  elements.quizRestartBtn.addEventListener('click', resetQuiz);

  // Plan Selector Change
  elements.planSelect.addEventListener('change', (e) => {
    state.currentPlan = e.target.value;
    localStorage.setItem('vocab_current_plan', state.currentPlan);
    
    // Refresh words and display
    filterVocabulary();
    renderDashboard();
    renderFlashcards();
    updateMasteryUI();
    
    if (quizState.active) {
      resetQuiz();
    }
    showToast(`已切換為：${state.currentPlan === 'short' ? '短期核心' : state.currentPlan === 'medium' ? '中期進階' : '長期商務'}計畫`);
  });

  // Reset Progress for Current Plan
  elements.resetProgressBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const planName = state.currentPlan === 'short' ? '短期核心' : state.currentPlan === 'medium' ? '中期進階' : '長期商務';
    
    if (confirm(`確定要清除【${planName}】計畫的熟練度進度嗎？`)) {
      // Find all words in current plan and remove them from correct sets
      const planWords = VOCAB_DATABASE.filter(w => w.plan === state.currentPlan).map(w => w.word);
      
      planWords.forEach(word => {
        state.correctSpellingWords.delete(word);
        state.correctQuizWords.delete(word);
      });
      
      saveMastery();
      updateMasteryUI();
      showToast("已清除該計畫進度");
      
      if (quizState.active) {
        resetQuiz();
      }
    }
  });
}

// Transition helper for tabs
function switchTab(tabName) {
  state.activeTab = tabName;
  
  elements.tabs.forEach(btn => {
    if (btn.dataset.tab === tabName) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  elements.panels.forEach(panel => {
    if (panel.id === `${tabName}-panel`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // Render trigger actions for specific panels
  if (tabName === 'dashboard') {
    renderDashboard();
  } else if (tabName === 'flashcards') {
    renderFlashcards();
  } else if (tabName === 'bookmarks') {
    renderBookmarks();
  } else if (tabName === 'quiz') {
    if (!quizState.active) {
      resetQuiz();
    }
  }
}

// === INTERACTIVE QUIZ MECHANICS ===

function resetQuiz() {
  quizState.active = false;
  quizState.type = null;
  quizState.questions = [];
  quizState.currentIndex = 0;
  quizState.score = 0;
  
  elements.quizMenuView.style.display = 'block';
  elements.quizQuestionView.style.display = 'none';
  elements.quizSpellingView.style.display = 'none';
  elements.quizResultView.style.display = 'none';
}

function startQuiz(type) {
  quizState.active = true;
  quizState.type = type;
  quizState.currentIndex = 0;
  quizState.score = 0;

  // We want to test on 5 questions
  const totalQuestions = Math.min(5, state.filteredWords.length);
  
  if (totalQuestions < 4 && type === 'choice') {
    showToast("單字數量不足，無法生成測驗，請切換分類");
    resetQuiz();
    return;
  }

  // Pick 5 random words from our filtered set
  const pool = [...state.filteredWords];
  shuffleArray(pool);
  const quizWords = pool.slice(0, totalQuestions);

  // Build question blueprints
  quizState.questions = quizWords.map(wordObj => {
    if (type === 'choice') {
      // Create options: 1 correct, 3 wrong translations
      const options = [wordObj.translation];
      const wrongPool = VOCAB_DATABASE.filter(w => w.translation !== wordObj.translation);
      shuffleArray(wrongPool);
      
      for (let i = 0; i < 3; i++) {
        if (wrongPool[i]) {
          options.push(wrongPool[i].translation);
        }
      }
      shuffleArray(options);

      return {
        word: wordObj.word,
        translation: wordObj.translation,
        correctAnswer: wordObj.translation,
        options: options,
        originalObj: wordObj
      };
    } else {
      // Spelling type
      // Pick a random example sentence and mask the word
      const example = wordObj.examples[0];
      const maskedEn = maskWordInSentence(example.en, wordObj.word);
      const hintPattern = getSpellingHintPattern(wordObj.word);

      return {
        word: wordObj.word,
        hintPattern: hintPattern,
        sentence: maskedEn,
        zhSentence: example.zh,
        originalObj: wordObj
      };
    }
  });

  elements.quizMenuView.style.display = 'none';
  elements.quizResultView.style.display = 'none';

  if (type === 'choice') {
    elements.quizQuestionView.style.display = 'block';
    elements.quizSpellingView.style.display = 'none';
  } else {
    elements.quizQuestionView.style.display = 'none';
    elements.quizSpellingView.style.display = 'block';
  }

  showNextQuizQuestion();
}

function showNextQuizQuestion() {
  quizState.answered = false;
  
  if (quizState.currentIndex >= quizState.questions.length) {
    showQuizResults();
    return;
  }

  const q = quizState.questions[quizState.currentIndex];

  if (quizState.type === 'choice') {
    // Render Multiple Choice question
    elements.quizNextBtn.style.display = 'none';
    elements.quizCounter.textContent = `問題 ${quizState.currentIndex + 1} / ${quizState.questions.length}`;
    elements.quizScore.textContent = `得分: ${quizState.score}`;
    
    const progressPercent = (quizState.currentIndex / quizState.questions.length) * 100;
    elements.quizProgress.style.width = `${progressPercent}%`;
    
    elements.quizQWord.textContent = q.word;
    elements.quizOptionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-index">${String.fromCharCode(65 + idx)}</span>
        <span class="option-text">${opt}</span>
      `;
      btn.addEventListener('click', () => handleOptionClick(btn, opt, q));
      elements.quizOptionsContainer.appendChild(btn);
    });
  } else {
    // Render Spelling question
    elements.spellingCounter.textContent = `問題 ${quizState.currentIndex + 1} / ${quizState.questions.length}`;
    elements.spellingScore.textContent = `得分: ${quizState.score}`;
    
    const progressPercent = (quizState.currentIndex / quizState.questions.length) * 100;
    elements.spellingProgress.style.width = `${progressPercent}%`;
    
    // Reset inputs
    elements.spellingInput.value = '';
    elements.spellingInput.className = 'spelling-input';
    elements.spellingInput.disabled = false;
    elements.spellingCheckBtn.disabled = false;
    elements.spellingCheckBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>檢查答案</span>';
    
    // Set text
    elements.spellingHintSentence.innerHTML = q.sentence.replace('_______', `<span class="spelling-blank">${q.hintPattern}</span>`);
    elements.spellingHintZh.textContent = `中文翻譯：${q.zhSentence}`;
    elements.spellingInput.focus();
  }
}

function handleOptionClick(selectedBtn, chosenOpt, questionObj) {
  if (quizState.answered) return;
  quizState.answered = true;

  const correctOpt = questionObj.correctAnswer;
  const optionButtons = elements.quizOptionsContainer.querySelectorAll('.quiz-option-btn');

  // Trigger speech synthesis pronunciation
  speak(questionObj.word);

  if (chosenOpt === correctOpt) {
    selectedBtn.classList.add('correct');
    quizState.score++;
    
    // Add to mastery achievements
    state.correctQuizWords.add(questionObj.word);
    saveMastery();
    updateMasteryUI();
  } else {
    selectedBtn.classList.add('wrong');
    // Highlight correct answer
    optionButtons.forEach(btn => {
      if (btn.querySelector('.option-text').textContent === correctOpt) {
        btn.classList.add('correct');
      }
    });
  }

  // Show "Next" button
  elements.quizNextBtn.style.display = 'flex';
}

function checkSpellingAnswer() {
  if (quizState.answered) {
    // If already answered, this button transitions to the next question
    quizState.currentIndex++;
    showNextQuizQuestion();
    return;
  }

  const q = quizState.questions[quizState.currentIndex];
  const userAns = elements.spellingInput.value.trim().toLowerCase();
  const correctAns = q.word.toLowerCase();

  if (!userAns) {
    showToast("請輸入答案！");
    return;
  }

  quizState.answered = true;
  speak(q.word);

  if (userAns === correctAns) {
    elements.spellingInput.classList.add('correct');
    quizState.score++;
    
    // Add to mastery achievements
    state.correctSpellingWords.add(q.word);
    saveMastery();
    updateMasteryUI();
  } else {
    elements.spellingInput.classList.add('wrong');
    // Reveal correct spelling inside the input
    elements.spellingInput.value = q.word;
  }

  elements.spellingInput.disabled = true;
  elements.spellingCheckBtn.innerHTML = '<span>下一題</span> <i class="fa-solid fa-arrow-right"></i>';
}

function revealSpellingHintLetter() {
  const q = quizState.questions[quizState.currentIndex];
  // Simple prompt/toast with the explanation
  showToast(`單字提示：首字母是 '${q.word[0]}', 共 ${q.word.length} 個字母`);
}

// Generate Spelling Hint Patterns (e.g. c _ _ _ _ _ _ _ _ _ e)
function getSpellingHintPattern(word) {
  if (word.length <= 4) {
    return word[0] + ' ' + '_ '.repeat(word.length - 1).trim();
  }
  return word[0] + ' ' + '_ '.repeat(word.length - 2) + word[word.length - 1];
}

// Mask word inside a sentence with an underline
function maskWordInSentence(sentence, word) {
  // Create regex pattern matching word with plurals/tenses, case-insensitively
  const baseWord = word.toLowerCase();
  
  // Clean punctuation from word for regex safety
  const escaped = baseWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  // Matches word roots plus common suffixes like ed, ing, s, es, ly, etc.
  const regex = new RegExp(`\\b${escaped}(s|es|ed|ing|ly)?\\b`, 'gi');
  return sentence.replace(regex, '_______');
}

// Show Results page at end of quiz
function showQuizResults() {
  elements.quizQuestionView.style.display = 'none';
  elements.quizSpellingView.style.display = 'none';
  elements.quizResultView.style.display = 'block';

  const accuracy = Math.round((quizState.score / quizState.questions.length) * 100);
  
  // Set icons & headers based on success
  if (accuracy >= 80) {
    elements.resultIconDisplay.innerHTML = '<i class="fa-solid fa-trophy" style="color: var(--color-warning);"></i>';
    elements.resultTitle.textContent = "太厲害了！";
  } else if (accuracy >= 60) {
    elements.resultIconDisplay.innerHTML = '<i class="fa-solid fa-award" style="color: var(--color-secondary);"></i>';
    elements.resultTitle.textContent = "做得好！繼續加油";
  } else {
    elements.resultIconDisplay.innerHTML = '<i class="fa-solid fa-circle-info" style="color: var(--text-muted);"></i>';
    elements.resultTitle.textContent = "再接再厲！";
  }

  elements.resultStatsText.innerHTML = `您的得分是 <span>${accuracy}%</span> (答對 ${quizState.score} 題 / 共 ${quizState.questions.length} 題)`;
}

// Start application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  init();
});
