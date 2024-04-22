const ButtonAdd = ({ action, text, isCartProduct, productId, email }: any) => {
  return (
    <form>
      <input name="product" defaultValue={productId} className="hidden" />
      <input
        name="isCartProduct"
        defaultValue={isCartProduct}
        className="hidden"
      />
      <input name="email" defaultValue={email} className="hidden" />

      <button
        type="submit"
        formAction={action}
        className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 border border-gray-300 rounded transition duration-300 ease-in-out"
      >
        {text}
      </button>
    </form>
  );
};

export default ButtonAdd;
