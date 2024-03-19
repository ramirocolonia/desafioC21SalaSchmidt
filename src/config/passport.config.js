import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";

const localStrategy = local.Strategy;

const initializePassport = () =>{
  passport.use("register", new localStrategy(
    {passReqToCallback: true, usernameField:"email"}, async (req, username, password, done) =>{
      const {first_name, last_name, email, age} = req.body;
      try {
        const user = await userModel.findOne({ email: username });
        if(user){
          console.log("Ya existe usuario con ese correo");
          return done(null, false);
        }
        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: createHash(password)
        }
        if(Object.values(newUser).every((value) => String(value).trim() !== "" && value !== undefined)){
          let result = await userModel.create(newUser);
          return done(null, result);
        }else{
          console.log("Hay campos vacios");
          return done(null, false);
        }
      } catch (error) {
        return done(`Error al obtener usuario: ${error}`);
      }
    }
  ));

  passport.use("login", new localStrategy({usernameField: "email"}, async(username, password, done) =>{
    try {
      const user = await userModel.findOne({email: username});
      if(!user){
        console.log("No existe usuario");
        return done(null, false);
      }
      if(!isValidPassword(user, password)) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(`Error en el login: ${error}`)
    }
  }));

  passport.use("github", new GitHubStrategy({
    clientID: "Iv1.6303ae26fb8ddff9",
    clientSecret: "d64fa73a252b7cd9ed12b2b15955698c5d7c2399",
    callbackURL: "http://localhost:8080/login/githubcbauth"
  }, async (accessToken, refreshToken, profile, done) =>{
    try {
      const user = await userModel.findOne({email:profile._json.email});
      if(!user){
        let newUser = {
          first_name: profile._json.name,
          last_name: "",
          email: profile._json.email,
          age: 20,
          password: "",
          rol: "usuario"
        }
        const result = await userModel.create(newUser);
        done(null, result);
      }else{
        done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }));

}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) =>{
  const user = await userModel.findById(id);
  done(null, user);
});

export default initializePassport;