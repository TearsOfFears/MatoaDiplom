import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import {
	addHomeContentStart,
	editContent,
	fetchHomeContentStart,
	setEditContent,
	updateContentProduct,
} from "../../redux/Home/home.actions";
import { FormInput, Buttons } from "./../../components";
import { storage } from "./../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";

const mapState = ({ contentHome }) => ({ content: contentHome.contentEdit });

const MenageHomeProducts = (props) => {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();
	const [activeEdit, setActiveEdit] = useState(true);
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

	const setEditValueProduct = () => {
		if (
			typeof props.contentEdit === "object" &&
			Object.keys(content).length > 0
		) {
			setTitle(props.contentEdit.title);
			setDescText(props.contentEdit.descText);
			setLinkDiscover(props.contentEdit.linkDiscover);
			setlinkDetail(props.contentEdit.linkDetail);
			setSliderThumbnail(props.contentEdit.sliderThumbnail);
			console.log("yes");
		} else {
			resetForm();
			setActiveEdit(false);
			dispatch(editContent());
		}
	};
	useEffect(()=>{
		setEditValueProduct()
	},[])
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
		dispatch(editContent());
		//setHideModal(true);
	};

	const handleEditContent = (documentId) => {
		dispatch(editContent(documentId));
	};

	const handleSubmitEdit = (e) => {
		const temp = props.contentEdit.documentID;
		e.preventDefault();
		dispatch(
			updateContentProduct(
				{
					title,
					descText,
					linkDiscover,
					linkDetail,
					sliderThumbnail,
				},
				{ temp }
			)
		);
		dispatch(setEditContent({}));
		dispatch(fetchHomeContentStart());
		resetForm();
	};
	return (
		<div>
			{Object.keys(content).length > 0 ? (
				<form onSubmit={handleSubmitEdit}>
					<FormInput
						Label="Заголовок"
						type="text"
						value={title}
						handleChange={(e) => setTitle(e.target.value)}
					/>
					<FormInput
						Label="Посилання переглянути"
						type="text"
						value={linkDiscover}
						handleChange={(e) => setLinkDiscover(e.target.value)}
					/>
					<FormInput
						Label="Посилання на продукт"
						type="text"
						value={linkDetail}
						handleChange={(e) => setlinkDetail(e.target.value)}
					/>
					<FormInput
						Label="Зображення слайдера"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<CKEditor onChange={(evt) => setDescText(evt.editor.getData())} />
					<Buttons type="submit" style="btn-read">
						Редагувати слайдер
					</Buttons>
				</form>
			) : (
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
			)}
		</div>
	);
};

export default MenageHomeProducts;
