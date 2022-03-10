import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import {
	FormInput,
	ButtonForm,
	Modal,
	FormSelect,
	Buttons,
	LoadMore,
} from "./../../components";
import {
	addHomeContentStart,
	deleteHomeContentStart,
	fetchHomeContentStart,
	addHomeContentTestimonalsStart,
	deleteHomeContentTestimonalsStart,
	fetchHomeContentTestimonalsStart,
} from "../../redux/Home/home.actions";
import { storage } from "./../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";

const mapState = ({ contentHome }) => ({ content: contentHome.contentProduct });

const MenageHomePage = () => {
	const [hideModal, setHideModal] = useState(true);

	const toggleModal = () => {
		setHideModal(!hideModal);
	};
	const configModal = {
		hideModal,
		toggleModal,
		setHideModal,
	};

	const { content } = useSelector(mapState);
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [descText, setDescText] = useState([]);
	const [linkDiscover, setLinkDiscover] = useState("");
	const [linkDetail, setlinkDetail] = useState("");
	const [sliderThumbnail, setSliderThumbnail] = useState("");

	const [titleTestimonals, setTitleTestimonals] = useState("");
	const [descTextTestimonals, setDescTextTestimonals] = useState([]);
	const [textAuthor, setTextAuthor] = useState("");
	const [jobPosition, setJobPosition] = useState("");
	const [testimonalsThumbnail, setTestimonalsThumbnail] = useState("");

	const onHandleFile = async (files) => {
		const file = files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(`home/topSlider/${file.name}`);
		await fileRef.put(file);
		setSliderThumbnail(await fileRef.getDownloadURL());
	};
	const onHandleFileTestimonals = async (files) => {
		const file = files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(`home/testimonals/${file.name}`);
		await fileRef.put(file);
		setTestimonalsThumbnail(await fileRef.getDownloadURL());
	};

	const resetForm = () => {
		setTitle("");
		setDescText([]);
		setLinkDiscover("");
		setlinkDetail("");
		setSliderThumbnail("");
	};
	
	const resetFormTestimonals = () => {
		setTitleTestimonals("");
		setDescTextTestimonals([]);
		setTextAuthor("");
		setJobPosition("");
		setTestimonalsThumbnail("");
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
		setHideModal(true);
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
		setHideModal(true);
	};
	const colums = [
		{
			id: "number",
			lable: "#",
		},
		{
			id: "title",
			lable: "Назва продукту",
		},
		{
			id: "sliderThumbnail",
			lable: "Зображення слайдера",
		},
		{
			id: "documentId",
			lable: "ID - продукту",
		},
		{
			id: "linkDiscover",
			lable: " Посилання на інформацію",
		},
		{
			id: "linkDetail",
			lable: "Посиланян на продукт",
		},

		{
			id: "descText",
			lable: "Опис слайдера",
		},
		{
			id: "documentId",
			lable: "Видалити продукт",
		},
	];

	const styles = {
		fontSize: "16px",
		cursor: "cursor",
		width: "15%",
	};
	useEffect(() => {
		dispatch(fetchHomeContentStart());
		dispatch(fetchHomeContentTestimonalsStart());
	}, []);
	const { data, queryDoc, isLastPage } = content;

	const handleLoadMore = () => {
		dispatch(
			fetchHomeContentStart({
				startAfterDoc: queryDoc,
				persistProducts: data,
			})
		);
	};

	const handleLoadMoreTestimonals = () => {
		dispatch(
			fetchHomeContentTestimonalsStart({
				startAfterDoc: queryDoc,
				persistProducts: data,
			})
		);
	};
	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
		onLoadMoreEvtTestimonals: handleLoadMoreTestimonals,
	};

	const [active, setActive] = useState(1);

	return (
		<div className="menageProducts">
			<th className="d-flex flex-row align-items-center justify-content-between">
				<h1>Управління контентом головної сторінки</h1>
				<ButtonForm onClick={() => toggleModal()}>Додати контент</ButtonForm>
			</th>

			<Modal {...configModal}>
				<FormSelect
					options={[
						{
							value: 1,
							name: "Добавити слайд продукту",
						},
						{
							value: 2,
							name: "Добавити слайд відгуків",
						},
					]}
					value={active}
					handleChange={(e) => setActive(Number(e.target.value))}
				/>
				<div className="addNewProductForm">
					{active === 1 ? (
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
			</Modal>
			<TableContainer>
				<h1>Слайди продукції</h1>
				<Table>
					<TableHead>
						<TableRow>
							{colums.map((column, pos) => {
								const { lable } = column;
								return (
									<TableCell key={pos} style={styles}>
										{lable}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(data) &&
							data.length > 0 &&
							data.map((data, pos) => {
								const {
									title,
									descText,
									linkDiscover,
									linkDetail,
									sliderThumbnail,
									documentId,
								} = data;
								return (
									<TableRow key={title} style={styles}>
										<TableCell align="left">{pos + 1}</TableCell>
										<TableCell component="th" scope="row">
											{title}
										</TableCell>
										<TableCell align="left">
											<img src={sliderThumbnail} alt={sliderThumbnail} />
										</TableCell>
										<TableCell align="left">{documentId}</TableCell>
										<TableCell align="left">{linkDiscover}</TableCell>
										<TableCell align="left">{linkDetail}</TableCell>
										<TableCell align="left">
											{typeof descText === "string" && descText.length > 0 ? (
												<ReadMoreReact
													text={descText}
													min={5}
													ideal={10}
													max={descText.length}
													readMoreText="click "
												/>
											) : null}
										</TableCell>
										<TableCell align="left">
											<button
												className="delete"
												onClick={() =>
													dispatch(deleteHomeContentStart(documentId))
												}
											>
												<svg
													width="17"
													height="19"
													viewBox="0 0 17 19"
													fill="#d84727"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M15.6972 2.29715H12.0601L11.7033 0.870009C11.5755 0.358703 11.1161 5.13325e-06 10.589 0H5.49104C4.964 5.13325e-06 4.50459 0.358703 4.37677 0.870009L4.02002 2.29715H0.382859C0.171412 2.29715 0 2.46857 0 2.68001C0 2.89146 0.171412 3.06287 0.382859 3.06287H1.56972L2.28069 17.2866C2.31157 17.8977 2.816 18.3772 3.42781 18.3772H12.6912C13.3032 18.3772 13.8077 17.8972 13.8382 17.2859L14.5493 3.06287H15.6972C15.9087 3.06287 16.0801 2.89146 16.0801 2.68001C16.0801 2.46857 15.9087 2.29715 15.6972 2.29715ZM6.12553 13.4001C6.12553 13.6115 5.95411 13.7829 5.74267 13.7829C5.53122 13.7829 5.35981 13.6115 5.35981 13.4001V7.27433C5.35981 7.06289 5.53122 6.89147 5.74267 6.89147C5.95411 6.89147 6.12553 7.06289 6.12553 7.27433V13.4001ZM8.03973 14.5486C8.25117 14.5486 8.42259 14.3772 8.42259 14.1658V6.5086C8.42259 6.29715 8.25117 6.12574 8.03973 6.12574C7.82828 6.12574 7.65687 6.29715 7.65687 6.5086V14.1658C7.65687 14.3772 7.82828 14.5486 8.03973 14.5486ZM10.7204 13.4001C10.7204 13.6115 10.549 13.7829 10.3376 13.7829C10.1261 13.7829 9.95471 13.6115 9.95471 13.4001V7.27433C9.95471 7.06289 10.1261 6.89147 10.3376 6.89147C10.549 6.89147 10.7204 7.06289 10.7204 7.27433V13.4001ZM5.11937 1.05584L4.8091 2.29715H11.2705L10.9602 1.05584C10.9178 0.885236 10.7645 0.765524 10.5887 0.765712H5.49082C5.31503 0.765524 5.16176 0.885236 5.11937 1.05584Z"
														fill="#d84727"
													/>
												</svg>
											</button>
										</TableCell>
									</TableRow>
								);
							})}
						<TableRow>
							{!isLastPage && <LoadMore {...configLoadMore} />}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer>
				<h1>Слайди відгуків</h1>
				<Table>
					<TableHead>
						<TableRow>
							{colums.map((column, pos) => {
								const { lable } = column;
								return (
									<TableCell key={pos} style={styles}>
										{lable}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(data) &&
							data.length > 0 &&
							data.map((data, pos) => {
								const {
									title,
									descText,
									linkDiscover,
									linkDetail,
									sliderThumbnail,
									documentId,
								} = data;
								return (
									<TableRow key={title} style={styles}>
										<TableCell align="left">{pos + 1}</TableCell>
										<TableCell component="th" scope="row">
											{title}
										</TableCell>
										<TableCell align="left">
											<img src={sliderThumbnail} alt={sliderThumbnail} />
										</TableCell>
										<TableCell align="left">{documentId}</TableCell>
										<TableCell align="left">{linkDiscover}</TableCell>
										<TableCell align="left">{linkDetail}</TableCell>
										<TableCell align="left">
											{typeof descText === "string" && descText.length > 0 ? (
												<ReadMoreReact
													text={descText}
													min={5}
													ideal={10}
													max={descText.length}
													readMoreText="click "
												/>
											) : null}
										</TableCell>
										<TableCell align="left">
											<button
												className="delete"
												onClick={() =>
													dispatch(deleteHomeContentStart(documentId))
												}
											>
												<svg
													width="17"
													height="19"
													viewBox="0 0 17 19"
													fill="#d84727"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M15.6972 2.29715H12.0601L11.7033 0.870009C11.5755 0.358703 11.1161 5.13325e-06 10.589 0H5.49104C4.964 5.13325e-06 4.50459 0.358703 4.37677 0.870009L4.02002 2.29715H0.382859C0.171412 2.29715 0 2.46857 0 2.68001C0 2.89146 0.171412 3.06287 0.382859 3.06287H1.56972L2.28069 17.2866C2.31157 17.8977 2.816 18.3772 3.42781 18.3772H12.6912C13.3032 18.3772 13.8077 17.8972 13.8382 17.2859L14.5493 3.06287H15.6972C15.9087 3.06287 16.0801 2.89146 16.0801 2.68001C16.0801 2.46857 15.9087 2.29715 15.6972 2.29715ZM6.12553 13.4001C6.12553 13.6115 5.95411 13.7829 5.74267 13.7829C5.53122 13.7829 5.35981 13.6115 5.35981 13.4001V7.27433C5.35981 7.06289 5.53122 6.89147 5.74267 6.89147C5.95411 6.89147 6.12553 7.06289 6.12553 7.27433V13.4001ZM8.03973 14.5486C8.25117 14.5486 8.42259 14.3772 8.42259 14.1658V6.5086C8.42259 6.29715 8.25117 6.12574 8.03973 6.12574C7.82828 6.12574 7.65687 6.29715 7.65687 6.5086V14.1658C7.65687 14.3772 7.82828 14.5486 8.03973 14.5486ZM10.7204 13.4001C10.7204 13.6115 10.549 13.7829 10.3376 13.7829C10.1261 13.7829 9.95471 13.6115 9.95471 13.4001V7.27433C9.95471 7.06289 10.1261 6.89147 10.3376 6.89147C10.549 6.89147 10.7204 7.06289 10.7204 7.27433V13.4001ZM5.11937 1.05584L4.8091 2.29715H11.2705L10.9602 1.05584C10.9178 0.885236 10.7645 0.765524 10.5887 0.765712H5.49082C5.31503 0.765524 5.16176 0.885236 5.11937 1.05584Z"
														fill="#d84727"
													/>
												</svg>
											</button>
										</TableCell>
									</TableRow>
								);
							})}
						<TableRow>
							{!isLastPage && <LoadMore {...configLoadMore} />}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default MenageHomePage;
