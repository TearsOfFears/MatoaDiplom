import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "./../../redux/Carts/cart.actions";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../Loader/Loader";
import { fetchCurrentProductStart } from "../../redux/Products/products.actions";
import "./ProductShow/style.scss";
const ProductRender = (product) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [disable, setDisable] = useState();
	//const [style, setStyle] = useState("");
	const {
		ind,
		productThumbnail,
		productName,
		price,
		documentId,
		availability,
		discount,
		discountPersentage,
	} = product;
	let priceNew=0;
	if(discount==="yes"){
	 priceNew = price - (price * discountPersentage) / 100;
	}

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
		navigate("/cart");
	};
	const getData = (productID) => {
		dispatch(fetchCurrentProductStart(productID));
	};

	const handleAvailability = () => {
		if (availability === "outOfStock") return "outOfStock";
		if (availability === "availableSoon") return "availableSoon";
		if (availability === "inStock") return "inStock";
	};
	const handleDisable = () => {
		if (availability === "outOfStock") setDisable(true);
		if (availability === "availableSoon") setDisable(true);
		if (availability === "inStock") setDisable(false);
	};

	useEffect(() => {
		handleDisable();
	}, [availability]);

	if (
		!productThumbnail ||
		!documentId ||
		!productName ||
		!availability ||
		typeof price === "undefined"
	)
		return null;
	return (
		<div>
			{product ? (
				<div className="wrapper-main-product">
					<div className="wrapper-products__item" key={ind}>
						<div className={`${handleAvailability()}`} />
						<div className="img-border">
							<LazyLoadImage
								effect="blur"
								useIntersectionObserver={true}
								placeholder={<Loader />}
								src={productThumbnail[0]}
								width="250px"
								wrapperClassName="text-center"
								placeholderSrc={<Skeleton />}
							/>
						</div>
						<p className="titleProduct">{productName}</p>
						<hr />
						{discount === "yes" && 
						<p className="price"> <strike>{price} ₴ </strike></p>
						}
						{discount === "yes" ?  <p className="price">{priceNew} ₴ </p> :  <p className="price">{price} ₴ </p>  }
						
						<div className="wrapper-show ">
							<div className="wrapper-show-main">
								<Link
									to={`/product/${productName}`}
									className="btn-product"
									onClick={() => getData(documentId)}
								>
									Переглянути подробиці
								</Link>
								{!disable && (
									<button
										className="btn-product"
										onClick={() => handleAddToCart(product)}
									>
										Добавити до кошика
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<Skeleton />
			)}
		</div>
	);
};

export default ProductRender;
