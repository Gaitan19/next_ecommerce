const ButtonSaveQuantity = ({ action, text, productId }: any) => {
  return (
    <>
      <input name="product" defaultValue={productId} className="hidden" />
      <button
        type="submit"
        formAction={action}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded inline-block"
      >
        {text}
      </button>
    </>
  );
};

export default ButtonSaveQuantity;
