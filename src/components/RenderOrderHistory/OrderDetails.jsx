import React from "react";

import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrderDetailsStart, setOrderDetailsStart } from "../../redux/Orders/orders.actions";
import { useNavigate, Link } from "react-router-dom";
import Buttons from "../Buttons";
import { useParams } from "react-router";
const columns = [
	{
		id: "productName",
		lable: "Назва",
	},
	{
		id: "productThumbnail",
		lable: "Зображення ",
	},

	{
		id: "quantity",
		lable: "Кількість",
	},
	{
		id: "price",
		lable: "Ціна",
	},
	{
		lable: "Упаковка",
	},
];

const styles = {
	fontSize: "16px",
	width: "10%",
};

const OrderDetails = ({ order }) => {
	const { orderID } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const orderItems = order && order.orderItems;
	useEffect(() => {
		return () => {
			dispatch(getOrderDetailsStart(orderID));
		};
	}, []);
	
	const handleBack = () => {
		navigate("/dashboard");
	};
	return (
		<div>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column, pos) => {
								return (
									<TableCell key={pos} style={styles}>
										{column.lable}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(orderItems) &&
							orderItems.length > 0 &&
							orderItems.map((row, pos) => {
								const { documentID, productThumbnail,productName,quantity,price,packageType } = row;
								return (
									<TableRow key={pos}>
											<TableCell>{productName}	</TableCell>
										<TableCell>			
											<LazyLoadImage
												effect="blur"
												useIntersectionObserver={true}
												src={productThumbnail[0]}
												wrapperClassName="text-center"
												width="150px"
											/>
											</TableCell>
											<TableCell>	{quantity} од.	</TableCell>
											<TableCell>{price} ₴</TableCell>
											<TableCell>{packageType.label} - {packageType.price} ₴</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default OrderDetails;
