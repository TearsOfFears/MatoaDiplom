import React, { useEffect } from "react";
import { ProductRender } from "../index";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";

import { FormSelect, LoadMore } from "../index";

import { useNavigate, useParams } from "react-router";
const mapState = ({ productsData }) => ({ products: productsData.products });

const ProductsShow = () => {
	const { products } = useSelector(mapState);
	const { data, queryDoc, isLastPage } = products;
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const { filterType } = useParams();
	useEffect(() => {
		dispatch(fetchProductsStart({ filterType }));
	}, [filterType]);

	if (!Array.isArray(data)) {
		return null;
	}
	if (data.lenght < 1) {
		return (
			<section className="products">
				<div className="container">
					<h1> Немає результатів.</h1>
				</div>
			</section>
		);
	}

	const handleFilter = (e) => {
		const nextFilter = e.target.value;
		navigation(`/products/${nextFilter}`);
	};
	const configFilters = {
		defaultValue: filterType,
		options: [
			{
				name: "Всі продукти",
				value: "",
			},
			{
				name: "Годинники",
				value: "watches",
			},
			{
				name: "Окуляри",
				value: "glasses",
			},
		],
		handleChange: handleFilter,
	};

	const handleLoadMore = () => {
		dispatch(
			fetchProductsStart({
				filterType,
				startAfterDoc: queryDoc,
				persistProducts: data,
			})
		);
	};
	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	};
	return (
		<section className="products">
			<div className="container">
				<h1>All products</h1>

				<FormSelect {...configFilters} />

				<div className="row mt-3 mb-5">
					<div className="wrapper-products">
						{data.map((product, ind) => {
							const { productThumbnail, productName, price } = product;
							if (
								!productThumbnail ||
								!productName ||
								typeof price === "undefined"
							)
								return null;
							const configProduct = {
							...product
							};
							return <ProductRender {...configProduct} key={ind} />;
						})}
					</div>

					{!isLastPage && <LoadMore {...configLoadMore} />}
				</div>
			</div>
		</section>
	);
};

export default ProductsShow;
