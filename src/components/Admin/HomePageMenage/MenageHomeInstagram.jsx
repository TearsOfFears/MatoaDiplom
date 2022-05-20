import React, { useState, useEffect } from "react";

import {
	addHomeContentInstagramStart,
	addHomeContentStart,
	editContent,
	fetchHomeContentInstagramStart,
	fetchHomeContentStart,
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

const mapState = ({ contentHome }) => ({ content: contentHome.contentEdit });

const MenageHomeInstagram = () => {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();
	const [sliderThumbnail, setSliderThumbnail] = useState("");

	const deleteImage = async (link) => {
		if (typeof link === "string") {
			const ref = storage.refFromURL(link);
			await ref.delete();
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

	const onHandleFile = async (files) => {
		try {
			const storage = getStorage();
			const file = files[0];
			const uri = await resizeFile(file);
			const fileName = `thumb_${file.name}`;
			const thumbRef = ref(storage, `home/Instagram/${fileName}`);
			const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");
			const linkPut = String(await getDownloadURL(thumbSnapshot.ref));
            setSliderThumbnail(linkPut);
		} catch (err) {
			console.log(err);
		}
	};

	const resetForm = () => {
		setSliderThumbnail("");
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addHomeContentInstagramStart({
				sliderThumbnail,
			})
		);
		resetForm();
		dispatch(setEditContent({ some: 1 }, { some: 1 }, { some: 1 }));
		dispatch(fetchHomeContentInstagramStart({}))
		//setHideModal(true);
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
					Добавити новий слайдер
				</Buttons>
			</form>
		</div>
	);
};

export default MenageHomeInstagram;
