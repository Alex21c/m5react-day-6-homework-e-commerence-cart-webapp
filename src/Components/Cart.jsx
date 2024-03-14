import { useEffect, useState, useReducer } from "react";
import CartItem from "./CartItem";

export default function Cart(){


// fetching products from api
  let reducer = (state, action)=>{
    // console.log('reducer is called!');
    if(action.type === 'clearTheCart'){
      return {
        products:{}, 
        cartTotal:0,
        totalItemsInCart: 0,
        oneUSDIntINR : 83
      }
    }else if(action.type === 'removeProduct'){
      // console.log('reducer received a reqeust to remove product', action);
      // console.log('deleting product ', productToBeDeleted);

      // updating cart quantity before deleting
        let productToBeDeleted = state.products[action.productId];
        let itemsRemaningInCart = state.totalItemsInCart - productToBeDeleted.quantity;
        let newCartTotal = state.cartTotal - (productToBeDeleted.quantity * productToBeDeleted.price);
      // deleting the product
        let newProducts = {...state.products};

        delete newProducts[action.productId];
      // updating state        
       return {
        ...state,
        products: newProducts,
        totalItemsInCart: itemsRemaningInCart,
        cartTotal : newCartTotal
      };
    }    
    else if(action.type === 'decreaseQuantity'){
      // console.log('i have received request to decrease quantity',  state.products[action.productId]);
      // safeguard
        if(state.products[action.productId].quantity <=1){
          return state; // no need to decrement
        }
      let newProductQuantity = state.products[action.productId].quantity - 1;
      return {
        ...state,
        products: {
          ...state.products,
          [action.productId]: {
            ...state.products[action.productId],
            quantity: newProductQuantity
          }
        },
        totalItemsInCart: state.totalItemsInCart - 1,
        cartTotal : state.cartTotal - (1 * state.products[action.productId].price )
      };
      
    }else if(action.type === 'increaseQuantity'){
      // console.log('i have received request to increase quantity',  state.products[action.productId]);
      let newProductQuantity = state.products[action.productId].quantity + 1;
      // console.log(state);
      return {
        ...state,
        products: {
          ...state.products,
          [action.productId]: {
            ...state.products[action.productId],
            quantity: newProductQuantity
          }          
        },
        totalItemsInCart: state.totalItemsInCart + 1,
        cartTotal : state.cartTotal + (1 * state.products[action.productId].price)
      };
      
    }else if(action.type === 'addProductToCart'){
      // console.log('i have received some data', action.payload.productData, 'state is ', state);
      action.payload.productData.price *=state.oneUSDIntINR;
      return {
        ...state,
        products : {    
          ...state.products,            
          [action.payload.productData.id] : action.payload.productData
          
        },
        totalItemsInCart: state.totalItemsInCart + 1,
        cartTotal : state.cartTotal + (action.payload.productData.quantity * action.payload.productData.price)
      }
    }
    // console.log('reducer is returning default state!')

    // default is do nothing
      return state;
  }
  let [stateCart, dispatch] = useReducer((reducer), {
    products:{}, 
    cartTotal:0,
    totalItemsInCart: 0,
    oneUSDIntINR : 83

  });
// here i will make an api call
  useEffect(()=>{
    try {
      let makeAPICall = async()=>{
        let response = await fetch('https://dummyjson.com/products/category/fragrances');
        let parsedResponse = await response.json();
        // creating my own state out of fetched data
        // console.log(parsedResponse);
        parsedResponse.products.map(product=>{
          let myCustomizedProductData = {
            'productData' : {
              id : product.id,
              price: product.price,
              quantity: 1,
              title: product.title,
              thumbnail: product.thumbnail
            }
          };
          // console.log(myCustomizedProductData);
          // i will update my cart state
          dispatch({type:'addProductToCart', payload:myCustomizedProductData});
        });
      };
      makeAPICall();

      // console.log('here is our state cart: ',stateCart);

    } catch (error) {
      console.error('ERROR: Unable to fetch products from API !');
    }
  },[]);

// Return JSX
  return(
    <div id='wrapperEcommerceCartWebApp' className="border-2 border-slate-200 p-[2rem] w-[50rem] mt-[2rem] m-auto rounded-md flex flex-col gap-[2rem] text-[1.2rem] text-slate-200">
      <header className="smallCaps text-center font-semibold text-[2rem]  text-slate-50 flex justify-between ">
        <h1>e-Commerence Cart WebApp using useReducer</h1>
        <div className="flex relative  bg-blue-500 text-[2.5rem]">
          <i className="fa-sharp fa-solid fa-cart-plus absolute right-[1rem] "></i>
          <span className="text-[1.3rem] text-slate-900 absolute bg-yellow-300 rounded-full pt-[0.1rem] pb-[0.1rem] p-[.7rem] top-[-0.4rem] right-[-.2rem]">{stateCart.totalItemsInCart}</span>
        </div>
      </header>
      <section className="flex flex-col gap-[2rem]">
        <h2 className="smallCaps text-slate-50 text-[2rem] text-center">Yours Shopping Cart</h2>
        <div>
          {
            (stateCart.totalItemsInCart === 0) ? <div className="text-[2rem] text-center text-yellow-200">Yours Shopping Cart is Empty!</div> : ""

            
          }
        </div>
        <div className="wrapperAllProducts flex flex-col gap-[2rem]">
          {
          Object.entries(stateCart.products).map(([idx, product])=><CartItem key={idx} product={product} dispatch={dispatch}/>)

          }
        </div>
        <div className="wrapperTotal border-t-2 border-yellow-100 p-[1rem] flex justify-between">
          <h2 className="smallCaps text-slate-50 text-[2rem] font-semibold">Total</h2>
          <div className="font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[2rem] p-[.5rem] rounded-md hover:text-slate-50 text-slate-900 text-[1.5rem]">
            ₹{stateCart.cartTotal}
          </div>
        </div>
        <div>
          <button className="outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[2rem] p-[.5rem] rounded-md hover:text-slate-50 text-slate-900 text-[1.5rem]" onClick={
            
            ()=>{
              dispatch({type:'clearTheCart'})
            }            
          }>Clear the Cart</button>
        </div>

      </section>
    </div>
  );
}