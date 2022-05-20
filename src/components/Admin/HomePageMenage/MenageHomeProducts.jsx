import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import {
	addHomeContentStart,
	editContent,
	fetchHomeContentStart,
	setEditContent,
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

const MenageHomeProducts = (props) => {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const [activeEdit, setActiveEdit] = useState(true);
	const [title, setTitle] = useState("");
	const [descText, setDescText] = useState([]);
	const [linkDiscover, setLinkDiscover] = useState("");
	const [linkDetail, setlinkDetail] = useState("");
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
			const thumbRef = ref(storage, `home/topSlider/${fileName}`);
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
		} else {
			resetForm();
			setActiveEdit(false);
		}
	};
	useEffect(() => {
		setEditValueProduct();
		new Promise((resolve, reject) => {
			resolve()
			setEdit(false)
			}).then(() => {
				setDescText(props.contentEdit.descText);
				setEdit(true);
			});
	}, [content]);
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
		dispatch(setEditContent({ some: 1 }, { some: 1 }, { some: 1 }));
		//setHideModal(true);
	};

	const handleSubmitEdit = (e) => {
		const id = props.contentEdit.documentID;
		e.preventDefault();
		const editData = {
			title,
			descText,
			linkDiscover,
			linkDetail,
			sliderThumbnail,
		};
		dispatch(updateContentProduct({ editData, id }));
		dispatch(setEditContent({ some: 1 }, { some: 1 }));
		dispatch(fetchHomeContentStart());
		resetForm();
	};
	return (
		<div>
			{typeof content !== "undefined" && Object.keys(content).length > 0 ? (
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
					{edit && (
									<CKEditor
									data={descText}
									initData={descText}
									onChange={(evt) => setDescText(evt.editor.getData())}
								/>
							)}
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
