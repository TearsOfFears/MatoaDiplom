import React, { useEffect, useState } from "react";
import { ButtonForm, ProductRender } from "../../index";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import SelectedItems from "../SelectedItems";
import Select, { StylesConfig } from "react-select";
import { FormSelect, LoadMore } from "../../index";
import Skeleton from "../Skeleton";
import { useNavigate, useParams } from "react-router";
import Buttons from "../../Buttons";
const mapState = ({ productsData }) => ({ products: productsData.products });

const ProductsShow = () => {
	const { products } = useSelector(mapState);
	const { data, queryDoc, isLastPage } = products;
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const { filterType, sortType } = useParams();

	const [sortTypes, setSortTypes] = useState();
	const [selectedOption, setSelectedOption] = useState("");



	const { value, label } = selectedOption;

	useEffect(() => {
		dispatch(fetchProductsStart({ filterType, sortTypes }));

		if (typeof value === "string") {
			navigation(`/products/${value}`);
		}
	}, [filterType, selectedOption, sortTypes]);

	if (!Array.isArray(data)) {
		return null;
	}

	if (data.lenght < 1) {
		return (
			<section className="products">
				<div className="container">
					<h1>Немає результатів.</h1>
				</div>
			</section>
		);
	}

	console.log(sortTypes);

	const configFilters = {
		defaultValue: value,
	};
	const options = [
		{
			label: "Всі продукти",
			value: "",
		},
		{
			label: "Годинники",
			value: "watches",
		},
		{
			label: "Окуляри",
			value: "glasses",
		},
	];

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
	const colourStyles = {
		control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
			...styles,
			backgroundColor: "white",
			width: "250px",
			borderColor: isFocused ? "#d84727" : "#f7f6f4 ",
			borderColor: isSelected ? "#f7f6f4" : "#d84727",
			boxShadow: "none",
			"&:hover": {
				color: "#f7f6f4",
			},
		}),
		menubar: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				width: "250px",
			};
		},
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				width: "250px",
				backgroundColor: isDisabled ? "#d84727" : "#f7f6f4",
				backgroundColor: isFocused ? "#d84727" : "#f7f6f4",
				backgroundColor: isSelected ? "#d84727" : "#f7f6f4",
				color: isSelected ? "#f7f6f4" : "#333",
				cursor: isDisabled ? "not-allowed" : "default",
				":hover": {
					backgroundColor: "#d84727",
					color: "#f7f6f4",
				},
			};
		},
	};

	const handleSetVal = (e) => {
		const val = e.target.value;
		setSortTypes(val);
	};

	const optionsVal = [
		{
			label: "По зростанню",
			value: "asc",
		},
		{
			label: "По спаданню",
			value: "desc",
		},
	];

	return (
		<section className="products">
			<div className="container">
				<h1>{typeof label === "string" ? label : "Всі продукти"}</h1>
				<div className="col-12 d-flex flex-row w-50 justify-content-between">
					<div style={{ width: "250px" }}>
						<Select
							options={options}
							defaultValue={options[0]}
							styles={colourStyles}
							onChange={setSelectedOption}
						/>
					</div>
					<div style={{ width: "250px" }}>
						<Select
							options={optionsVal}
							defaultValue={{
								label: "Нажміть для сортування",
								value: "",
							}}
							styles={colourStyles}
							onChange={e=> setSortTypes(e.value)}
						/>
					</div>

				</div>

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
								...product,
							};
							return <ProductRender {...configProduct} key={ind} />;
						})}
					</div>
					{Array.isArray(data) && data.length > 0 ? null : (
						<div className="d-flex flex-row align-center w-100 h-100 text-center">
							<div>
								<h1 className="text-center">Немає продуктів</h1>
							</div>
						</div>
					)}
					{!isLastPage && <LoadMore {...configLoadMore} />}
				</div>
			</div>
		</section>
	);
};

export default ProductsShow;
