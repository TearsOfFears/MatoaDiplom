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
import { useSelector } from "react-redux";
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
const columnsAdress = [
	{
		lable: "Країна",
	},
	{
		lable: "Місто ",
	},

	{
		lable: "Область/Штат",
	},
	{
		lable: "Адреса",
	},
	{
		lable: "Додаткова Адреса",
	},
	{
		lable: "Індекс",
	},
];

const styles = {
	fontSize: "16px",
	width: "10%",
};
const mapState = ({ ordersData }) => ({
	orders: ordersData.ordersHistory,
	orderDetailsAddress: ordersData.orderDetails.shippingAddress,
});

const ShowOrderDetail = ({
	toggleModal,
	hideModal,
	setHideModal,
	orderDetails,
	children,
}) => {
	const { orderDetailsAddress } = useSelector(mapState);
	console.log(orderDetailsAddress);
	if (!hideModal) return null;
	return [
		<div
			className="modalOverlayDetails"
			onClick={() => toggleModal()}
			key={1}
		/>,
		<div className="modalWrapDetails" key={2}>
			<div className="modalDetails">
				<TableContainer className="mb-5">
					<h3>Адреса</h3>
					<Table>
						<TableHead>
							<TableRow>
								{columnsAdress.map((column, pos) => {
									return (
										<TableCell key={pos} style={styles}>
											{column.lable}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{orderDetailsAddress && (
								<TableRow>
									<TableCell>{orderDetailsAddress.country} </TableCell>
									<TableCell>{orderDetailsAddress.city} </TableCell>
									<TableCell>{orderDetailsAddress.state} </TableCell>
									<TableCell>{orderDetailsAddress.line1} </TableCell>
									<TableCell>{orderDetailsAddress.line2} </TableCell>
									<TableCell>{orderDetailsAddress.postal_code} </TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<TableContainer>
					<h3>Предмети</h3>
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
							{Array.isArray(orderDetails) &&
								orderDetails.length > 0 &&
								orderDetails.map((row, pos) => {
									const {
										documentID,
										productThumbnail,
										productName,
										quantity,
										price,
										packageType,
										shippingAddress,
									} = row;
									console.log(shippingAddress);
									return (
										<TableRow key={pos}>
											<TableCell>{productName} </TableCell>
											<TableCell>
												<LazyLoadImage
													effect="blur"
													useIntersectionObserver={true}
													src={productThumbnail[0]}
													wrapperClassName="text-center"
													width="150px"
												/>
											</TableCell>
											<TableCell> {quantity} од. </TableCell>
											<TableCell>{price} ₴</TableCell>
											<TableCell>
												{packageType.label} - {packageType.price} ₴
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>,
	];
};

export default ShowOrderDetail;
