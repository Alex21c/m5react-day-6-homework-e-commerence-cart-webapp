export default function Cart(){
  return(
    <div className="border-2 border-slate-200 p-[2rem] w-[50rem] mt-[2rem] m-auto rounded-md flex flex-col gap-[2rem] text-[1.2rem] text-slate-200">
      <header className="smallCaps text-center font-semibold text-[2rem]  text-slate-50 flex justify-between ">
        <h1>e-Commerence Cart WebApp using useReducer</h1>
        <div className="flex relative  bg-blue-500 text-[2.5rem]">
          <i className="fa-sharp fa-solid fa-cart-plus absolute right-[1rem] "></i>
          <span className="text-[1.3rem] text-slate-900 absolute bg-yellow-300 rounded-full pt-[0.1rem] pb-[0.1rem] p-[.7rem] top-[-0.4rem] right-[-.2rem]">4</span>
        </div>
      </header>
      <section>
        <h2 className="smallCaps text-slate-50 text-[2rem] text-center">Yours Shopping Cart</h2>
        <div>
          Yours products
        </div>
        <div className="border-t-2 border-yellow-100 p-[1rem] flex justify-between">
          <h2 className="smallCaps text-slate-50 text-[2rem] font-semibold">Total</h2>
          <div className="font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[2rem] p-[.5rem] rounded-md hover:text-slate-50 text-slate-900 text-[1.5rem]">
            ₹2550
          </div>
        </div>
        <div>
          Clear Cart
        </div>
      </section>
    </div>
  );
}