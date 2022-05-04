import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addProduct } from "./../../redux/Carts/cart.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductSection from "./ProductDetails/ProductSection";
import { ProductRender } from "..";
import { fetchRandomProductsStart } from "../../redux/Products/products.actions";
import { useSelector } from "react-redux";

const mapState = ({ productsData }) => ({
	products: productsData.randomProducts.data,
});

const ProductCardRender = (product) => {
	const dispatch = useDispatch();
	const { products } = useSelector(mapState);
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
			setArray(array);
		}
	};

	useEffect(() => {
		const limit = 4;
		dispatch(fetchRandomProductsStart({ limit }));
		shuffle(products);
	}, []);

	return (
		<div>
			<ProductSection {...product} />
			<ProductDetails {...product} />
			<section className="similiiar">
				<h1>Вас може зацікавити: </h1>
				<hr />
				<section className="wrapper-products mb-5 mt-4">
					{Array.isArray(products) && products.length > 0
						? products.map((data, key) => {
								return <ProductRender {...data} key={key} />;
						  })
						: shuffle(products)}
				</section>
			</section>
		</div>
	);
};

export default ProductCardRender;
