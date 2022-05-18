import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";

import {
	addHomeContentTestimonalsStart,
	fetchHomeContentTestimonalsStart,
	updateContent,
	editContent,
	getCurrentDocumentId,
	setEditContent,
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
import {
	fetchNewsHistory,
	saveNews,
	setNewsEdit,
	updateNews,
} from "../../redux/News/news.actions";
const mapState = ({ newsData }) => ({ newsDataEdit: newsData.newsEdit });

const ModalNews = ({ toggleModal, hideModal, setHideModal }) => {
	const { newsDataEdit } = useSelector(mapState);
	const dispatch = useDispatch();

	const [titleNews, setTitleNews] = useState("");
	const [newsLink, setNewsLink] = useState("");
	const [descShort, setDescShort] = useState([]);
	const [descLong, setDescLong] = useState([]);
	const [newsThumbnail, setNewsThumbnail] = useState("");
	const [edit, setEdit] = useState(false);
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
	const deleteImage = async (link) => {
		if (typeof link === "string") {
			const ref = storage.refFromURL(link);
			await ref.delete();
		}
	};
	const onHandleFileNews = async (files) => {
		try {
			const storage = getStorage();
			const file = files[0];
			const uri = await resizeFile(file);
			const fileName = `thumb_${file.name}`;
			const thumbRef = ref(storage, `news/${fileName}`);
			const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");

			const linkPut = String(await getDownloadURL(thumbSnapshot.ref));
			if (linkPut !== newsDataEdit.newsThumbnail) {
				deleteImage(newsDataEdit.newsThumbnail);
				setNewsThumbnail(linkPut);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const resetForm = () => {
		setTitleNews("");
		setNewsLink("");
		setDescShort([]);
		setDescLong([]);
		setNewsThumbnail("");
	};

	const setEditValue = () => {
		if (
			typeof newsDataEdit === "object" &&
			Object.keys(newsDataEdit).length > 0
		) {
			setTitleNews(newsDataEdit.titleNews);
			setDescLong(newsDataEdit.descLong);
			setDescShort(newsDataEdit.descShort);
			setNewsLink(newsDataEdit.newsLink);
			setNewsThumbnail(newsDataEdit.newsThumbnail);
		} else {
			resetForm();
			// setActiveEdit(false);
		}
	};

	useEffect(() => {
		setEditValue();
		new Promise((resolve, reject) => {
			resolve();
			setEdit(false);
		}).then(() => {
			setDescLong(newsDataEdit.descLong);
			setDescShort(newsDataEdit.descShort);
			setEdit(true);
		});
	}, [newsDataEdit]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			saveNews({
				titleNews,
				newsLink,
				descShort,
				descLong,
				newsThumbnail,
			})
		);
		resetForm();
		setHideModal(!hideModal);
	};

	// const handleEditContent = (documentId) => {
	// 	dispatch(editContent(documentId));
	// };

	const handleSubmitEdit = (e) => {
		const id = newsDataEdit.documentID;
		const updateData = {
			titleNews,
			newsLink,
			descShort,
			descLong,
			newsThumbnail,
		};
		e.preventDefault();
		dispatch(updateNews({ updateData, id }));
		dispatch(setNewsEdit([]));
		setHideModal(!hideModal);
		resetForm();
		dispatch(fetchNewsHistory());
	};

	if (!hideModal) return null;
	return [
		<div
			className="modalOverlayDetails"
			onClick={() => toggleModal()}
			key={1}
		/>,
		<div className="modalWrapDetails" key={2}>
			<div className="modalDetails">
				<div className="addNewProductForm">
					{typeof newsDataEdit !== "undefined" &&
					Object.keys(newsDataEdit).length > 0 &&
					Object.keys(newsDataEdit).length !== 1 ? (
						<form onSubmit={handleSubmitEdit}>
							<h2>Редагувати новину</h2>
							<FormInput
								Label="Заголовок"
								type="text"
								value={titleNews}
								handleChange={(e) => setTitleNews(e.target.value)}
							/>
							<FormInput
								Label="Посилання"
								type="text"
								value={newsLink}
								handleChange={(e) => setNewsLink(e.target.value)}
							/>
							{edit && (
								<CKEditor
									data={descShort}
									initData={descShort}
									onChange={(evt) => setDescShort(evt.editor.getData())}
								/>
							)}
							{edit && (
								<CKEditor
									data={descLong}
									initData={descLong}
									onChange={(evt) => setDescLong(evt.editor.getData())}
								/>
							)}
							<FormInput
								Label="Зображення"
								type="file"
								handleChange={(e) => onHandleFileNews(e.target.files)}
							/>
							<Buttons type="submit" style="btn-read">
								Редагувати продукт
							</Buttons>
						</form>
					) : (
						<form onSubmit={handleSubmit}>
							<h2>Добавити нову новину </h2>
							<FormInput
								Label="Заголовок"
								type="text"
								value={titleNews}
								handleChange={(e) => setTitleNews(e.target.value)}
							/>
							<FormInput
								Label="Посилання"
								type="text"
								value={newsLink}
								handleChange={(e) => setNewsLink(e.target.value)}
							/>
							<CKEditor
								onChange={(evt) => setDescShort(evt.editor.getData())}
							/>
							<CKEditor onChange={(evt) => setDescLong(evt.editor.getData())} />
							<FormInput
								Label="Зображення"
								type="file"
								handleChange={(e) => onHandleFileNews(e.target.files)}
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

export default ModalNews;
