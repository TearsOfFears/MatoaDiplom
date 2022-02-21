import React from "react";

const ProductCardRender = ({ productName, productThumbnail, price,productDesc }) => {
	return (
		<div>
			<h1>{productName}</h1>
            <h1>{price} грн.</h1>
			<img src={productThumbnail} alt="" />
           <div dangerouslySetInnerHTML={{__html:productDesc}}/>

		   <button className="btn">Добавити до кошика </button>
		</div>
	);
};

export default ProductCardRender;
