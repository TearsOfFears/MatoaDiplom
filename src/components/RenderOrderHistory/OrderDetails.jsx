import React from "react";

import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";

import moment from "moment";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setOrderDetailsStart } from "../../redux/Orders/orders.actions";
import { useNavigate, Link } from "react-router-dom";
import Buttons from "../Buttons";
const columns = [
	{
		id: "productName",
		lable: "Назва",
	},
	{
		id: "productThumbnail",
		lable: "Зображення замовлення ",
	},

	{
		id: "quantity",
		lable: "Кількість",
	},
	{
		id: "price",
		lable: "Ціна",
	},
];

const styles = {
	fontSize: "16px",
	width: "10%",
};
const formatText = (columnName, columnVal) => {
	switch (columnName) {
		case `productName`:
			return `${columnVal}`;
		case `productThumbnail`:
			return <img src={columnVal} />;
		case `quantity`:
			return `${columnVal} од.`;
		case `price`:
			return `${columnVal} грн.`;

		default:
			return columnVal;
	}
};

const OrderDetails = ({ order }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const orderItems = order && order.orderItems;
	useEffect(() => {
		return () => {
			dispatch(setOrderDetailsStart({}));
		};
	}, []);
const handleBack = ()=>{
	navigate('/dashboard');
}
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
								const { documentID } = row;
								return (
									<TableRow key={pos}>
										{columns.map((column, pos) => {
											const columnName = column.id;
											const colValue = row[columnName];
											const formatedText = formatText(columnName, colValue);
											return (
												<TableCell key={pos} style={styles}>
													{formatedText}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<Buttons onClick={handleBack}>Назад</Buttons>
		</div>
	);
};

export default OrderDetails;
