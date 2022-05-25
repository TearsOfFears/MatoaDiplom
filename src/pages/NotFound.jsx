import React from "react";
import NotFoundImg from "./../assets/img/404.png";

function NotFound() {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center">
		    <h1>Упс, такої сторінки  <span style={{color:"#d84727"}}>не існує </span> </h1>	
			<img src={NotFoundImg} alt="" style={{width:"30%"}}/>
		</div>
	);
}

export default NotFound;
