//==================== Global Variables ====================
var isMenuShowing = true;

//==================== Global Containers ====================
var hidden = $("#tray");
var mainDisplay = $(".container");
var navScene = $("#nav-scene");
var transitionScene = $("#transition-scene");
var mainScene = $("#main-scene");
//==================== Window/Screen Listeners ====================
$(window).on("resize", function() {
  if (!isMenuShowing) {
    adjust();
  }
});

//==================== Document Listeners ====================
$(document).ready(function() {
  navScene.toggleClass("back").toggleClass("front");
  transitionScene.css("z-index", 20);
  mainScene.toggleClass("front").toggleClass("back");
});

//==================== Mouse Events ====================
$(document).on("click", ".hex", function() {
  var desc = $(this).attr("data-desc");
  loadContent(desc);
  if (isMenuShowing) {
    explode().then(function() {});
  }
});
$(document).on("click", "#nav-toggle", function() {
  implode();
});

$(document).on("mouseover", ".hex", function() {
  var ident = $(this)
    .attr("id")
    .split("-")
    .pop();

  $("#view-nav-center").text($(this).attr("data-desc"));
});

$(document).on("mouseout", ".hex", function() {
  $("#view-nav-center").text("");
});

//==================== Touch Events ====================
$(document).on("touchend", ".hex", function(event) {
  //prevent mouse-like behavior
  event.preventDefault();
  var touches = event.originalEvent.changedTouches[0];
  $(document.elementFromPoint(touches.clientX, touches.clientY)).trigger(
    "click"
  );
});

$(document).on("touchmove", function(event) {
  var touches = event.originalEvent.changedTouches[0];
  $(document.elementFromPoint(touches.clientX, touches.clientY)).trigger(
    "mouseover"
  );
});

$(document).on("touchstart", ".hex", function(event) {
  var touches = event.originalEvent.changedTouches[0];
  $(document.elementFromPoint(touches.clientX, touches.clientY)).trigger(
    "mouseover"
  );
});

//==================== Menu Show/Hide/Adjust Functions ====================
function adjust() {
  var hexagons = [
    $("#view-nav-1"),
    $("#view-nav-2"),
    $("#view-nav-3"),
    $("#view-nav-4"),
    $("#view-nav-5"),
    $("#view-nav-6")
  ];
  var delX = screen.width / 2 + 70;
  var delY = (screen.width / 2 + 70) * Math.tan((30 * Math.PI) / 180);
  var delTop = screen.height / 2 + 80;
  var transformEXP = [
    "0, -" + delTop + "px",
    delX + "px, -" + delY + "px",
    delX + "px, " + delY + "px",
    "0, " + delTop + "px",
    "-" + delX + "px, " + delY + "px",
    "-" + delX + "px, -" + delY + "px"
  ];
  var transformIMP = [
    "0, -80px",
    "70px, -40px",
    "70px, 40px",
    "0, 80px",
    "-70px, 40px",
    "-70px, -40px"
  ];
  for (var i = 0; i < 6; i++) {
    hexagons[i].css("transform", "translate(" + transformIMP[i] + ")");
    hexagons[i].css("transform", "translate(" + transformEXP[i] + ")");
  }
}

function explode() {
  return new Promise(resolve => {
    var hexagons = [
      $("#view-nav-1"),
      $("#view-nav-2"),
      $("#view-nav-3"),
      $("#view-nav-4"),
      $("#view-nav-5"),
      $("#view-nav-6")
    ];
    var delX = screen.width / 2 + 70;
    var delY = (screen.width / 2 + 70) * Math.tan((30 * Math.PI) / 180);
    var delTop = screen.height / 2 + 80;
    var transforms = [
      "0, -" + delTop + "px",
      delX + "px, -" + delY + "px",
      delX + "px, " + delY + "px",
      "0, " + delTop + "px",
      "-" + delX + "px, " + delY + "px",
      "-" + delX + "px, -" + delY + "px"
    ];

    for (var i = 0; i < 6; i++) {
      hexagons[i].toggleClass("nav-animate");
      hexagons[i].css("transform", "translate(" + transforms[i] + ")");
    }
    $("#view-nav-center").animate({ opacity: "0" }, 1000, function() {
      $(this)
        .detach()
        .empty()
        .appendTo(hidden);
    });
    transitionScene.animate({ opacity: "0" }, 1000, function() {
      navScene.toggleClass("back").toggleClass("front");
      mainScene.toggleClass("front").toggleClass("back");
    });
    setTimeout(function() {
      hexagons.forEach(hex => {
        hex.toggleClass("nav-animate");
      });
      isMenuShowing = false;
      resolve();
    }, 1000);
  });
}

function implode() {
  navScene.toggleClass("back").toggleClass("front");
  mainScene.toggleClass("front").toggleClass("back");
  transitionScene.animate({ opacity: "0.8" }, 1000);

  var hexagons = [
    $("#view-nav-1"),
    $("#view-nav-2"),
    $("#view-nav-3"),
    $("#view-nav-4"),
    $("#view-nav-5"),
    $("#view-nav-6")
  ];
  var transforms = [
    "0, -80px",
    "70px, -40px",
    "70px, 40px",
    "0, 80px",
    "-70px, 40px",
    "-70px, -40px"
  ];
  $("#view-nav-center")
    .css("opacity", "1")
    .detach()
    .appendTo($(".nav"));
  for (var i = 0; i < 6; i++) {
    hexagons[i].toggleClass("nav-animate");
    hexagons[i].css("transform", "translate(" + transforms[i] + ")");
  }
  setTimeout(function() {
    hexagons.forEach(hex => {
      hex.toggleClass("nav-animate");
    });
    isMenuShowing = true;
  }, 1000);
}
//==================== Content Load Logic ====================
function loadContent(desc) {
  var main = $(".main");
  main.empty().append(`<h1>${desc}</h1>`);
}
//==================== Authentication Logic ====================
function doLogin() {
  explode();
  setTimeout(function() {
    $("#signup-form")
      .detach()
      .appendTo(mainDisplay);
    mainDisplay.toggleClass("flex-center");
  }, 1100);
}
