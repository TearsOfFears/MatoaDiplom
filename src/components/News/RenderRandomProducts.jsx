import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ProductRender } from "..";
import { fetchRandomProductsStart } from "../../redux/Products/products.actions";
const mapState = ({ productsData }) => ({
	products: productsData.randomProducts.data,
});

function RenderRandomProducts() {
	const { products } = useSelector(mapState);
	const dispatch = useDispatch();
	const [array, setArray] = useState([]);

	const shuffle = (array) => {
		if (Array.isArray(products) && products.length > 0) {
			let currentIndex = array.length,
				randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				[array[currentIndex], array[randomIndex]] = [
					array[randomIndex],
					array[currentIndex],
				];
			}

			setArray(array.splice(array.length - 2, array.length));
		}
	};

	useEffect(() => {
		dispatch(fetchRandomProductsStart());
		shuffle(products);
	}, []);
	return (
		<div>
			<h1>Може зацікавити</h1>
			<hr />
			{Array.isArray(array) && array.length > 0
				? array.map((data, key) => {
						return (
							<div className="wrapper-products">
								<ProductRender {...data} key={key} />
							</div>
						);
				  })
				: shuffle(products)}
		</div>
	);
}

export default RenderRandomProducts;
