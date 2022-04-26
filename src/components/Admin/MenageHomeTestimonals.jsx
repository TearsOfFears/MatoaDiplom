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
const mapState = ({ contentHome }) => ({ content: contentHome.contentEdit });

const MenageHomeTestimonals = (props) => {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();
	const [activeEdit, setActiveEdit] = useState(true);
	const [activeAdd, setActiveAdd] = useState(false);

	const [titleTestimonals, setTitleTestimonals] = useState("");
	const [descTextTestimonals, setDescTextTestimonals] = useState([]);
	const [textAuthor, setTextAuthor] = useState("");
	const [jobPosition, setJobPosition] = useState("");
	const [testimonalsThumbnail, setTestimonalsThumbnail] = useState("");

	const [hideModal, setHideModal] = useState(true);

	const toggleModal = () => {
		setHideModal(!hideModal);
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
	const deleteImage = async (link) => {
		if (typeof link === "string") {
			const ref = storage.refFromURL(link);
			await ref.delete();
		}
	};
	const onHandleFileTestimonals = async (files) => {
		try {
			const storage = getStorage();
			const file = files[0];
			const uri = await resizeFile(file);
			const fileName = `thumb_${file.name}`;
			const thumbRef = ref(storage, `home/testimonals/${fileName}`);
			const thumbSnapshot = await uploadString(thumbRef, uri, "data_url");

			const linkPut = String(await getDownloadURL(thumbSnapshot.ref));
			if (linkPut !== props.contentEdit.testimonalsThumbnail) {
				console.log(true);
				deleteImage(props.contentEdit.testimonalsThumbnail);
				setTestimonalsThumbnail(linkPut);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const resetFormTestimonals = () => {
		setTitleTestimonals("");
		setDescTextTestimonals([]);
		setTextAuthor("");
		setJobPosition("");
		setTestimonalsThumbnail("");
	};

	const setEditValue = () => {
		if (
			typeof props.contentEdit === "object" &&
			Object.keys(content).length > 0
		) {
			setTitleTestimonals(props.contentEdit.titleTestimonals);
			setDescTextTestimonals(props.contentEdit.descTextTestimonals);
			setTextAuthor(props.contentEdit.textAuthor);
			setJobPosition(props.contentEdit.jobPosition);
			setTestimonalsThumbnail(props.contentEdit.testimonalsThumbnail);
		} else {
			resetFormTestimonals();
			setActiveEdit(false);
		}
	};
	useEffect(() => {
		setEditValue();
	}, [content]);
	const handleSubmitTestimonals = (e) => {
		e.preventDefault();
		dispatch(
			addHomeContentTestimonalsStart({
				titleTestimonals,
				descTextTestimonals,
				textAuthor,
				jobPosition,
				testimonalsThumbnail,
			})
		);
		//dispatch(setEditContent({ some: 1 }, { some: 1 }, { some: 1 }));
		resetFormTestimonals();
		//setHideModal(true);
	};

	const handleEditContent = (documentId) => {
		dispatch(editContent(documentId));
	};

	const handleSubmitTestimonalsEdit = (e) => {
		const id = props.contentEdit.documentID;
		const editData = {
			titleTestimonals,
			descTextTestimonals,
			textAuthor,
			jobPosition,
			testimonalsThumbnail,
		};
		e.preventDefault();
		dispatch(updateContent({ editData, id }));
		dispatch(setEditContent({ some: 1 }));
		dispatch(fetchHomeContentTestimonalsStart());
		resetFormTestimonals();
	};
	return (
		<div>
			{typeof content !== "undefined" && Object.keys(content).length > 0 ? (
				<form onSubmit={handleSubmitTestimonalsEdit}>
					<FormInput
						Label="Заголовок"
						type="text"
						value={titleTestimonals}
						handleChange={(e) => setTitleTestimonals(e.target.value)}
					/>
					<FormInput
						Label="Автор"
						type="text"
						value={textAuthor}
						handleChange={(e) => setTextAuthor(e.target.value)}
					/>
					<FormInput
						Label="Посада"
						type="text"
						value={jobPosition}
						handleChange={(e) => setJobPosition(e.target.value)}
					/>
					<FormInput
						Label="Зображення"
						type="file"
						handleChange={(e) => onHandleFileTestimonals(e.target.files)}
					/>
					<CKEditor
						onChange={(evt) => setDescTextTestimonals(evt.editor.getData())}
					/>
					<Buttons type="submit" style="btn-read">
						Редагувати слайдер
					</Buttons>
				</form>
			) : (
				<form onSubmit={handleSubmitTestimonals}>
					<FormInput
						Label="Заголовок"
						type="text"
						handleChange={(e) => setTitleTestimonals(e.target.value)}
					/>
					<FormInput
						Label="Автор"
						type="text"
						handleChange={(e) => setTextAuthor(e.target.value)}
					/>
					<FormInput
						Label="Посада"
						type="text"
						handleChange={(e) => setJobPosition(e.target.value)}
					/>
					<FormInput
						Label="Зображення"
						type="file"
						handleChange={(e) => onHandleFileTestimonals(e.target.files)}
					/>
					<CKEditor
						onChange={(evt) => setDescTextTestimonals(evt.editor.getData())}
					/>
					<Buttons type="submit" style="btn-read">
						Добавити новий слайдер
					</Buttons>
				</form>
			)}
		</div>
	);
};

export default MenageHomeTestimonals;
