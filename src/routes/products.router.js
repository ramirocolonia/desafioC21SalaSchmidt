import { Router } from "express";
import ProductManagerDB from "../dao/ProductManagerDB.js";

const productsRouter = Router();

productsRouter.get("/api/products", async (req, res) => {
  try {
    const prodManager = new ProductManagerDB();
    const resp = await prodManager.loadProducts(req.query);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

productsRouter.get("/api/products/:pid", async (req, res) => {
  try {
    const prodManager = new ProductManagerDB();
    const resp = await prodManager.findOneProduct(req.params.pid);
    res.send(resp);  
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});
  }
});

productsRouter.post("/api/products", async (req, res) => {
  try {
    const prodManager = new ProductManagerDB();
    const resp = await prodManager.saveProduct(req.body);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});    
  }
});

productsRouter.put("/api/products/:pid", async (req, res) => {
  try {
    const prodManager = new ProductManagerDB();
    const resp = await prodManager.updateProduct(req.params.pid, req.body);
    res.send(resp);
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});    
  }
});

productsRouter.delete("/api/products/:pid", async (req, res) => {
  try {
    const prodManager = new ProductManagerDB();
    const resp = await prodManager.deleteProduct(req.params.pid);
    res.send(resp);
  } catch (error) {
    res.send({ status: "error", message: "Error en ejecución, " + error })  
  }
});

export default productsRouter;