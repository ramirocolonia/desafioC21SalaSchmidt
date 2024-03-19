import { Router } from "express";
import passport from "passport";

const usersRouter = Router();

usersRouter.post("/register", passport.authenticate("register", {failureRedirect:"/failregister", successRedirect:"/login"}), async (req, res) => {
  res.send({status: "success", message: "Usuario registrado"});
});

usersRouter.get("/failregister", (req,res) =>{
  console.log("error al intentar registrar usuario");
  res.send({error: "Error al registrar usuario"});
})

usersRouter.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}), async (req, res) => {
  if(!req.user) return res.status(400).send({status:"error", error:"Usuario y/o contraseña incorrectas"});
  req.session.user = {
    name: req.user.email,
    rol: req.user.rol
  };
  res.redirect("/products");
});

usersRouter.get("/faillogin", (req,res) =>{
  console.log("error en el login");
  res.send({error: "error en el login"});
});

usersRouter.get("/login/github", passport.authenticate("github", {scope:["user: email"]}), async (req,res)=>{});

usersRouter.get("/login/githubcbauth", passport.authenticate("github", {failureRedirect:"/login"}), async (req, res)=> {
  req.session.user = {
    name: req.user.email,
    rol: req.user.rol
  };
  res.redirect("/products");
});

usersRouter.get("/logout", (req,res)=>{
  req.session.destroy(error => {
    if(!error){
      res.redirect("/login");
    }else{
      res.send ({status: "error", message: "Error en logout, " + error});
    }  
  })
});


export default usersRouter;