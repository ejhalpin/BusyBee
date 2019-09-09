//==================== Global Containers ====================
var hidden = $("#tray");
var navToggle = $("#nav-toggle");
var mainDisplay = $(".container");

//==================== Element Listeners ====================
$("#login-link").on("click", function() {
  $("#signup-form")
    .detach()
    .appendTo(hidden);
  $("#login-form")
    .detach()
    .appendTo(mainDisplay);
});

$("#signup-link").on("click", function() {
  $("#login-form")
    .detach()
    .appendTo(hidden);
  $("#signup-form")
    .detach()
    .appendTo(mainDisplay);
});

$("#login-submit").on("click", function() {
  //do all of the validation stuff and send the info to the server via axios
  //--->HERE<---//
  $("#login-form")
    .detach()
    .appendTo(hidden);
  implode();
});

$("#signup-submit").on("click", function() {
  //do all of the validation stuff and send the info to the server via axios
  var userObject = {
    name: $("#signup-name")
      .val()
      .trim(),
    email: $("#signup-email")
      .val()
      .trim(),
    password: $("#signup-password")
      .val()
      .trim()
  };
  console.log(userObject);
  $("#signup-form")
    .detach()
    .appendTo(hidden);
  implode();
});
