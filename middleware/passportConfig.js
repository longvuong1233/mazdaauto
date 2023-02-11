const passport = require("passport");

const localStrategy = require("passport-local");

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    if (user == "admin") {
      return cb(null, user);
    }
    return cb(new Error("Unauthorized"));
  });
});

passport.use(
  new localStrategy((username, password, next) => {
    if (password == process.env.MASTER_PASSWORD) {
      return next(null, "admin");
    } else {
      return next(new Error("Incorrect password"));
    }
  })
);

module.exports = passport;
