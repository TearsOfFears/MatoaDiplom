import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteOrder,
	fetchOrdersHistory,
	getOrderDetailsStart,
	setActivity,
} from "../../redux/Orders/orders.actions";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import Select, { StylesConfig } from "react-select";
import { FormSelect, LoadMore } from "..";
import ShowOrderDetail from "./ShowOrderDetail";

const mapState = ({ ordersData }) => ({
	orders: ordersData.ordersHistory,
	orderDetails: ordersData.orderDetails.orderItems,
});

const Orders = () => {
	const dispatch = useDispatch();
	const { orders, orderDetails } = useSelector(mapState);
	const [hideModal, setHideModal] = useState(false);
	const { dataOrders, queryDocOrders, isLastPageOrders } = orders;

	useEffect(() => {
		dispatch(fetchOrdersHistory({}));
	}, []);

	const colums = [
		{
			lable: "#",
		},
		{
			lable: "ID - покупця ",
		},
		{
			lable: "Ім`я покупця",
		},
		{
			lable: "E-пошта",
		},
		{
			lable: "Номер",
		},
		{
			lable: "Вартість упаковки",
		},
		{
			lable: "Загальна сума",
		},
		{
			lable: "Стан",
		},
		{
			lable: "Подробиці",
		},
		{
			lable: "Видалити",
		},
	];
	const styles = {
		fontSize: "15px",
		cursor: "cursor",
	};

	const colourStyles = {
		control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
			...styles,
			backgroundColor: "white",
			width: "100%",
			borderColor: isFocused ? "#d84727" : "#f7f6f4 ",
			borderColor: isSelected ? "#d84727" : "#d84727",
			boxShadow: "none",
			zIndex: 999,
			"&:hover": {
				borderColor: isFocused ? "#d84727" : "#d84727",
				zIndex: 999,
			},
		}),
		menubar: (
			styles,
			{ data, isDisabled, isFocused, isSelected, isHovered }
		) => {
			return {
				...styles,
				borderColor: isFocused ? "#d84727" : "#f7f6f4",
				borderColor: isSelected ? "#d84727" : "#f7f6f4",
				zIndex: 9999,
			};
		},
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isSelected ? "#d84727" : "#f7f6f4",

				cursor: isDisabled ? "not-allowed" : "default",

				zIndex: 9999,
				":hover": {
					backgroundColor: "#d84727",
					color: "#f7f6f4",
					zIndex: 9999,
				},
			};
		},
	};

	const options = [
		{ value: "Processing", name: "В обробці" },
		{
			name: "Очікуйте дзвінка",
			value: "Waiting for Call",
		},
		{
			name: "Підтвердженно",
			value: "Confirm",
		},
		{
			name: "Надісланно",
			value: "ship",
		},
		{
			name: "Успішно виконане",
			value: "succesfull",
		},
	];
	console.log(queryDocOrders);
	const handleSetPackaging = (e, documentId) => {
		const { value } = e.target;
		const name = e.target.options[e.target.selectedIndex].text;
		const activity = { label: name, value: value };
		const activityData = {
			activity,
		};
		dispatch(setActivity({ activityData, documentId }));
		dispatch(fetchOrdersHistory({}));
	};

	const handleDelete = (documentID) => {
		dispatch(deleteOrder(documentID));
		dispatch(fetchOrdersHistory({}));
	};
	const handleLoadMore = () => {
		dispatch(
			fetchOrdersHistory({
				startAfterDoc: queryDocOrders,
				persistOrderHistory: dataOrders,
			})
		);
	};
	const configLoadMore = {
		style: "text-center mt-5 mb-5 d-block",
		onLoadMoreEvt: handleLoadMore,
	};

	const toggleModal = () => {
		setHideModal(!hideModal);
	};
	const handleGetOrderDetailsStart = (id) => {
		dispatch(getOrderDetailsStart(id));
		toggleModal();
	};
	const configModal = {
		hideModal,
		toggleModal,
		setHideModal,
		orderDetails,
	};
	return (
		<div>
			<TableContainer>
				<h1>Замовлення</h1>
				<Table>
					<TableHead>
						<TableRow>
							{colums.map((column, pos) => {
								const { lable } = column;
								return <TableCell key={pos}>{lable}</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(dataOrders) &&
							dataOrders.length > 0 &&
							dataOrders.map((data, pos) => {
								const {
									grandTotal,
									packagingPrice,
									orderUserID,
									documentID,
									activity,
									email,
									name,
									phone,
								} = data;

								return (
									<TableRow key={documentID} style={{ cursor: "pointer" }}>
										<TableCell align="left">{pos + 1}</TableCell>
										<TableCell align="left">
											{typeof orderUserID === "string" &&
											orderUserID.length > 0 ? (
												<ReadMoreReact
													text={orderUserID}
													min={5}
													ideal={10}
													max={orderUserID.length}
													readMoreText="click "
												/>
											) : null}
										</TableCell>
										<TableCell align="left">{name}</TableCell>
										<TableCell align="left">{email}</TableCell>
										<TableCell align="left">{phone}</TableCell>
										<TableCell align="left">{packagingPrice}₴</TableCell>
										<TableCell align="left">{grandTotal}₴</TableCell>

										<TableCell style={{ width: "300px" }}>
											<FormSelect
												options={options}
												value={activity.value}
												onChange={(e) => {
													handleSetPackaging(e, documentID);
												}}
											/>
										</TableCell>
										<TableCell align="center">
											<button
												className="delete"
												onClick={() => handleGetOrderDetailsStart(documentID)}
											>
												<svg
													class="svg-icon"
													viewBox="0 0 1024 1024"
													version="1.1"
													fill="#d84727"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M211.65579378 428.36514133l331.56361481-1.89326222 0.44297482 77.6722963-331.56361482 1.89326222zM211.71162075 605.93129245l252.67768888-1.89326223 0.58254222 77.6722963-252.67768888 1.89326223zM211.82084741 251.12788385l561.54642962-2.53648593 0.3519526 77.6722963-561.54642963 2.53648593z" />
													<path d="M471.10068148 998.30139259H117.8130963c-21.48124445 0-38.83614815-17.3549037-38.83614815-38.83614814V88.80734815c0-21.48124445 17.3549037-38.83614815 38.83614815-38.83614815h783.64065185c21.48124445 0 38.83614815 17.3549037 38.83614815 38.83614815v430.2317037c0 21.48124445-17.3549037 38.83614815-38.83614815 38.83614815s-38.83614815-17.3549037-38.83614815-38.83614815V127.6434963H156.64924445v792.86423703h314.45143703c21.48124445 0 38.83614815 17.3549037 38.83614815 38.83614815s-17.3549037 38.95751111-38.83614815 38.95751111z" />
													<path d="M715.76841482 939.07626667c-112.62482963 0-204.25386667-91.62903703-204.25386667-204.25386667s91.62903703-204.25386667 204.25386667-204.25386667 204.25386667 91.62903703 204.25386666 204.25386667-91.7504 204.25386667-204.25386666 204.25386667z m0-330.83543704c-69.7837037 0-126.58157037 56.79786667-126.58157037 126.58157037s56.79786667 126.58157037 126.58157037 126.58157037 126.58157037-56.79786667 126.58157036-126.58157037-56.91922963-126.58157037-126.58157036-126.58157037z" />
													<path d="M925.60497778 984.95146667c-9.70903703 0-19.41807408-3.64088889-26.94257778-10.92266667L805.81973333 884.5842963c-15.4130963-14.92764445-15.89854815-39.44296297-0.9709037-54.85605927 14.92764445-15.4130963 39.44296297-15.89854815 54.85605926-0.9709037l92.84266666 89.4445037c15.4130963 14.92764445 15.89854815 39.44296297 0.9709037 54.85605927-7.5245037 8.00995555-17.71899259 11.89357037-27.91348147 11.89357037z" />
												</svg>
											</button>
										</TableCell>
										<TableCell align="center">
											<button
												className="delete"
												onClick={() => handleDelete(documentID)}
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
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			{!isLastPageOrders && <LoadMore {...configLoadMore} />}
			<ShowOrderDetail {...configModal} />
		</div>
	);
};

export default Orders;
