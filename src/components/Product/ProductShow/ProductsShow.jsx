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

const initialCat = {
	key: 0,
	value: "all",
	label: "",
	valueSec:""
};

const mapState = ({ productsData }) => ({ products: productsData.products });

const ProductsShow = () => {
	const { products } = useSelector(mapState);
	const { data, queryDoc, isLastPage } = products;
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const { filterType, sortType } = useParams();

	const [sortTypes, setSortTypes] = useState("asc");

	const [selectedCat, setSelectedCat] = useState({ ...initialCat });

	const { value,valueSec } = selectedCat;

	useEffect(() => {
		dispatch(fetchProductsStart({ filterType:valueSec, sortTypes }));

		if (typeof value === "string") {
			navigation(`/products/${value}/${sortType}`);
		}
	}, [filterType, selectedCat, sortTypes]);

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

	const configFilters = {
		defaultValue: value,
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
	const colourStyles = {
		control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
			...styles,
			backgroundColor: "white",

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
			};
		},
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,

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

	const categoryArr = [
		{
			label: "Всі продукти",
			value: "all",
			valueSec:"",
		},
		{
			label: "Годинники",
			value: "watches",
			valueSec:"watches",
		},
		{
			label: "Окуляри",
			value: "glasses",
			valueSec:"glasses",
		},
	];

	const handleSelectCat = (key, data) => {
		const { label, value,valueSec } = data;
		setSelectedCat({ key, value, label, valueSec });
	};
	console.log(selectedCat);
	return (
		<section className="products">
			<div className="container">
				<h1>
					{selectedCat.label ? selectedCat.label : "Всі продукти"}
				</h1>
				<div className="col-12 d-flex flex-row w-100 justify-content-between align-items-center">
					<div className="d-flex flex-row w-50 justify-content-between">
						{categoryArr.map((data, key) => {
							const { label, value } = data;

							return (
								<Buttons
									style={
										key === selectedCat.key
											? "btn-Category activeCat "
											: "btn-Category "
									}
									onClick={(e) => handleSelectCat(key, data)}
									text={label}
									value={value}
									key={key}
								/>
							);
						})}
					</div>

					<div style={{ width: "170px" }}>
						<Select
							options={optionsVal}
							defaultValue={{
								label: "Нажміть для сортування",
								value: "",
							}}
							styles={colourStyles}
							isSearchable={false}
							onChange={(e) => setSortTypes(e.value)}
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
