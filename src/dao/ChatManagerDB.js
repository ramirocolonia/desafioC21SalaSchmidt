import { messageModel } from "./models/message.model.js";

class ChatManagerDB{
  
  async sendMsg(body){
    const { user, message } = body;
    const newMsg = {
      user,
      message
    }
    if (
      Object.values(newMsg).every((value) => String(value).trim() !== "" && value !== undefined)){
      if (await messageModel.create(newMsg)) {
        return { status: "success", payload: newMsg };
      } else {
        return { status: "error", message: "Error al enviar mensaje" };
      }
    } else {
      return { status: "error", message: "Faltan campos obligatorios" };
    }
  }

}
export default ChatManagerDB;