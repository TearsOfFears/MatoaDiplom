import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import {
	addHomeContentInstagramStart,
	addHomeContentStart,
	addImage,
	editContent,
	fetchHomeContentStart,
	fetchImages,
	setEditContent,
	updateContentInstagram,
	updateContentProduct,
} from "./../../../redux/Home/home.actions";
import { FormInput, Buttons } from "./../../../components";
import { storage } from "./../../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
import Compress from "react-image-file-resizer";
import {
	getStorage,
	ref,
	uploadString,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";

function MenageHomeImages() {
	const dispatch = useDispatch();
	const [image, setImage] = useState("");

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

	const onHandleFile = async (files) => {
		try {
			const storage = getStorage();
			const file = files[0];
			const uri = await resizeFile(file);
			const fileName = `thumb_${file.name}`;
			const thumbRef = ref(storage, `home/images/${fileName}`);
			const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");
			const linkPut = String(await getDownloadURL(thumbSnapshot.ref));
			setImage(linkPut);
		} catch (err) {
			console.log(err);
		}
	};
	const resetForm = () => {
		setImage("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addImage({
				image,
			})
		);
		resetForm();
		dispatch(fetchImages({}));
		dispatch(
			setEditContent({ some: 1 }, { some: 1 }, { some: 1 }, { some: 1 })
		);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<FormInput
					Label="Зображення"
					type="file"
					handleChange={(e) => onHandleFile(e.target.files)}
				/>
				<Buttons type="submit" style="btn-read">
					Добавити нове зображення
				</Buttons>
			</form>
		</div>
	);
}

export default MenageHomeImages;
