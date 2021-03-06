import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeCartItem,
	addProduct,
	reduceCartItem,
	setPackaging,
} from "../../redux/Carts/cart.actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Select, { StylesConfig } from "react-select";
import "./style.scss";
import { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { selectCartItemsValue } from "./../../redux/Carts/cart.selectors";

const mapState = ({ user, cartData, ordersData }) => ({
	currentUser: user.currentUser,
	cartData: cartData.cartItems,
	orderHistoryLast: ordersData.ordersHistory.data,
});


const ItemRender = (product) => {
	const dispatch = useDispatch();

	const { currentUser, cartData } = useSelector(mapState);

	const { productThumbnail, productName, price, quantity, documentId,packageType } =
		product;

	const handleRemoveCurrentItem = (documentId) => {
		dispatch(removeCartItem({ documentId }));
	};

	const handleAddProduct = (product) => {
		dispatch(addProduct(product));
	};

	const handleReduceProduct = (product) => {
		dispatch(reduceCartItem(product));
	};

	const [selectedOption, setSelectedOption] = useState([]);

	const { value, label } = selectedOption;

	const colourStyles = {
		control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
			...styles,
			backgroundColor: "white",
			width:"100%",
			borderColor: isFocused ? "#d84727" : "#f7f6f4 ",
			borderColor: isSelected ? "#d84727" : "#d84727",
			boxShadow: "none",
				"&:hover": {
					borderColor: isFocused ? "#d84727" : "#d84727"
				  }
		}),
		menubar: (styles, { data, isDisabled, isFocused, isSelected,isHovered }) => {
			return {
				...styles,
			    borderColor: isFocused ? "#d84727" : "#f7f6f4",
				borderColor: isSelected ? "#d84727" : "#f7f6f4",
			};
		},
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,

				backgroundColor: isDisabled ? "#d84727" : "#f7f6f4",
				color: isDisabled ? "#f7f6f4" : "#333",

				cursor: isDisabled ? "not-allowed" : "default",
				":hover": {
					backgroundColor: "#d84727",
					color: "#f7f6f4",
				},
			};
		},
	};
	const options = [
		{
			label: "???????????????? (0???)",
			price: 0,
		},
		{
			label: "??????????'?????? (300???)",
			price: 300,
		},
		{
			label: "?????????????????????? (500???)",
			price: 500,
		},
	];

	const handleSetPackaging = (packageType, documentId) => {
		dispatch(setPackaging({ packageType, documentId }));
	};

	return (
		<div className="cart-item" key={documentId}>
			<div className="img-title">
				<div className="img-wrapper">
					<LazyLoadImage
						effect="blur"
						useIntersectionObserver={true}
						src={productThumbnail}
						wrapperClassName="text-center"
					/>
				</div>
				<div className="title-price-wrapper">
					<h1>{productName}</h1>
					<p> {price} ???</p>
				</div>
			</div>

			<div className="plus-minus-delete">
				<div style={{ width: "90% " }}>
					<div className="selectPackage">
						<h4 style={{ paddingBottom: "10px" }}>???????????????? ????????????????:</h4>
						
						<Select
							options={options}
							styles={colourStyles}
							clearable={false}
							isSearchable={false}
							className="selectPackageSelect"
							value={packageType}
							onChange={(evt) => {
								handleSetPackaging(evt, documentId);
							}}
							required
						/>
					</div>
					<div className="block-increase-price">
						<div className="block-minus-plus">
							<button
								className="minus"
								onClick={() => handleReduceProduct(product)}
							>
								<svg
									width="16"
									height="2"
									viewBox="0 0 16 2"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M0 1H16" stroke="none" />
								</svg>
							</button>
							<span>{quantity}</span>
							<button
								className="plus"
								onClick={() => handleAddProduct(product)}
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="#777"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M0 8H16M8 0V16" stroke="#777777" />
								</svg>
							</button>
						</div>
						<p> {price * quantity} ???</p>

						<button
							className="delete"
							onClick={() => handleRemoveCurrentItem(documentId)}
						>
							<svg
								width="17"
								height="19"
								viewBox="0 0 17 19"
								fill="#d84727"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M15.6972 2.29715H12.0601L11.7033 0.870009C11.5755 0.358703 11.1161 5.13325e-06 10.589 0H5.49104C4.964 5.13325e-06 4.50459 0.358703 4.37677 0.870009L4.02002 2.29715H0.382859C0.171412 2.29715 0 2.46857 0 2.68001C0 2.89146 0.171412 3.06287 0.382859 3.06287H1.56972L2.28069 17.2866C2.31157 17.8977 2.816 18.3772 3.42781 18.3772H12.6912C13.3032 18.3772 13.8077 17.8972 13.8382 17.2859L14.5493 3.06287H15.6972C15.9087 3.06287 16.0801 2.89146 16.0801 2.68001C16.0801 2.46857 15.9087 2.29715 15.6972 2.29715ZM6.12553 13.4001C6.12553 13.6115 5.95411 13.7829 5.74267 13.7829C5.53122 13.7829 5.35981 13.6115 5.35981 13.4001V7.27433C5.35981 7.06289 5.53122 6.89147 5.74267 6.89147C5.95411 6.89147 6.12553 7.06289 6.12553 7.27433V13.4001ZM8.03973 14.5486C8.25117 14.5486 8.42259 14.3772 8.42259 14.1658V6.5086C8.42259 6.29715 8.25117 6.12574 8.03973 6.12574C7.82828 6.12574 7.65687 6.29715 7.65687 6.5086V14.1658C7.65687 14.3772 7.82828 14.5486 8.03973 14.5486ZM10.7204 13.4001C10.7204 13.6115 10.549 13.7829 10.3376 13.7829C10.1261 13.7829 9.95471 13.6115 9.95471 13.4001V7.27433C9.95471 7.06289 10.1261 6.89147 10.3376 6.89147C10.549 6.89147 10.7204 7.06289 10.7204 7.27433V13.4001ZM5.11937 1.05584L4.8091 2.29715H11.2705L10.9602 1.05584C10.9178 0.885236 10.7645 0.765524 10.5887 0.765712H5.49082C5.31503 0.765524 5.16176 0.885236 5.11937 1.05584Z"
									fill="#d84727"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemRender;
