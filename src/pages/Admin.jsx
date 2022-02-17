import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductStart,
	fetchProductsStart,
	deleteProductsStart,
} from "../redux/Products/products.actions";
import {
	FormInput,
	ButtonForm,
	Modal,
	FormSelect,
	Buttons,
} from "../components";

const mapState = ({ productsData }) => ({ products: productsData.products });

const Admin = (props) => {
	const { products } = useSelector(mapState);
	const dispath = useDispatch();
	const [hideModal, setHideModal] = useState(true);

	const [productCategory, setProductCategory] = useState("Годинники");
	const [productName, setProductName] = useState("");
	const [productThumbnail, setProductThumbnail] = useState("");
	const [price, setPrice] = useState(0);

	const toggleModal = () => setHideModal(!hideModal);

	const configModal = {
		hideModal,
		toggleModal,
	};
	const resetForm = () => {
		setProductCategory("Годинники");
		setProductName("");
		setProductThumbnail("");
		setPrice(0);
	};
	useEffect(() => {
		dispath(fetchProductsStart());
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispath(
			addProductStart({ productCategory, productName, productThumbnail, price })
		);
		resetForm();
		setHideModal(true);
	};

	return (
		<div className="Admin">
			<div className="callToActions">
				<ButtonForm onClick={() => toggleModal()}>Додати продукцію</ButtonForm>

				<Modal {...configModal}>
					<div className="addNewProductForm">
						<form onSubmit={handleSubmit}>
							<h2>Добавити новий продукт</h2>
							<FormSelect
								label="Категорія"
								options={[
									{
										value: "Годинники",
										name: "Годинники",
									},
									{
										value: "Окуляри",
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
							<Buttons type="submit" style="btn-read">
								Добавити новий продукт
							</Buttons>
						</form>
					</div>
				</Modal>

				<div className="menageProducts">
					<table>
						<tbody>
							<tr>
								<th>
									<h1>Menage Products</h1>
								</th>
							</tr>
							<tr>
								<td>
									<table>
										<tbody>
											{products.map((product, index) => {
												const {
													productName,
													productThumbnail,
													price,
													documentId,
												} = product;
												return (
													<tr>
														<td>
															<img src={productThumbnail} />
														</td>
														<td>{productName}</td>
														<td>{price} Грн.</td>
														<td>
															<Buttons
																onClick={() =>
																	dispath(deleteProductsStart(documentId))
																}
															>
																Delete
															</Buttons>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Admin;
