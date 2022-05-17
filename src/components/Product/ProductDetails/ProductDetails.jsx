import React, { useState, useEffect } from "react";
import Feedback from "../../Feedbacks/Feedback";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getUserOrderHistory } from "../../../redux/Orders/orders.actions";
import { selectOrderItems } from "../../../utils/utils";
import "./details.scss";
const mapState = ({ ordersData, user }) => ({
	orders: ordersData.ordersHistory.data,
	currentUser: user.currentUser,
});
const mapStateSelector = createStructuredSelector({
	dataOrders: selectOrderItems,
});

const ProductDetails = (product) => {
	const dispatch = useDispatch();
	const { productDesc, documentId } = product;
	const { dataOrders } = useSelector(mapStateSelector);
	const { orders, currentUser } = useSelector(mapState);
	const { id } = currentUser || [];
	const [allow, setAllow] = useState(false);
	const [active, setActive] = useState(0);
	const [stateStyle, setstateStyle] = useState({ fade: false });
	const [state, setstate] = useState();

	const handleAllow = () => {
		if (Array.isArray(dataOrders) && dataOrders.length > 0) {
			const items = dataOrders.map((data) => {
				return data.orderItems.map((data) => {
					return data.documentId;
				});
			});
			const arrItems = [].concat.apply([], items);

			setAllow(arrItems.includes(documentId));
		}
	};
	useEffect(() => {
		setstate();
		handleAllow();
		dispatch(getUserOrderHistory(id));
	}, [allow, active]);
	console.log(allow);
	const details = [
		"Деталі",
		"Гарантія",
		"Відгуки",
		"Як налаштовувати",
		"Догляд",
	];

	const detailsRender = [
		productDesc,
		"<h2>Warranty 2</h2> ",
		"<h2>How to Adjust 4</h2> ",
		"<h2>How to Care 5</h2> ",
	];

	const handleActive = (index) => {
		setActive(index);
		setstateStyle({ fade: true });
		handleAllow();
	};
	const configFeedback = {
		currentUser,
		product,
		allow,
	};
	return (
		<section className="details">
			<div className="container">
				<div className="row">
					<div className="wrapper-details">
						<div className="header-details">
							<ul className="header-details__list">
								{details.map((text, index) => {
									return (
										<li
											className={
												active === index ? "nav-link active" : "nav-link"
											}
											onClick={() => handleActive(index)}
										>
											{text}
										</li>
									);
								})}
							</ul>
						</div>
						<div
							onAnimationEnd={() => setstateStyle({ fade: false })}
							className={
								stateStyle.fade ? "imgAnimate header-info" : "header-info"
							}
						>
							{active === 2 ? (
								<Feedback {...configFeedback} />
							) : (
								<div
									dangerouslySetInnerHTML={{ __html: detailsRender[active] }}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
