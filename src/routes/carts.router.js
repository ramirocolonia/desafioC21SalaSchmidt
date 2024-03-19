import { Router } from "express";
import CartManagerDB from "../dao/CartManagerDB.js";

const cartsRouter = Router();

cartsRouter.post("/api/carts", async (req, res) => {
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.newCart();
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

cartsRouter.get("/api/carts/:cid", async (req, res) => {
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.loadCart(req.params.cid);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

cartsRouter.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.addProdInCart(req.params.cid, req.params.pid);
    res.send(resp);    
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

cartsRouter.delete("/api/carts/:cid/products/:pid", async (req,res) => {
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.deleteProductFromCart(req.params.cid, req.params.pid);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

cartsRouter.put("/api/carts/:cid", async (req,res) =>{
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.updateCartItems(req.params.cid, req.body);
    res.send(resp);

  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

cartsRouter.put("/api/carts/:cid/products/:pid", async (req,res) =>{
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.updateQuantityItemCart(req.params.cid, req.params.pid, req.body.quantity);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

cartsRouter.delete("/api/carts/:cid", async (req,res) =>{
  try {
    const cartManager = new CartManagerDB();
    const resp = await cartManager.deleteAllProductsFromCart(req.params.cid);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});


export default cartsRouter;
