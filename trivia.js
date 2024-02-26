var noQuestions = null;
var refQuestion = null;
var refAnswer = null;
var refValue = null;

window.onload = function () {
  //downloading questions
  document.getElementById("download").onclick = download;

  //form
  refQuestion = document.getElementById("questionText");
  refAnswer = document.getElementById("answerText");
  refValue = document.getElementById("valueText");
  refCategory = document.getElementById("categoryOptions");

  //validate the fields of the form
  refQuestion.onblur = validateQuestion;
  refAnswer.onblur = validateAnswer;
  refValue.onblur = validateValue;

  //form actions
  document.getElementById("addButton").onclick = addButton;
  document.getElementById("cancelButton").onclick = cancelButton;
};

//download questions
function download() {
  noQuestions = document.getElementById("questionId").value;
  if (noQuestions >= 1 && noQuestions <= 100) {
    document.getElementById("errorMessage").textContent = ""; //no error message when downloading the questions
    fetchQuestion(noQuestions);
  } else {
    document.getElementById("errorMessage").textContent =
      "The value should be between 1 and 100."; //display error message
  }
}

function fetchQuestion(noQuestions) {
  const questionsList = document.getElementById("questionsList");

  questionsList.innerHTML = "";

  //snail animation (lasts for 3 seconds)
  loadingAnimation.classList.remove("hidden");
  questionsList.classList.add("hidden");

  setTimeout(function () {
    loadingAnimation.classList.add("hidden");
    questionsList.classList.remove("hidden");
  }, 3000);

  //fetching data
  $.ajax({
    url: `http://jservice.io/api/random?count=${noQuestions}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      var counter = 1;
      data.forEach(function (question) {
        const listItem = document.createElement("li");
        listItem.classList.add("listItem");
        listItem.innerHTML = `
                    <strong>Question ${counter++}:  </strong> ${question.question}<br>
                    <strong>Answer:  </strong> ${question.answer}<br>
                    <strong>Value:  </strong> ${question.value}<br>
                    <strong>Date:  </strong> ${question.created_at}<br>
                    <strong>Category:  </strong> ${question.category.title}<br>          
                `;
        questionsList.append(listItem);
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}

//validate question
function validateQuestion() {
  if (refQuestion.value.length < 10) {
    refQuestion.classList.add("invalid");
  } else {
    refQuestion.classList.remove("invalid");
  }
}

//validate answers
function validateAnswer() {
  if (refAnswer.value.length < 5) {
    refAnswer.classList.add("invalid");
  } else {
    refAnswer.classList.remove("invalid");
  }
}

//validate value
function validateValue() {
  if (refValue.value < 50 || refValue.value > 150) {
    refValue.classList.add("invalid");
  } else {
    refValue.classList.remove("invalid");
  }
}

//adding a question
function addButton(event) {
  event.preventDefault();

  if (
    refQuestion.classList.contains("invalid") ||
    refAnswer.classList.contains("invalid") ||
    refValue.classList.contains("invalid")
  ) {
    console.log("error"); //if the fields are invalid, nothing happens
  } else {
    //if all the fields are valid, here is the process of adding the questions
    const listItem = document.createElement("li");
    const questionsList = document.getElementById("questionsList");

    listItem.classList.add("listItem");
    listItem.innerHTML = `
        <strong>Question:  </strong> ${refQuestion.value}<br>
        <strong>Answer:  </strong> ${refAnswer.value}<br>
        <strong>Value:  </strong> ${refValue.value}<br>
        <strong>Category:  </strong> ${refCategory.value}<br>
    `;

    //animation before displaying the new question at the top of the list
   // loadingAnimation.classList.remove("hidden");
   // questionsList.classList.add("hidden");

   // setTimeout(function () {
   //   loadingAnimation.classList.add("hidden");
   //   questionsList.classList.remove("hidden");
   // }, 3000);

    //adding the question
    questionsList.prepend(listItem);

    //reseting the fields
    refQuestion.value = "";
    refAnswer.value = "";
    refValue.value = "";
    refCategory.value = "Music";
    document.getElementById("errorForm").textContent = "";
  }
}

//exit the form
function cancelButton(event) {
  event.preventDefault();
  document.getElementById("errorForm").textContent = "";
}
