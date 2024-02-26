//for hiding and showing the form, when necessary
$(document).ready(function () {
  $(".adderContainer").hide();
  var clicked = true;

  //first click to display the form (clicked needs to be true)
  $("#addQuestion").click(function () {
    if (clicked) {
      $(".adderContainer").show();
      clicked = false;
    }
    refQuestion.classList.add("invalid");
    refAnswer.classList.add("invalid");
    refValue.classList.add("invalid");
  });

  //second click, two options: add, cancel (clicked needs to be false)
  $("#cancelButton").click(function () {
    if (!clicked) {
      $(".adderContainer").hide();
      clicked = true;
    }
  });

  $("#addButton").click(function () {
    if (
      refQuestion.classList.contains("invalid") ||
      refAnswer.classList.contains("invalid") ||
      refValue.classList.contains("invalid")
    ) {
      document.getElementById("errorForm").textContent =
        "Some fields are incorrect.";
    } else {
      $(".adderContainer").hide();
      clicked = true;
    }
  });
});
