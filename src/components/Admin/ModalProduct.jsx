import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCurrentProduct,
	addProductStart,
	fetchProductsStart,
	updateContentMainProduct,
} from "../../redux/Products/products.actions";
import { storage } from "./../../firebase/utils";
import { FormInput, FormSelect, Buttons } from "./../../components";
import { CKEditor } from "ckeditor4-react";

const mapState = ({ productsData }) => ({
	product: productsData.product,
});

const Modal = ({ toggleModal, hideModal, setHideModal }) => {
	const dispatch = useDispatch();
	const { product } = useSelector(mapState);
	const [productCategory, setProductCategory] = useState("watches");
	const [productName, setProductName] = useState("");
	const [productThumbnail1, setProductThumbnail1] = useState("");
	const [productThumbnail2, setProductThumbnail2] = useState("");
	const [productThumbnail3, setProductThumbnail3] = useState("");
	const [productThumbnail4, setProductThumbnail4] = useState("");
	const [price, setPrice] = useState(0);
	const [productDesc, setProductDesc] = useState([]);

	let arrOfLinks = [];

	const deleteImage = async (deleteLinks) => {
		for (let i = 0; i < deleteLinks.length; i++) {
			if (typeof deleteLinks[i] === "string") {
				const ref = storage.refFromURL(deleteLinks[i]);
				await ref.delete();
			}
		}
	};

	const onHandleFile = async (files) => {
		const file = files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(`products/${productName}/${file.name}`);
		await fileRef.put(file);
		arrOfLinks.push(String([await fileRef.getDownloadURL()]));

		const tempArr = [
			product.productThumbnail1,
			product.productThumbnail2,
			product.productThumbnail3,
			product.productThumbnail4,
		];
		console.log(tempArr);
		if (arrOfLinks.length === 4) {
			console.log(arrOfLinks);
			if (
				arrOfLinks[0] !== tempArr[0] ||
				arrOfLinks[1] !== tempArr[1] ||
				arrOfLinks[2] !== tempArr[2] ||
				arrOfLinks[3] !== tempArr[3]
			) {
				deleteImage(tempArr);
				setProductThumbnail1(arrOfLinks[0]);
				setProductThumbnail2(arrOfLinks[1]);
				setProductThumbnail3(arrOfLinks[2]);
				setProductThumbnail4(arrOfLinks[3]);
			}
		}
	};

	const setEditValue = () => {
		if (typeof product === "object" && Object.keys(product).length > 0) {
			setProductCategory(product.productCategory);
			setProductName(product.productName);
			setPrice(product.price);
			setProductThumbnail1(product.productThumbnail1);
			setProductThumbnail2(product.productThumbnail2);
			setProductThumbnail3(product.productThumbnail3);
			setProductThumbnail4(product.productThumbnail4);
			setProductDesc(product.productDesc);
		} else {
			resetForm();
		}
	};

	useEffect(() => {
		setEditValue();
	}, [product]);

	//console.log(product.productThumbnail1);

	const resetForm = () => {
		setProductCategory("watches");
		setProductName("");
		setProductThumbnail1("");
		setProductThumbnail2("");
		setProductThumbnail3("");
		setProductThumbnail4("");
		setPrice(0);
		setProductDesc([]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addProductStart({
				productCategory,
				productName,
				productThumbnail1,
				productThumbnail2,
				productThumbnail3,
				productThumbnail4,
				price,
				productDesc,
			})
		);
		resetForm();
		dispatch(setCurrentProduct({}));
		setHideModal(!hideModal);
	};
	const handleSubmitEdit = (e) => {
		e.preventDefault();
		const id = product.documentID;
		dispatch(
			updateContentMainProduct(
				{
					productCategory,
					productName,
					productThumbnail1,
					productThumbnail2,
					productThumbnail3,
					productThumbnail4,
					price,
					productDesc,
				},
				{ id }
			)
		);
		resetForm();
		dispatch(setCurrentProduct({}));
		dispatch(fetchProductsStart());
		setHideModal(!hideModal);
	};
	if (!hideModal) return null;
	return [
		<div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
		<div className="modalWrap" key={2}>
			<div className="modal">
				<div className="addNewProductForm">
					{typeof product !== "undefined" &&
					Object.keys(product).length > 0 &&
					Object.keys(product).length !== 1 ? (
						<form onSubmit={handleSubmitEdit}>
							<h2>Редагувати продукт</h2>
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
								value={productName}
								handleChange={(e) => setProductName(e.target.value)}
							/>
							<FormInput
								Label="Головне зображення"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Зображення каруселі 1"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Зображення каруселі 2"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Зображення каруселі 3"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Ціна"
								type="number"
								min="0.00"
								max="10000.00"
								step="0.01"
								value={price}
								handleChange={(e) => setPrice(e.target.value)}
							/>
							<CKEditor
								onChange={(evt) => setProductDesc(evt.editor.getData())}
							/>
							<Buttons type="submit" style="btn-read">
								Редагувати продукт
							</Buttons>
						</form>
					) : (
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
								value={productName}
								handleChange={(e) => setProductName(e.target.value)}
							/>
							<FormInput
								Label="Головне зображення"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Зображення каруселі 1"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Зображення каруселі 2"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Зображення каруселі 3"
								type="file"
								handleChange={(e) => onHandleFile(e.target.files)}
							/>
							<FormInput
								Label="Ціна"
								type="number"
								min="0.00"
								max="10000.00"
								step="0.01"
								value={price}
								handleChange={(e) => setPrice(e.target.value)}
							/>
							<CKEditor
								onChange={(evt) => setProductDesc(evt.editor.getData())}
							/>
							<Buttons type="submit" style="btn-read">
								Добавити новий продукт
							</Buttons>
						</form>
					)}
				</div>
			</div>
		</div>,
	];
};

export default Modal;
