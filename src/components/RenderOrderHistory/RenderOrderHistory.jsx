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
import { formatDate } from "../../utils/utils";
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


const RenderOrderHistory = ({ orders }) => {
	const navigate = useNavigate();
	console.log(orders);
	return (
		<div className="dashboard mb-5">
			<VerticalNav />

			<TableContainer>
				<h1 className="mt-0">Замовлення</h1>
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
					<TableBody style={styles}>
						{Array.isArray(orders) &&
							orders.length > 0 &&
							orders.map((row, pos) => {
								const { documentID, grandTotal, orderCreated } = row;

								return (
									<TableRow
										key={pos}
										onClick={() => navigate(`/order/${documentID}`)}
									>
										<TableCell align="left">{formatDate(orderCreated)}</TableCell>
										<TableCell align="left">{documentID}</TableCell>
										<TableCell align="left">{grandTotal} ₴</TableCell>
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
