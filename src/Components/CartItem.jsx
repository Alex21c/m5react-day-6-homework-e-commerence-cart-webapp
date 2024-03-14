export default function CartItem({product, dispatch}){

  // console.log('Inside cartItem, ' , product);


 


// here goes our JSX
  return (
    <div className="wrapperProduct flex gap-[1rem] justify-between text-[1.5rem]">
      <div className="wrapperProductImageAndTitle flex gap-[1rem]">
        <div className="productImage w-[15rem] h-[15rem]">
          <img className="object-fill w-[100%] h-[100%] rounded-md shadow-md shadow-yellow-300" src={product.thumbnail} alt={`Image-${product.title}`} />
        </div>
        <div className="titleAndRemoveBtn flex flex-col gap-[.5rem]">
          <span className="capitalize font-semibold productTitle">{product.title}</span>
          <span>₹ {product.price}</span>
          <span className="font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[1rem] p-[.3rem] rounded-md hover:text-slate-50 text-slate-900 text-[1rem] max-w-[6rem]" 
          onClick = {
            ()=>{
              dispatch({type:'removeProduct', productId: product.id})
            }
          }
          >Remove</span>
        </div>
      </div>

      <div className="productQuantityUpdateController flex flex-col gap-[.5rem] font-semibold text-[2rem] items-center">
        <i onClick={
          ()=>{
            dispatch({type:'increaseQuantity', productId: product.id})
            
          }
        } className="fa-sharp fa-solid fa-chevron-up font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[.8rem] p-[.3rem] rounded-full hover:text-slate-50 text-slate-900 text-[1.3rem] max-w-[6rem]"></i>
        <span className="">{product.quantity}</span>
        <i onClick={
          ()=>{
            dispatch({type:'decreaseQuantity', productId: product.id})
          }
        } className="fa-sharp fa-solid fa-chevron-down font-semibold  outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[.8rem] p-[.3rem] rounded-full hover:text-slate-50 text-slate-900 text-[1.3rem] max-w-[6rem]"></i>
      </div>

    </div>
  );



}