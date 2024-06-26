const ButtonTrash = ({ action, children, productId, email }: any) => {
  return (
    <form>
      <input name="product" defaultValue={productId} className="hidden" />
      <input name="email" defaultValue={email} className="hidden" />

      <button
        type="submit"
        formAction={action}
        className="border-solid border-2"
      >
        {children}
      </button>
    </form>
  );
};

export default ButtonTrash;
