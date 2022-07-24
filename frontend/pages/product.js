import React from 'react';

const product = ({ products }) => {
  return (
    <div className='mx-24'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Product List - goCart</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Buy the best products from our list in a great deal...</p>
          </div>
          <div className="flex flex-wrap -m-4">
            {products.data.map((item) => {
              return(
                <div className="xl:w-1/4 md:w-1/2 p-4">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img className="h-40 rounded w-full object-cover object-center mb-6" src={item.attributes.Image.data && item.attributes.Image.data.attributes.name} alt="content" />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.attributes.Category}</h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.attributes.Title}</h2>
                    <p className="leading-relaxed text-base">{item.attributes.Description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  let header = {Authorization: 'Bearer 04c636d88a92b98540f5e20cdaf29e0cecf38896722a93214c074e88455a4bd547953091860be4f6489494309fd94d20d428db270b627bbb92a63f394f9e9d5815c640e7721138e4695f9232a2e9251c8dcee318b1aad6a247e8a2f7afd927dde848a2cb45af8431b98bbf8c6112a0ade38a90f702488f42f04cf2652dada6ca'};
  let a = await fetch('http://localhost:1337/api/products?populate=*', {headers: header})
  let products = await a.json();
  //   console.log(products);
  return {
    props: { products: products }, // will be passed to the page component as props
  }
}
export default product;
