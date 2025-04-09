// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "Which animal is a reptile?",
      answers: [
        { text: "Elephant", correct: false },
        { text: "Komodo Dragon", correct: true },
        { text: "Armadillo", correct: false },
        { text: "Chicken", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We know what id to search for by finding the corresponding id inside a div in the html file. The following ids are specified inside <div>s in index.html. 
  // "question" is specified on line 14, "answer-buttons" is specified on line 15, "next-btn" is specified on line 18
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn"); 
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // They are being created dynamically because each question has 4 potential answers, where any of the question elements could have the correct answer. 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // The line below is appending the created button to the group of answer buttons
      answerButtonsElement.appendChild(button);
    });
    hintButton.style.display = "block"; 
  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "none"; 
    answerButtonsElement.innerHTML = "";
    hintButton.disabled = false;
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // changing the display style to "block" makes the next button visible. If we didn't have this line the next button wouldn't be visible 
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // This block of code is checking if the quiz is already in progress (i.e a question has already been answered)
  // or the user just answered the first question. If the user has answered a question that is not the first question, call 
  // handleNextButton. if the user answered the first question, call startQuiz. 
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  hintButton.addEventListener("click", () => {
    const buttons = Array.from(answerButtonsElement.children);
    const incorrectButtons = buttons.filter(button => button.dataset.correct !== "true");

    const randWrong = incorrectButtons[Math.floor(Math.random() * 3)];
    randWrong.classList.add("wrong");
  
    hintButton.disabled = true;
  });

  startQuiz();
  