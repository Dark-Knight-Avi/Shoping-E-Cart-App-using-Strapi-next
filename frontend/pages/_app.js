import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("This is useEffect from app.js");
  }, [])
  const [cart, setCart] = useState([])
  const [reloadKey, setReloadKey] = useState(1)
  const addToCart = (item, qty, price) => {
    let newCart = cart
    let flag = 0
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].item === item) {
        flag = 1
        break
      }
    }
    if (flag == 1) {
      let idx = 0
      while (item != newCart[idx].item) {
        idx += 1
      }
      newCart[idx].qty += 1;
    } else {
      newCart.push({ item: item, qty: qty, price: price })
    }
    setCart(newCart)
    console.log(newCart);
    setReloadKey(Math.random())
  }
  const removeFromCart = (item, qty) => {
    let newCart = cart
    let index = newCart.indexOf({ item: item, qty: qty })
    item.qty > 1 ? newCart[index].qty -= 1 : newCart.splice(index)
    setCart(newCart)
  }
  const clearCart = () => {
    let newCart = []
    setCart(newCart)
  }
  const quantity = (slug) => {
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].item === slug) {
        return cart[index].qty
      }
    }
  }
  return <><Navbar reloadKey={reloadKey} cart={cart} /><Component quantity={quantity} cart={cart} removeDromCart={removeFromCart} addToCart={addToCart} clearCart={clearCart} {...pageProps} /></>;
}

export default MyApp;

// const addToCart = (item, qty) => {
//   let newCart = cart
//   let flag = 0
//   for (let index = 0; index < cart.length; index++) {
//     if (cart[index].item == item){
//       flag = 1
//       break
//     }
//   }
//   if (flag == 1){
//     let idx = 0
//     while(item != newCart[idx].item){
//       idx += 1
//     }
//     newCart[idx].qty += 1;
//   } else {
//     newCart.push({item: item, qty: qty})
//   }
//   setCart(newCart)
//   console.log(newCart);
//   setReloadKey(Math.random())
// }