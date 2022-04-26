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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserSession } from "../../redux/User/user.actions";
import { getUserOrderHistory } from "../../redux/Orders/orders.actions";
import { useSelector } from "react-redux";
import { useState } from "react";
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
		lable: "Стан",
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

const mapState = ({ user, ordersData }) => ({
	currentUser: user.currentUser,
	orderData: ordersData.ordersHistory.data,
});

const RenderOrderHistory = (currentUser) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { orderData } = useSelector(mapState);
	useEffect(() => {
		if (typeof currentUser === "object") {
			dispatch(getUserOrderHistory(currentUser.id));
		}
	}, [currentUser.id]);
	
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
						{Array.isArray(orderData) &&
							orderData.length > 0 && currentUser.id.length>0 &&
							orderData.map((row, pos) => {
								const { documentID, grandTotal, orderCreated,activity } = row;

								return (
									<TableRow
										key={pos}
										onClick={() => navigate(`/order/${documentID}`)}
									>
										<TableCell align="left">
											{formatDate(orderCreated)}
										</TableCell>
										<TableCell align="left">{documentID}</TableCell>
										<TableCell align="left">{activity.label}</TableCell>
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
