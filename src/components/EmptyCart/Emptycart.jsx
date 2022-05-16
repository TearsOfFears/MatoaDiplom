import React from "react";
import "./style.scss";
import CartEmpty from "./../../assets/img/cart/cartEmpty.png";
function Emptycart() {
	return (
		<div className="Emptycart">
			<div>
				<img src={CartEmpty} alt="" />
                <h2><span>Немає</span>  нічого <br/>у вашій корзині</h2>
			</div>
		</div>
	);
}

export default Emptycart;
