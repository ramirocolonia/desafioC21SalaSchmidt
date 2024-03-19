import { cartModel } from "./models/cart.model.js";
import { productModel } from "./models/product.model.js";

class CartManagerDB {

  async newCart() {
    const resp = await cartModel.create({})
    if (resp) {
      return { status: "success", payload: resp };
    } else {
      return {status: "error", message: "Error al crear el carrito, " + error};
    }
  }

  async loadCart(cId) {
    let cart = await cartModel.findOne({ _id: cId });
    if (cart) {
      return { status: "success", payload: cart };
    }
    return { status: "error", message: "Carrito no encontrado" };
  }

  async addProdInCart (cId, pId){
    const cart = await cartModel.findOne({_id: cId});
    const prod = await productModel.findOne({_id: pId});
    if (cart) {
      if (prod) {
        let addQuantity = cart.products.find((p) => JSON.stringify(p.product) === JSON.stringify(prod.id))
        if(addQuantity){
          addQuantity.quantity += 1
        }else{
          cart.products.push({ product: prod.id, quantity: 1 });
        }
        if (await cartModel.updateOne({_id: cId}, cart)) {
          return { status: "success", payload: prod };
        } else {
          return { status: "error", message: "Error al guardar producto" };
        }
      } else {
        return { status: "error", message: "Producto inexistente" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

  async deleteProductFromCart(cId, pId){
    const cart = await cartModel.findOne({_id: cId});
    if (cart) {
      const prod = cart.products.find((p)=> p.product == pId);
      if (prod) {
        cart.products.pull(prod);
        if (await cartModel.updateOne({_id: cId}, cart)) {
          return { status: "success", payload: prod };
        } else {
          return { status: "error", message: "Error al eliminar producto del carrito" };
        }
      } else {
        return { status: "error", message: "Producto inexistente en este carrito" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

  async updateCartItems(cId, body){
    const cart = await cartModel.findOne({_id: cId});
    if(cart){
      cart.products = body
      if (await cartModel.updateOne({_id: cId}, cart)) {
        return { status: "success", payload: cart.products };
      } else {
        return { status: "error", message: "Error al actualizar lista de productos" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

  async updateQuantityItemCart(cId, pId, quantity){
    const cart = await cartModel.findOne({_id: cId});
    if (cart) {
      const prodIndex = cart.products.findIndex((p)=> p.product == pId);
      if (prodIndex != -1) {
        cart.products[prodIndex].quantity = parseInt(quantity);
        if (await cartModel.updateOne({_id: cId}, cart)) {
          return { status: "success", payload: cart.products[prodIndex] };
        } else {
          return { status: "error", message: "Error al actualizar cantidad del producto en carrito" };
        }
      } else {
        return { status: "error", message: "Producto inexistente en este carrito" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

  async updateQuantityItemCart(cId, pId, quantity){
    const cart = await cartModel.findOne({_id: cId});
    if (cart) {
      const prodIndex = cart.products.findIndex((p)=> p.product == pId);
      if (prodIndex != -1) {
        cart.products[prodIndex].quantity = parseInt(quantity);
        if (await cartModel.updateOne({_id: cId}, cart)) {
          return { status: "success", payload: cart.products[prodIndex] };
        } else {
          return { status: "error", message: "Error al actualizar cantidad del producto en carrito" };
        }
      } else {
        return { status: "error", message: "Producto inexistente en este carrito" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

  async deleteAllProductsFromCart(cId){
    const cart = await cartModel.findOne({_id: cId});
    if (cart) {
      cart.products = [];
      if (await cartModel.updateOne({_id: cId}, cart)) {
        return { status: "success", payload: cart };
      } else {
        return { status: "error", message: "Error al eliminar producto del carrito" };
      }
    } else {
      return { status: "error", message: "Carrito inexistente" };
    }
  }

}

export default CartManagerDB;
