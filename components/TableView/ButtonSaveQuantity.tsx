const ButtonSaveQuantity = ({
  action,
  text,
  productId,
}: any) => {
  return (
     <>
      <input name="product" value={productId} className="hidden" />
      <button
        type="submit"
        formAction={action}
        className="border-solid border-2"
      >
        {text}
      </button>
     </>
  );
};

export default ButtonSaveQuantity;