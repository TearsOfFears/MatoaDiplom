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
		<section className="feedback">
			{allow && (
				<div className="makePost">
					<h1>Залишіть відгук</h1>
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

			{comments.length === 0 ? (
				<div className="col-12 justify-content-center w-100">
					<h1>Немає відгуку</h1>
					<h2>Зробіть замовлення та станьте першим !!!</h2>
				</div>
			) : (
				<FeedbackRender />
			)}
		</section>,
	];
}

export default Feedback;
