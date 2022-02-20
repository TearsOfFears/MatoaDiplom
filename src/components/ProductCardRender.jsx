import React from "react";

const ProductCardRender = ({ productName, productThumbnail, price,productDesc }) => {
	return (
		<div>
			<h1>{productName}</h1>
            <h1>{price}</h1>
           <div dangerouslySetInnerHTML={{__html:productDesc}}/>
		</div>
	);
};

export default ProductCardRender;
