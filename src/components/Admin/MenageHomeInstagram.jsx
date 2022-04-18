import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import {
    addHomeContentInstagramStart,
	addHomeContentStart,
	editContent,
	fetchHomeContentStart,
	setEditContent,
	updateContentInstagram,
	updateContentProduct,
} from "../../redux/Home/home.actions";
import { FormInput, Buttons } from "./../../components";
import { storage } from "./../../firebase/utils";
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

const MenageHomeInstagram = (props) => {
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
			console.log(linkPut);
			if (linkPut !== props.contentEdit.sliderThumbnail) {
				console.log(true);
				deleteImage(props.contentEdit.sliderThumbnail);
				setSliderThumbnail(linkPut);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const resetForm = () => {
		setSliderThumbnail("");
	};

	const setEditValueProduct = () => {
		if (
			typeof props.contentEdit === "object" &&
			Object.keys(content).length > 0
		) {
			setSliderThumbnail(props.contentEdit.sliderThumbnail);
		} else {
			resetForm();
		}
	};
	useEffect(() => {
		setEditValueProduct();
	}, [content]);
    console.log(sliderThumbnail);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addHomeContentInstagramStart({
				sliderThumbnail,
			})
		);
		resetForm();
		dispatch(setEditContent({ some: 1 }, { some: 1 }, { some: 1 }));
		//setHideModal(true);
	};

	const handleSubmitEdit = (e) => {
		const id = props.contentEdit.documentID;
		e.preventDefault();
		const editData = {
			sliderThumbnail,
		};
		dispatch(updateContentInstagram({ editData, id }));
		dispatch(setEditContent({ some: 1 }, { some: 1 }));
		dispatch(fetchHomeContentStart());
		resetForm();
	};
	return (
		<div>
			{typeof content !== "undefined" && Object.keys(content).length > 0 ? (
				<form onSubmit={handleSubmitEdit}>
					<FormInput
						Label="Зображення слайдера"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<Buttons type="submit" style="btn-read">
						Редагувати слайдер
					</Buttons>
				</form>
			) : (
				<form onSubmit={handleSubmit}>
					<FormInput
						Label="Зображення слайдера"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<Buttons type="submit" style="btn-read">
						Добавити новий слайдер
					</Buttons>
				</form>
			)}
		</div>
	);
};

export default MenageHomeInstagram;
