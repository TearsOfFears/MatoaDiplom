import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";

import {
	addHomeContentTestimonalsStart,
	fetchHomeContentTestimonalsStart,
	updateContent,
} from "../../redux/Home/home.actions";
import { FormInput, Buttons } from "./../../components";
import { storage } from "./../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
const mapState = ({ contentHome }) => ({ content: contentHome.contentEdit });

const MenageHomeTestimonals = (props) => {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();
	const [activeFunc, setActiveFunc] = useState(false);
	const [titleTestimonals, setTitleTestimonals] = useState("");
	const [descTextTestimonals, setDescTextTestimonals] = useState([]);
	const [textAuthor, setTextAuthor] = useState("");
	const [jobPosition, setJobPosition] = useState("");
	const [testimonalsThumbnail, setTestimonalsThumbnail] = useState("");

	const onHandleFileTestimonals = async (files) => {
		const file = files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(`home/testimonals/${file.name}`);
		await fileRef.put(file);
		setTestimonalsThumbnail(await fileRef.getDownloadURL());
	};

	const resetFormTestimonals = () => {
		setTitleTestimonals("");
		setDescTextTestimonals([]);
		setTextAuthor("");
		setJobPosition("");
		setTestimonalsThumbnail("");
	};
	useEffect(() => {
		setEditValue();
	}, []);

	const setEditValue = () => {
		if (typeof props.contentEdit === "object") {
			setTitleTestimonals(props.contentEdit.titleTestimonals);
			setDescTextTestimonals(props.contentEdit.descTextTestimonals);
			setTextAuthor(props.contentEdit.textAuthor);
			setJobPosition(props.contentEdit.jobPosition);
			setTestimonalsThumbnail(props.contentEdit.testimonalsThumbnail);
			setActiveFunc(true);
		} else {
			resetFormTestimonals();
			setActiveFunc(false);
		}
	};
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
		resetFormTestimonals();
		//setHideModal(true);
	};

	const handleSubmitTestimonalsEdit = (e) => {
		e.preventDefault();
		dispatch(
			updateContent({
				titleTestimonals,
				descTextTestimonals,
				textAuthor,
				jobPosition,
				testimonalsThumbnail,
			})
		);
		dispatch(fetchHomeContentTestimonalsStart());
		resetFormTestimonals();
		//setHideModal(true);
		console.log("testiminalEDIT");
	};
	//handleSubmitTestimonalsEdit
	return (
		<div>
			{activeFunc ? (
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
						data={descTextTestimonals}
						onChange={(evt) => setDescTextTestimonals(evt.editor.getData())}
					/>
					<Buttons type="submit" style="btn-read">
						Добавити новий слайдер
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
