import React from "react";
import VerticalNav from "../Admin/VerticalNav";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import { Order } from "../../pages";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
const colums = [
	{
		id: "orderCreated",
		lable: "Дата замовлення",
	},
	{
		id: "documentID",
		lable: "ID - замовлення",
	},
	{
		id: "orderTotal",
		lable: "Сума",
	},
];

const styles = {
	fontSize: "16px",
	cursor: "pointer",
	width: "10%",
};
const formatText = (columnName, columnVal) => {
	switch (columnName) {
		case `orderTotal`:
			return `${columnVal} грн`;
		case `orderCreated`:
			return moment(columnVal.nano).format("DD.MM.YYYY");
		default:
			return columnVal;
	}
};
const calcDate = (data) => {
	let myDate = new Date(
		data.seconds * 1000 + data.nanoseconds / 1000000
	);
	let formatedTime = myDate.toJSON();
	let localDate = new Date(formatedTime);
	let test = moment(localDate).format("DD.MM.YYYY, HH:mm:ss ");
	return test;
};

const RenderOrderHistory = ({ orders }) => {
	const navigate = useNavigate();
	console.log(orders);
	return (
		<div className="d-flex flex-row mt-5 mb-5">
			<VerticalNav />

			<TableContainer>
				<h1>Замовлення</h1>
				<Table>
					<TableHead>
						<TableRow>
							{colums.map((column, pos) => {
								const { lable } = column;
								return (
									<TableCell key={pos} style={styles}>
										{lable}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(orders) &&
							orders.length > 0 &&
							orders.map((row, pos) => {
								const { documentID, grandTotal, orderCreated } = row;

								return (
									<TableRow
										key={pos}
										onClick={() => navigate(`/order/${documentID}`)}
									>
										<TableCell align="left">{calcDate(orderCreated)}</TableCell>
										<TableCell align="left">{documentID}</TableCell>
										<TableCell align="left">{grandTotal} грн.</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default RenderOrderHistory;
