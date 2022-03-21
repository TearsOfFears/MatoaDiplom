import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCurrentProduct,
	addProductStart,
	fetchProductsStart,
	updateContentMainProduct,
} from "../../redux/Products/products.actions";
import { storage } from "./../../firebase/utils";
import {
	getStorage,
	ref,
	uploadString,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";
import { FormInput, FormSelect, Buttons } from "./../../components";
import { CKEditor } from "ckeditor4-react";
import Compress from "react-image-file-resizer";

const mapState = ({ productsData }) => ({
	product: productsData.product,
});

const Modal = ({ toggleModal, hideModal, setHideModal }) => {
	const dispatch = useDispatch();
	const { product } = useSelector(mapState);
	const [productCategory, setProductCategory] = useState("watches");
	const [productName, setProductName] = useState("");
	const [productThumbnail, setProductThumbnail] = useState([]);
	// const [productThumbnail2, setProductThumbnail2] = useState("");
	// const [productThumbnail3, setProductThumbnail3] = useState("");
	// const [productThumbnail4, setProductThumbnail4] = useState("");
	const [price, setPrice] = useState(0);
	const [productDesc, setProductDesc] = useState([]);

	const deleteImage = async (deleteLinks) => {
		console.log("deleteLinks", deleteLinks);
		for (let i = 0; i < deleteLinks.length; i++) {
			if (typeof deleteLinks[i] === "string") {
				const ref = storage.refFromURL(deleteLinks[i]);
				await ref.delete();
			}
		}
	};
	const resizeFile = (file) =>
		new Promise((resolve) => {
			Compress.imageFileResizer(
				file,
				800,
				800,
				"WEBP",
				80,
				0,
				(uri) => {
					resolve(uri);
				},
				"base64"
			);
		});

	let arrOfLinks = [];
	const onHandleFiles = async (files, key) => {
		try {
			const storage = getStorage();
			const file = files[0];
			const uri = await resizeFile(file);
			const fileName = `thumb_${file.name}`;
			const thumbRef = ref(storage, `products/${productName}/${fileName}`);
			const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");

			const linkPut = String(await getDownloadURL(thumbSnapshot.ref));
			arrOfLinks[key] = linkPut;
		} catch (err) {
			console.log(err);
		}

		for (let i = 0; i < arrOfLinks.length; i++) {
			if (
				arrOfLinks.length === 4 &&
				typeof arrOfLinks[i] === "string" &&
				!arrOfLinks.includes(undefined)
			) {
				setProductThumbnail(arrOfLinks);
			}
		}
	};

	const onHandleFileEdit = async (files, key) => {
		try {
			const storage = getStorage();
			const file = files[0];
			const uri = await resizeFile(file);
			const fileName = `thumb_${file.name}`;
			const thumbRef = ref(storage, `products/${productName}/${fileName}`);
			const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");
			const linkPut = String(await getDownloadURL(thumbSnapshot.ref));
			arrOfLinks[key] = linkPut;
		} catch (err) {
			console.log(err);
		}

		// const file = files[0];
		// const storageRef = storage.ref();
		// const fileRef = storageRef.child(`products/${productName}/${file.name}`);
		// await fileRef.put(file);
		// const link = String(await fileRef.getDownloadURL());
		// arrOfLinks[key] = link;

		for (let i = 0; i < arrOfLinks.length; i++) {
			if (
				arrOfLinks.length === 4 &&
				typeof arrOfLinks[i] === "string" &&
				!arrOfLinks.includes(undefined)
			) {
				console.log(arrOfLinks);
				if (arrOfLinks[0] !== product.productThumbnail[0]) {
					deleteImage(product.productThumbnail);
					setProductThumbnail(arrOfLinks);
					console.log("trueone");
				}
			}
		}
		//console.log(product.productThumbnail);
	};

	const setEditValue = () => {
		if (typeof product === "object" && Object.keys(product).length > 0) {
			setProductCategory(product.productCategory);
			setProductName(product.productName);
			setPrice(product.price);
			setProductThumbnail(product.productThumbnail);
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
		setProductThumbnail([]);
		// setProductThumbnail2("");
		// setProductThumbnail3("");
		// setProductThumbnail4("");
		setPrice(0);
		setProductDesc([]);
	};

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
		dispatch(setCurrentProduct({}));
		setHideModal(!hideModal);
	};
	const handleSubmitEdit = (e) => {
		e.preventDefault();
		const id = product.documentID;
		const updateData = {
			productCategory,
			productName,
			productThumbnail,
			price,
			productDesc,
		};
		dispatch(updateContentMainProduct({ updateData, id }));
		resetForm();
		dispatch(setCurrentProduct({}));
		dispatch(fetchProductsStart());
		setHideModal(!hideModal);
	};

	const arrLabel = [
		"Головне зображення",
		"Зображення каруселі 1",
		"Зображення каруселі 2",
		"Зображення каруселі 3",
	];
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
								disabled
								handleChange={(e) => setProductName(e.target.value)}
							/>
							{arrLabel.map((label, key) => {
								return (
									<FormInput
										key={key}
										Label={label}
										type="file"
										handleChange={(e) => onHandleFileEdit(e.target.files, key)}
									/>
								);
							})}

							{/* <FormInput
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
							/> */}
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
							{arrLabel.map((label, key) => {
								return (
									<FormInput
										key={key}
										Label={label}
										type="file"
										handleChange={(e) => onHandleFiles(e.target.files, key)}
									/>
								);
							})}
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
