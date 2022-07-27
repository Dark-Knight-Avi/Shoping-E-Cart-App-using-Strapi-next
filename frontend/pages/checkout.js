import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useState } from 'react'
const Checkout = ({ cart, product, quantity }) => {
  let total = 0;
  let totalqty = 0;
  const [form, setForm] = useState({name:"", mobile:"", email:"", address:"", city:"", state:"", pin:""})
  const handleChange = (e) => {
    // console.log(e);
    setForm({...form, [e.target.name]: e.target.value})
    // console.log(form);
  }
  return (
    <div className="container mx-auto mt-10">
      <Script type="application/javascript" crossorigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.MID}.js`} onload="onScriptLoad();"> </Script>
<Script>
  function onScriptLoad(){
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
        "orderId": "", /* update order id */
        "token": "", /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": "" /* update amount */
        },
        "handler": {
          "notifyMerchant": function(eventName,data){
            console.log("notifyMerchant handler function called");
            console.log("eventName => ",eventName);
            console.log("data => ",data);
          } 
        }
      };

      if(window.Paytm && window.Paytm.CheckoutJS){
          window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
              // initialze configuration using init method 
              window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                  // after successfully updating configuration, invoke JS Checkout
                  window.Paytm.CheckoutJS.invoke();
              }).catch(function onError(error){
                  console.log("error => ",error);
              });
          });
      } 
  }
</Script>
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>
          {product.data.filter((item) => {
            for (let index = 0; index < cart.length; index++) {
              if (item.attributes.Slug === cart[index].item) {
                return true
              }
            }
            return false
          }).map((item) => {
            console.log(item);
            return (
              <section key={Math.random()}><div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={item.attributes.Image.data.attributes.name} alt="" />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.attributes.Title}</span>
                    <span className="text-red-500 text-xs">{item.attributes.Category}</span>
                    {/* <div className="flex">
                      <a onClick={removeFromCart(item.attributes.Slug, quantity(item.attributes.Slug), item.attributes.Price)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  {/* <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg> */}

                  <div className="mx-2 border text-center w-8" type="text">{quantity(item.attributes.Slug)}</div>
                  {/* <button onClick={addToCart(item.attributes.Slug, 1, item.attributes.Price)}>
                    <svg className="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button> */}
                  <div className="hidden">{totalqty += quantity(item.attributes.Slug)}</div>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">${item.attributes.Price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${quantity(item.attributes.Slug) * item.attributes.Price}</span>
                <div className="hidden">
                  {total += (quantity(item.attributes.Slug) * item.attributes.Price)}
                </div>
              </div>
              </section>
            )
          })}
          <Link href="/product" className="flex font-semibold  text-sm mt-10">
            <div className='flex text-indigo-600 cursor-pointer'>

              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>Continue Shopping
            </div>
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {totalqty}</span>
            <span className="font-semibold text-sm">${total}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10 flex flex-col">

            <div className="font-semibold inline-block mb-3 text-sm uppercase">Shipping Address</div>
            <label htmlFor='name' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">Name</label>
            <input value={form.name} onChange={handleChange}  type="text" id="name" name='name' placeholder="Enter your name" className="p-2 text-sm w-full" />
            <label htmlFor='mobile' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">Mobile Number</label>
            <input value={form.mobile} onChange={handleChange} type="text/number" id="mobile" name='mobile' placeholder="Enter your mobile number" className="p-2 text-sm w-full" />
            <label htmlFor='email' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">Email</label>
            <input value={form.email} onChange={handleChange} type="email" name='email' id="email" placeholder="Enter your email" className="p-2 text-sm w-full" />
            <label htmlFor='address' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">Address(Area & Street)</label>
            <textarea value={form.address} onChange={handleChange} type="text" name='address' id="address" rows={4} placeholder="Enter your address" className="p-2 text-sm w-full" ></textarea>
            <label htmlFor='city' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">City</label>
            <input value={form.city} onChange={handleChange} type="text" name='city' id="city" placeholder="Enter your city" className="p-2 text-sm w-full" />
            <label htmlFor='state' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">State</label>
            <select value={form.state} onChange={handleChange} name="state" id="state" className="p-2 text-sm w-full">
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <label htmlFor='pin' className="font-semibold inline-block mb-1 mt-2 text-xs uppercase">Pin Code</label>
            <input value={form.pin} onChange={handleChange} type="text" name='pin' id="pin" placeholder="Enter your pin" className="p-2 text-sm w-full" />
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${total>0 ? total + 10 : 0}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>

      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  let header = { Authorization: 'Bearer 04c636d88a92b98540f5e20cdaf29e0cecf38896722a93214c074e88455a4bd547953091860be4f6489494309fd94d20d428db270b627bbb92a63f394f9e9d5815c640e7721138e4695f9232a2e9251c8dcee318b1aad6a247e8a2f7afd927dde848a2cb45af8431b98bbf8c6112a0ade38a90f702488f42f04cf2652dada6ca' };
  let a = await fetch('http://localhost:1337/api/products?populate=*', { headers: header })
  let product = await a.json();
  return {
    props: { product: product } // will be passed to the page component as props
  }
}
export default Checkout