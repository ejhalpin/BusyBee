//EXPRESS SERVER//

//package dependencies
let express = require("express");
let cookieparser = require("cookie-parser");

//express
var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieparser());

var db = require("./models");

// Routes
//require("./routes/authRoutes")(app);
//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//data persistence
var syncOptions = { force: false };

//if testing, clear the testDb
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log("==>Listening on port %s.", PORT);
  });
});
