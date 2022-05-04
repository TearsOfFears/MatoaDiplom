import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Carts/cart.actions";
import Skeleton from "../Skeleton";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../../Loader/Loader";
import { fetchCurrentProductStart } from "../../../redux/Products/products.actions";
import "./style.scss";

const ProductRender = (product) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [disable, setDisable] = useState();
	
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

	let priceOLd = 0;

	if (discount === "true") {
		priceOLd = (price * 100) / (100 - discountPersentage);
	}

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
		navigate("/cart");
	};
	const getData = (productID) => {
		dispatch(fetchCurrentProductStart({ productID, productName }));
	};

	const handleAvailability = () => {
		if (availability === "outOfStock") return "outOfStock";
		if (availability === "availableSoon") return "availableSoon";
		if (availability === "inStock") return "inStock";
	};

	const discountHandle = () => {
		if (discount === "yes") return "discount";
		if (discount === "no") return "hide";
	};

	const handleDisable = () => {
		if (availability === "outOfStock") setDisable(true);
		if (availability === "availableSoon") setDisable(true);
		if (availability === "inStock") setDisable(false);
	};

	useEffect(() => {
		handleDisable();
		discountHandle();
	}, [availability, discount]);

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
				<div className={`wrapper-main-product `}>
					<div className="wrapper-products__item" key={ind}>
						<div className={`${discountHandle()}`}>
							{" "}
							-{discountPersentage}%{" "}
						</div>
						<div className={`${handleAvailability()}`} />
						<div className="img-border">
							<LazyLoadImage
								effect="blur"
								useIntersectionObserver={true}
								placeholder={<Loader />}
								src={productThumbnail[0]}
								//width="250px"
								wrapperClassName="img-lazy"
								placeholderSrc={<Skeleton />}
							/>
						</div>
						<p className="titleProduct">{productName}</p>
						<hr />
						
						<div className="price-discount">
							{discount === "true" && <strike>{priceOLd} ₴ </strike>}
							{discount === "true" ? (
								<p className="price price-new">{price} ₴ </p>
							) : (
								<p className="price">{price} ₴ </p>
							)}
						</div>

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
