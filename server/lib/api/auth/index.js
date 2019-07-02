const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../../models/football_user");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

const JWTstrategy =
  process.env.NODE_ENV === "test"
    ? require("passport-jwt-mock").Strategy
    : require("passport-jwt").Strategy;

//Create a passport middleware to handle user registration
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        let user = {
          email: email,
          password: password,
          user_type: "football_user_info"
        };
        //Save the information provided by the user to the the database
        user = await UserModel.create(user);
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        return done(null, false, { message: "User already exists" });
      }
    }
  )
);

//Create a passport middleware to handle User login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const userModel = await UserModel.findOne({ email });
        if (!userModel) {
          return done("User not found");
        }

        const user = JSON.parse(entities.decode(JSON.stringify(userModel)));

        const validate = await userModel.isValidPassword(password);
        if (!validate) {
          return done("Wrong Password");
        }
        //Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: "top_secret",
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromHeader("jwt")
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
