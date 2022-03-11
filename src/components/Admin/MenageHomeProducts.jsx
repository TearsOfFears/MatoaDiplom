import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import {
	addHomeContentStart,
} from "../../redux/Home/home.actions";
import {
	FormInput,
	Buttons,
} from "./../../components";
import { storage } from "./../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";

const mapState = ({ contentHome }) => ({ content: contentHome.contentProduct });

const  MenageHomeProducts = ({setHideModal}) => {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [descText, setDescText] = useState([]);
	const [linkDiscover, setLinkDiscover] = useState("");
	const [linkDetail, setlinkDetail] = useState("");
	const [sliderThumbnail, setSliderThumbnail] = useState("");

	const onHandleFile = async (files) => {
		const file = files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(`home/topSlider/${file.name}`);
		await fileRef.put(file);
		setSliderThumbnail(await fileRef.getDownloadURL());
	};

	const resetForm = () => {
		setTitle("");
		setDescText([]);
		setLinkDiscover("");
		setlinkDetail("");
		setSliderThumbnail("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addHomeContentStart({
				title,
				descText,
				linkDiscover,
				linkDetail,
				sliderThumbnail,
			})
		);
		resetForm();
		//setHideModal(true);
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormInput
				Label="Заголовок"
				type="text"
				handleChange={(e) => setTitle(e.target.value)}
			/>
			<FormInput
				Label="Посилання переглянути"
				type="text"
				handleChange={(e) => setLinkDiscover(e.target.value)}
			/>
			<FormInput
				Label="Посилання на продукт"
				type="text"
				handleChange={(e) => setlinkDetail(e.target.value)}
			/>
			<FormInput
				Label="Зображення слайдера"
				type="file"
				handleChange={(e) => onHandleFile(e.target.files)}
			/>
			<CKEditor onChange={(evt) => setDescText(evt.editor.getData())} />
			<Buttons type="submit" style="btn-read">
				Добавити новий слайдер
			</Buttons>
		</form>
	);
}

export default MenageHomeProducts;
