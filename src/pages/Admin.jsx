import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductStart,
	fetchProductsStart,
	deleteProductsStart,
	getProductDesc
} from "../redux/Products/products.actions";
import {
	FormInput,
	ButtonForm,
	Modal,
	FormSelect,
	Buttons,
} from "../components";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import moment from "moment";
import "./../components/Admin/Admin.scss"
import { LoadMore } from "../components";
import { CKEditor } from "ckeditor4-react";
const mapState = ({ productsData }) => ({ products: productsData.products });

const Admin = (configModal) => {
	const { products } = useSelector(mapState);
	const dispatch = useDispatch();
	const { hideModal, toggleModal, setHideModal } = configModal;
	const [productCategory, setProductCategory] = useState("watches");
	const [productName, setProductName] = useState("");
	const [productThumbnail, setProductThumbnail] = useState("");
	const [price, setPrice] = useState(0);
	const [productDesc, setProductDesc] = useState([]);

	const [isReadMore, setIsReadMore] = useState(true);


	const toggleReadMore = (data) => {
		setIsReadMore(!isReadMore);
	};

	const resetForm = () => {
		setProductCategory("watches");
		setProductName("");
		setProductThumbnail("");
		setPrice(0);
		setProductDesc([]);
	};
	useEffect(() => {
		dispatch(fetchProductsStart());
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addProductStart({
				productCategory,
				productName,
				productThumbnail,
				price,
				productDesc,
			})
		);
		resetForm();
		setHideModal(true);
	};
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

	const colums = [
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
			lable: "Видалити продукт",
		},
	];

	const styles = {
		fontSize: "16px",
		cursor: "cursor",
		width: "15%",
	};

	return (
		<div className="Admin">
			<div className="callToActions">
				<Modal {...configModal}>
					<div className="addNewProductForm">
						<form onSubmit={handleSubmit}>
							<h2>Добавити новий продукт</h2>
							<FormSelect
								label="Категорія"
								options={[
									{
										value: "watches",
										name: "Годинники",
									},
									{
										value: "glasses",
										name: "Окуляри",
									},
								]}
								value={productCategory}
								handleChange={(e) => setProductCategory(e.target.value)}
							/>
							<FormInput
								Label="Назва"
								type="text"
								handleChange={(e) => setProductName(e.target.value)}
							/>
							<FormInput
								Label="Головна сторінка Посилання"
								type="url"
								handleChange={(e) => setProductThumbnail(e.target.value)}
							/>
							<FormInput
								Label="Ціна"
								type="number"
								min="0.00"
								max="10000.00"
								step="0.01"
								handleChange={(e) => setPrice(e.target.value)}
							/>
							<CKEditor
								onChange={(evt) => setProductDesc(evt.editor.getData())}
							/>
							<Buttons type="submit" style="btn-read">
								Добавити новий продукт
							</Buttons>
						</form>
					</div>
				</Modal>

				<div className="menageProducts">
					<th>
						<h1>Menage Products</h1>
					</th>
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
									data.map((data, pos) => (
										<TableRow key={data.productName} style={styles}>
											<TableCell component="th" scope="row">
												{data.productName}
											</TableCell>
											<TableCell align="left">
												<img
													src={data.productThumbnail}
													alt={data.productThumbnail}
												/>
											</TableCell>
											<TableCell align="left">{data.documentId}</TableCell>
											<TableCell align="left">
								
												{typeof data.productDesc === 'string' && isReadMore ? data.productDesc.slice(0, 10) : data.productDesc}
												
												<span onClick={()=>dispatch(getProductDesc(data.documentId))} className="read-or-hide">
													{isReadMore ? "...read more" : " show less"}
												</span>						
											</TableCell>
											<TableCell align="left">{data.price} грн.</TableCell>
											<TableCell align="left">
												<button
													className="delete"
													onClick={() =>
														dispatch(deleteProductsStart(data.documentId))
													}
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
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</div>
	);
};

export default Admin;
