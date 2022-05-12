import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";

import "./feedback.scss";
import { Buttons } from "..";
import { useDispatch, useSelector } from "react-redux";
import {
	addComment,
	fetchComments,
} from "../../redux/Comments/comments.actions";
import { useEffect } from "react";
import FeedbackRender from "./FeedbackRender";
const mapState = ({ commentData }) => ({
	comments: commentData.comments.dataComments,
});
function Feedback({ product, currentUser, allow }) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState([]);
	const { comments } = useSelector(mapState);
	const { documentId } = product;
	const handleSend = () => {
		setComment([]);
		const { displayName, email, photoURL } = currentUser;
		dispatch(addComment({ comment, displayName, email, photoURL, documentId }));
		dispatch(fetchComments({ documentId }));
	};
	useEffect(() => {
		dispatch(fetchComments({ documentId }));
	}, []);
	return [
		<section className="feedback" key={1}>
			{allow && (
				<div className="makePost">
					<h1 className="mt-0 ">Залишіть відгук</h1>
					<CKEditor
						config={{
							toolbar: [
								{
									name: "basicstyles",
									items: ["Bold", "Italic", "Underline", "Strike"],
								},
							],
						}}
						onSave={(evt) =>
							setComment(evt.editor.setData("your text or html code"))
						}
						onChange={(evt) => setComment(evt.editor.getData())}
					/>
					<Buttons style="btn-read" onClick={() => handleSend()}>
						Підтвердити
					</Buttons>
				</div>
			)}

			{Array.isArray(comments) && comments.length > 0 && <FeedbackRender />}
		</section>,
		<div key={2}>
			{Array.isArray(comments) && comments.length === 0 && (
				<div className="col-12 justify-content-center w-100 text-center">
					<h1>Немає відгуків</h1>
					<h2>
						<span style={{ color: "#d84727" }}>
							Зробіть замовлення та станьте першим !!!
						</span>
					</h2>
				</div>
			)}
		</div>,
	];
}

export default Feedback;
