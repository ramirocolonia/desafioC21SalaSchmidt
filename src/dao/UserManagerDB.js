import { createHash, isValidPassword } from "../utils.js";
import { userModel } from "./models/user.model.js";

class UserManagerDB{

  async registerUser(body){
    const { first_name, last_name, email, age, password } = body;
    if(! await this.existEmail(email)){
      let newUser = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
      }
      if(Object.values(newUser).every((value) => String(value).trim() !== "" && value !== undefined)){
        if (await userModel.create(newUser)) {
          return { status: "success", payload: newUser };
        } else {
          return { status: "error", message: "Error al registrar usuario" };
        }
      }else{
        return { status: "error", message: "Faltan campos obligatorios" };
      }
    }else{
      return { status: "error", message: "El correo electrónico ingresado ya se encuentra registrado" };
    }
  }

  async existEmail(pEmail) {
    if (await userModel.findOne({ email: pEmail })) {
      return true;
    }
    return false;
  }

  async login(body){
    const { email, password } = body;
    let user;
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
      user = {
        email: email,
        password: password,
        rol: "admin"
      };
      return { status: "success", payload: user };
    }else{
      user = await userModel.findOne({ email: email });
      if(user){
        if(isValidPassword(user, password)){
          return { status: "success", payload: user };
        }else{
          return { status: "error", message: "Contraseña incorrecta" };  
        }
      }else{
        return { status: "error", message: "Usuario no registrado" };
      }
    }
  }
  
}

export default UserManagerDB;