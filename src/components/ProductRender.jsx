import React from "react";

import { Link } from "react-router-dom";

const ProductRender = ({ind,productThumbnail,productName,price,documentId}) => {
    if(!productThumbnail || !documentId || !productName || typeof(price)=== 'undefined') return null;
	return (
		<div className="wrapper-products__item" key={ind}>
			<img src={productThumbnail} alt={productThumbnail} />
			<p className="titleProduct">{productName}</p>
			<hr />
			<p className="price">Ціна: {price} грн.</p>
			<Link to={`/product/${documentId}`} className="btn-product">
			Переглянути подробиці
			</Link>
			<button className="btn-product"> Добавити до кошика</button>
		</div>
	);
};

export default ProductRender;
