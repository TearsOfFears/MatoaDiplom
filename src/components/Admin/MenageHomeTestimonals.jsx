import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";

import {
	addHomeContentTestimonalsStart,
} from "../../redux/Home/home.actions";
import {
	FormInput,
	Buttons,
} from "./../../components";
import { storage } from "./../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";
const mapState = ({ contentHome }) => ({ content: contentHome.contentProduct });

function MenageHomeTestimonals() {

  const { content } = useSelector(mapState);
	const dispatch = useDispatch();

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
	return (
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
	);
}

export default MenageHomeTestimonals;
