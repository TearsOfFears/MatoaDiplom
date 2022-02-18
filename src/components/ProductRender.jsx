import React from "react";

const ProductRender = ({ind,productThumbnail,productName,price}) => {
    if(!productThumbnail || !productName || typeof(price)=== 'undefined') return null;
	return (
		<div className="wrapper-products__item" key={ind}>
			<img src={productThumbnail} alt={productThumbnail} />
			<p className="titleProduct">{productName}</p>
			<hr />
			<p className="price">Ціна: {price} грн.</p>
			<button className="btn-product"> Переглянути подробиці</button>
			<button className="btn-product"> Добавити до кошика</button>
		</div>
	);
};

export default ProductRender;
