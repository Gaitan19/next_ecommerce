const ButtonAdd = ({action,text}:any) => {
  return (
    <form>
        <button type="submit" formAction={action} className="border-solid border-2" >{text}</button>
    </form>
  )
}

export default ButtonAdd