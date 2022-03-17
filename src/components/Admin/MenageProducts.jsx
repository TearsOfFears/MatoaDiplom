import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalProduct from "./ModalProduct";

import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import {
	FormInput,
	ButtonForm,
	Modal,
	FormSelect,
	Buttons,
	LoadMore,
} from "./../../components";

import ReadMoreReact from "read-more-react";

import {
	addProductStart,
	deleteProductsStart,
	editContentMainProduct,
	fetchProductsStart,
	setCurrentProduct,
	updateContentMainProduct,
} from "../../redux/Products/products.actions";
import { storage } from "./../../firebase/utils";
//import MenageProductEdit from "./MenageProductEdit";

const mapState = ({ productsData }) => ({ products: productsData.products });
const MenageProducts = () => {
	const [hideModal, setHideModal] = useState(false);
	//const [hideModalEdit, setHideModalEdit] = useState(true);
	const { products } = useSelector(mapState);
	const dispatch = useDispatch();

	const deleteImage = async (deleteLinks) => {
		for (let i = 0; i < deleteLinks.length; i++) {
			const ref = storage.refFromURL(deleteLinks[i]);
			await ref.delete();
		}
	};

	const deleteAll = (deleteLinks, documentId) => {
		deleteImage(deleteLinks);
		dispatch(deleteProductsStart(documentId));
	};

	const colums = [
		{
			id: "number",
			lable: "#",
		},
		{
			id: "productName",
			lable: "Назва продукту",
		},
		{
			id: "productThumbnail",
			lable: "Зображення головного екрану",
		},
		{
			id: "documentId",
			lable: "ID - продукту",
		},
		{
			id: "productDesc",
			lable: "Опис продукту",
		},

		{
			id: "price",
			lable: "Ціна продукту",
		},
		{
			id: "documentId",
			lable: "Редагувати продукт",
		},
		{
			id: "documentId",
			lable: "Видалити продукт",
		},
	];

	const styles = {
		fontSize: "16px",
		cursor: "cursor",
		width: "15%",
	};

	useEffect(() => {
		dispatch(fetchProductsStart());
		dispatch(setCurrentProduct({}));
	}, []);
	const { data, queryDoc, isLastPage } = products;

	const handleLoadMore = () => {
		dispatch(
			fetchProductsStart({
				startAfterDoc: queryDoc,
				persistProducts: data,
			})
		);
	};
	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	};

	const toggleModal = () => {
		setHideModal(!hideModal);
	};

	const handleGetContentProduct = (documentID) => {
		dispatch(editContentMainProduct(documentID));
		toggleModal();
	};
	const configModal = {
		hideModal,
		toggleModal,
		setHideModal,
	};
	return (
		<div className="menageProducts">
			<div className="d-flex flex-row align-items-center justify-content-between">
				<h1>Управління продукцією</h1>
				<ButtonForm onClick={() => toggleModal()}>Додати продукт</ButtonForm>
			</div>
			<ModalProduct {...configModal} />
			<TableContainer>
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
						{Array.isArray(data) &&
							data.length > 0 &&
							data.map((data, pos) => {
								const {
									productName,
									productThumbnail1,
									productThumbnail2,
									productThumbnail3,
									productThumbnail4,
									productDesc,
									documentId,
									price,
								} = data;
								const deleteLinks = [
									productThumbnail1,
									productThumbnail2,
									productThumbnail3,
									productThumbnail4,
								];

								return (
									<TableRow key={productName} style={styles}>
										<TableCell component="th" scope="row">
											{pos + 1}
										</TableCell>
										<TableCell component="th" scope="row">
											{productName}
										</TableCell>
										<TableCell align="left">
											<img src={productThumbnail1} alt={productThumbnail1} />
										</TableCell>
										<TableCell align="left">{documentId}</TableCell>
										<TableCell align="left">
											{typeof productDesc === "string" &&
											productDesc.length > 0 ? (
												<ReadMoreReact
													text={productDesc}
													min={5}
													ideal={10}
													max={productDesc.length}
													readMoreText="click "
												/>
											) : null}
										</TableCell>
										<TableCell align="left">{price} грн.</TableCell>
										<TableCell align="left">
											<button
												className="delete"
												onClick={() => handleGetContentProduct(documentId)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="17"
													height="19"
													viewBox="0 0 494.936 494.936"
													fill="#d84727"
												>
													<g>
														<path
															d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
														/>
														<path
															d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
														/>
													</g>
												</svg>
											</button>
										</TableCell>
										<TableCell align="left">
											<button
												className="delete"
												onClick={() => deleteAll(deleteLinks, documentId)}
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
						<TableRow>
							{!isLastPage && <LoadMore {...configLoadMore} />}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default MenageProducts;
