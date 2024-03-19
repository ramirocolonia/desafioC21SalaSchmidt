import { Router } from "express";
import ChatManagerDB from "../dao/ChatManagerDB.js";

const chatsRouter = Router();

chatsRouter.post("/api/chat", async(req,res)=>{
  try {
    const chatManager = new ChatManagerDB();
    const resp = await chatManager.sendMsg(req.body);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});    
  }
});

export default chatsRouter;