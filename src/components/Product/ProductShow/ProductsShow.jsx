import React, { useEffect, useState } from "react";
import { ButtonForm, ProductRender } from "../../index";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import SelectedItems from "../SelectedItems";
import SelectCustom, { StylesConfig } from "react-select";
import { FormSelect, LoadMore } from "../../index";
import Skeleton from "../Skeleton";
import { useNavigate, useParams } from "react-router";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Buttons from "../../Buttons";
import { Checkbox, FormControlLabel } from "@material-ui/core";
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

	const [sortAvailable, setSortAvailable] = useState();

	const [selectedCat, setSelectedCat] = useState({ ...initialCat });
	const [discount, setDiscount] = useState("");
	let newArr = [""];
	const [tempArr, setTempArr] = useState([...newArr]);

	const { value, valueSec, label } = selectedCat;
	const [sortTypes, setSortTypes] = useState({ ...initialSort });
	const { valueSecSort } = sortTypes;

	let [searchParams, setSearchParams] = useSearchParams({
		sort: value,
		order: valueSecSort,
		available: tempArr,
		discount:discount,
	});

	let filterType = searchParams.get("sort");
	let sortType = searchParams.get("order");
	let sortAvailableP = searchParams.getAll("available");
	let discountQ = searchParams.get("discount");
	useEffect(() => {
		if (sortType === "asc") {
			setSortTypes({ valueSecSort: sortType, label: "По зростанню" });
		}
		if (sortType === "desc") {
			setSortTypes({ valueSecSort: sortType, label: "По спаданню" });
		}
		if (sortType === "") {
			setSortTypes({ valueSecSort: sortType, label: "Ціна" });
		}
		const avail = searchParams.getAll("available");

		if (avail.length > 0) {
			const handleChangeAvaible = (
				word1,
				word2,
				word3,
				obj1,
				obj2,
				obj3,
				arr
			) => {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] === word1) {
						newArr.push(obj1);
					}
					if (arr[i] === word2) {
						newArr.push(obj2);
					}
					if (arr[i] === word3) {
						newArr.push(obj3);
					}
				}
			};
			handleChangeAvaible(
				"inStock",
				"availableSoon",
				"outOfStock",
				{ label: "В наявності", value: "inStock", valueAvailable: "inStock" },
				{
					label: "Скоро буде",
					value: "availableSoon",
					valueAvailable: "availableSoon",
				},
				{ label: "Немає", value: "outOfStock", valueAvailable: "outOfStock" },
				avail
			);
			setTempArr(...newArr);
			setSortAvailable(newArr);
			dispatch(fetchProductsStart({ filterType, sortType, newArr }));
		}

		setSelectedCat({ value: filterType });
		if (sortAvailableP[0] === "") {
			sortAvailableP = "";
			dispatch(fetchProductsStart({ filterType, sortType, tempArr,discountQ }));
		}

		dispatch(fetchProductsStart({ filterType, sortType, sortAvailableP,discountQ }));
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
				sortAvailable,
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
			fontSize: "14px",
			"&:hover": {
				color: "#f7f6f4",
			},
		}),
		menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
		menu: (provided) => ({ ...provided, zIndex: 9999 }),
		menubar: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				zIndex: 9999,
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
					zIndex: 9999,
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
		setSearchParams({
			sort: value,
			order: valueSecSort,
			available: sortAvailableP,
			discount:discount,
		});
	};
	const handleSelectSort = (data) => {
		const { valueSecSort, label } = data;
		setSortTypes({ valueSecSort, label });
		setSearchParams({
			sort: value,
			order: valueSecSort,
			available: sortAvailableP,
			discount:discount,
		});
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

	const Avaibility = [
		{ label: "В наявності", value: "inStock", valueAvailable: "inStock" },
		{
			label: "Скоро буде",
			value: "availableSoon",
			valueAvailable: "availableSoon",
		},
		{ label: "Немає", value: "outOfStock", valueAvailable: "outOfStock" },
	];

	const handleChange = (event) => {
		let arr = event.map((data, key) => {
			return data.valueAvailable;
		});
		setTempArr(arr);
		setSortAvailable(event);
		setSearchParams({
			sort: value,
			order: valueSecSort,
			available: arr,
			discount:discount,
		});
	};
	const handleChangeDiscount = (e) => {
		let val = e.target.checked.toString();
		if(val==="false"){
			setSearchParams({
				sort: value,
				order: valueSecSort,
				available: sortAvailableP,
				discount:""
			});
			setDiscount("")
		}
		if(val==="true"){
			setSearchParams({
				sort: value,
				order: valueSecSort,
				available: sortAvailableP,
				discount:"true"
			});
			setDiscount("true")
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
				<div className="col-12 d-flex flex-row w-100 justify-content-between align-items-center sort-wrapper">
					<div className="d-flex flex-row w-50 justify-content-between">
						{categoryArr.map((data, key) => {
							const { label, value } = data;
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
					<div className="d-flex flex-row w-50 justify-content-end align-items-center">
						<FormControlLabel
							control={<Checkbox onChange={handleChangeDiscount} checked={discountQ}/>}
							
							label="Акційні"
						/>
						<div style={{ width: "225px", paddingRight: "16px" }}>
							<SelectCustom
								isMulti
								options={Avaibility}
								placeholder="Наявність"
								styles={colourStyles}
								isSearchable={false}
								onChange={(e) => handleChange(e)}
								value={sortAvailable}
							/>
						</div>

						<div style={{ width: "165px" }}>
							<SelectCustom
								placeholder="Ціна"
								options={optionsVal}
								defaultValue={sortTypes}
								styles={colourStyles}
								isSearchable={false}
								onChange={(e) => handleSelectSort(e)}
								value={sortTypes}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-3 mb-5">
					<div className="wrapper-products">
						{data.map((product, ind) => {
							const { productThumbnail, productName, price, availability } =
								product;
							if (
								!productThumbnail ||
								!productName ||
								!availability ||
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
