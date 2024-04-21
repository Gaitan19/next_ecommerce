const ButtonAdd = ({action,text,isCartProduct,productId,email}:any) => {
  return (
    <form>
        <input name="product" value={productId} className="hidden"/>
        <input name="isCartProduct" value={isCartProduct} className="hidden"/>
        <input name="email" value={email} className="hidden"/>
        
        <button type="submit" formAction={action} className="border-solid border-2" >{text}</button>
    </form>
  )
}

export default ButtonAdd