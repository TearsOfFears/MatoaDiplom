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
import { useSearchParams, createSearchParams } from "react-router-dom";
import Buttons from "../../Buttons";

const initialCat = {
	key: 0,
	value: "",
	label: "Всі продукти",
	valueSec: "",
};
const initialSort = {
	valueSecSort: "",
	label: "",
};

const mapState = ({ productsData }) => ({ products: productsData.products });

const ProductsShow = () => {
	const { products } = useSelector(mapState);
	const { data, queryDoc, isLastPage } = products;
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const [sortAvailable, setSortAvailable] = useState("");

	const [selectedCat, setSelectedCat] = useState({ ...initialCat });


	const { value, valueSec,label } = selectedCat;
	console.log("selectedCat",value);
	const [sortTypes, setSortTypes] = useState({ ...initialSort });
	const { valueSecSort } = sortTypes;

	let [searchParams, setSearchParams] = useSearchParams({
		sort: value,
		order: valueSecSort,
	});

	let filterType = searchParams.get("sort");
	let sortType = searchParams.get("order");

	useEffect(() => {
	
		if(sortType ==="asc"){
			setSortTypes({valueSecSort:sortType,label:"По зростанню"})
		}
		if(sortType ==="desc"){
			setSortTypes({valueSecSort:sortType,label:"По спаданню"})
		}
		if(sortType ===""){
			setSortTypes({valueSecSort:sortType,label:"Ціна"})
		}

		setSelectedCat({value:filterType})

		dispatch(fetchProductsStart({ filterType, sortType }));
	}, [searchParams]);
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
		defaultValue: filterType,
	};

	const handleLoadMore = () => {
		dispatch(
			fetchProductsStart({
				filterType,
				sortType,
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

	const optionsVal = [
		{
			label: "Ціна",
			value: "",
			valueSecSort: "",
		},
		{
			label: "По зростанню",
			value: "asc",
			valueSecSort: "asc",
		},
		{
			label: "По спаданню",
			value: "desc",
			valueSecSort: "desc",
		},
	];

	const categoryArr = [
		{
			label: "Всі продукти",
			value: "",
			valueSec: "",
		},
		{
			label: "Годинники",
			value: "watches",
			valueSec: "watches",
		},
		{
			label: "Окуляри",
			value: "glasses",
			valueSec: "glasses",
		},
	];

	const handleSelectCat = (key, data) => {
		const { label, value } = data;
		setSelectedCat({ key, value, label });

		setSearchParams({ sort: value, order: valueSecSort });
	};

	const handleSelectSort = (data) => {
		const { valueSecSort, label } = data;
		console.log(data);
		setSortTypes({ valueSecSort, label });

		setSearchParams({ sort: value, order: valueSecSort });
	};

	const changeFilterTitle = (filterType) => {
		if (filterType === "watches") {
			return "Годинники";
		}
		if (filterType === "glasses") {
			return "Окуляри";
		}
		if (filterType === "") {
			return "Всі продукти";
		}
	};



	return (
		<section className="products">
			<div className="container">
				<h1>
					{filterType === selectedCat.value
						? changeFilterTitle(filterType)
						: null}
				</h1>
				<div className="col-12 d-flex flex-row w-100 justify-content-between align-items-center">
					<div className="d-flex flex-row w-50 justify-content-between">
						{categoryArr.map((data, key) => {
							const { label, value } = data;
							//let filterType  = searchParams.get('sort')
							return (
								<Buttons
									style={
										data.value === filterType
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
							defaultValue={sortTypes}
							styles={colourStyles}
							isSearchable={false}
							onChange={(e) => handleSelectSort(e)}
							value={sortTypes}
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
