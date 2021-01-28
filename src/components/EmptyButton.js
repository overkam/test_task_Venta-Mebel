import '../App.css'

function EmptyButton (props) {
  return <button className={`${props.classType}__btn`} >{props.text}</button>
}

export default EmptyButton