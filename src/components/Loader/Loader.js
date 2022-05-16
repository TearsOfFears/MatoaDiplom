import "./Loader.scss"
const Loader = (props) => {
  return (
    <div className=" absolute overlay">
      <div className=" overlay">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loader;