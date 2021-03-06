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
	const [availability, setAvailability] = useState("inStock");
	const [series, setSeries] = useState("");
	const [productName, setProductName] = useState("");
	const [productThumbnail, setProductThumbnail] = useState([]);

	const [discount, setDiscount] = useState("no");
	const [discountPersentage, setDiscountPersentage] = useState(0);

	const [price, setPrice] = useState(0);
	const [productDesc, setProductDesc] = useState([]);

	const deleteImage = async (deleteLinks) => {
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
			//console.log(err);
		}

		for (let i = 0; i < arrOfLinks.length; i++) {
			if (
				arrOfLinks.length === 4 &&
				typeof arrOfLinks[i] === "string" &&
				!arrOfLinks.includes(undefined)
			) {
				if (arrOfLinks[0] !== product.productThumbnail[0]) {
					deleteImage(product.productThumbnail);
					setProductThumbnail(arrOfLinks);
				}
			}
		}
		//console.log(product.productThumbnail);
	};

	const setEditValue = () => {
		if (typeof product === "object" && Object.keys(product).length > 0) {
			setProductCategory(product.productCategory);
			setAvailability(product.availability);
			setProductName(product.productName);
			setDiscount(product.discount);
			setSeries(product.series);
			setDiscountPersentage(product.discountPersentage);
			setPrice(product.price);
			setProductThumbnail(product.productThumbnail);
			setProductDesc(product.productDesc);
		} else {
			resetForm();
		}
	};

	useEffect(() => {
		setEditValue();
		new Promise((resolve, reject) => {
			resolve(setProductDesc(product.productDesc));
		});
	}, [product]);

	const resetForm = () => {
		setProductCategory("watches");
		setAvailability("inStock");
		setProductName("");
		setDiscount(false);
		setDiscountPersentage(0);
		setProductThumbnail([]);
		setPrice(0);
		setProductDesc([]);
	};
	const packageType=	{
		label: "???????????????? (0???)",
		price: 0,
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		
		dispatch(
			addProductStart({
				productCategory,
				availability,
				productName,
				productThumbnail,
				discount,
				discountPersentage,
				packageType,
				price,
				productDesc,
				series,
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
			availability,
			productName,
			productThumbnail,
			discount,
			discountPersentage,
			series,
			packageType,
			price:
				discount==="yes"
					? price - (price * discountPersentage) / 100
					: price,
			productDesc,
		};
		dispatch(updateContentMainProduct({ updateData, id }));
		dispatch(setCurrentProduct({}));
		dispatch(fetchProductsStart());
		resetForm();

		setHideModal(!hideModal);
	};

	const arrLabel = [
		"?????????????? ????????????????????",
		"???????????????????? ???????????????? 1",
		"???????????????????? ???????????????? 2",
		"???????????????????? ???????????????? 3",
	];
	if (!hideModal) return null;

	const setVal = (e) => {
		const { value } = e.target;
		setDiscount(value);
		setAvailability("inStock");
		if (value === "no") setDiscountPersentage(0);
	};

	const setDiscountVal = (e) => {
		const { value } = e.target;
		setDiscountPersentage(value);
	};

	return [
		<div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
		<div className="modalWrap" key={2}>
			<div className="modal">
				<div className="addNewProductForm">
					{typeof product !== "undefined" &&
					Object.keys(product).length > 0 &&
					Object.keys(product).length !== 1 ? (
						<form onSubmit={handleSubmitEdit}>
							<h2>???????????????????? ??????????????</h2>
							<FormSelect
								label="??????????????????"
								options={[
									{
										value: "watches",
										name: "??????????????????",
									},
									{
										value: "glasses",
										name: "??????????????",
									},
								]}
								value={productCategory}
								handleChange={(e) => setProductCategory(e.target.value)}
							/>
							<FormSelect
								label="????????????????"
								options={[
									{
										value: "",
										name: "?????? ????????????????",
									},
									{
										value: "maple",
										name: "?????????????? ????????????????",
									},
									{
										value: "ebony",
										name: "?????????? ????????????????",
									},
									{
										value: "skeleton",
										name: "???????????????? ????????????????",
									},
								]}
								value={series}
								handleChange={(e) => setSeries(e.target.value)}
							/>
							<FormSelect
								label="??????????????????"
								options={[
									{
										value: "inStock",
										name: "?? ?? ????????????????",
									},
									{
										value: "availableSoon",
										name: "?????????? ????????",
									},
									{
										value: "outOfStock",
										name: "?????????? ?? ??????????????????",
									},
								]}
								value={availability}
								handleChange={(e) => setAvailability(e.target.value)}
							/>
							<FormSelect
								label="????????????"
								options={[
									{
										value: "yes",
										name: "???? ????????????",
									},
									{
										value: "no",
										name: "?????? ????????????",
									},
								]}
								value={discount}
								handleChange={(e) => setVal(e)}
							/>
							<FormInput
								Label="????????"
								type="number"
								min="0.00"
								max="10000.00"
								step="0.01"
								value={price}
								handleChange={(e) => setPrice(e.target.value)}
							/>
							{discount==="yes" && (
								<FormInput
									Label="?????????????? ????????????"
									type="number"
									min="0.00"
									max="10000.00"
									step="0.01"
									value={discountPersentage}
									handleChange={(e) => setDiscountVal(e)}
								/>
							)}

							<FormInput
								Label="??????????"
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
							{productDesc && (
								<CKEditor
									data={productDesc}
									initData={productDesc}
									onChange={(evt) => setProductDesc(evt.editor.getData())}
								/>
							)}

							<Buttons type="submit" style="btn-read">
								???????????????????? ??????????????
							</Buttons>
						</form>
					) : (
						<form onSubmit={handleSubmit}>
							<h2>???????????????? ?????????? ??????????????</h2>
							<FormSelect
								label="??????????????????"
								options={[
									{
										value: "watches",
										name: "??????????????????",
									},
									{
										value: "glasses",
										name: "??????????????",
									},
								]}
								value={productCategory}
								handleChange={(e) => setProductCategory(e.target.value)}
							/>
							<FormSelect
								label="????????????????"
								options={[
									{
										value: "",
										name: "?????? ????????????????",
									},
									{
										value: "maple",
										name: "?????????????? ????????????????",
									},
									{
										value: "Ebony",
										name: "?????????? ????????????????",
									},
									{
										value: "Skeleton",
										name: "???????????????? ????????????????",
									},
								]}
								value={series}
								handleChange={(e) => setSeries(e.target.value)}
							/>
							<FormSelect
								label="??????????????????"
								options={[
									{
										value: "inStock",
										name: "?? ?? ????????????????",
									},
									{
										value: "availableSoon",
										name: "?????????? ????????",
									},
									{
										value: "outOfStock",
										name: "?????????? ?? ??????????????????",
									},
								]}
								value={availability}
								handleChange={(e) => setAvailability(e.target.value)}
							/>
							<FormSelect
								label="????????????"
								options={[
									{
										value: "yes",
										name: "???? ????????????",
									},
									{
										value: "no",
										name: "?????? ????????????",
									},
								]}
								value={discount}
								handleChange={(e) => setVal(e)}
							/>
							<FormInput
								Label="????????"
								type="number"
								min="0.00"
								max="10000.00"
								step="0.01"
								value={price}
								handleChange={(e) => setPrice(e.target.value)}
							/>
							{discount === "yes" && (
								<FormInput
									Label="?????????????? ????????????"
									type="number"
									min="0.00"
									max="10000.00"
									step="0.01"
									value={discountPersentage}
									handleChange={(e) => setDiscountVal(e)}
								/>
							)}

							<FormInput
								Label="??????????"
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

							<CKEditor
								onChange={(evt) => setProductDesc(evt.editor.getData())}
							/>
							<Buttons type="submit" style="btn-read">
								???????????????? ?????????? ??????????????
							</Buttons>
						</form>
					)}
				</div>
			</div>
		</div>,
	];
};

export default Modal;
