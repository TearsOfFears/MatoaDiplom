import React, { useState } from "react";
import { CKEditor, useCKEditor } from "ckeditor4-react";

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
	//const { editor } = useCKEditor();
	const [check, setCkeck] = useState(true);
	const dispatch = useDispatch();
	const [comment, setComment] = useState([]);
	const { comments } = useSelector(mapState);
	const { documentId } = product;
	const handleSend = () => {
		const { displayName, email, photoURL } = currentUser;
		dispatch(addComment({ comment, displayName, email, photoURL, documentId }));
		dispatch(fetchComments({ documentId }));
		setCkeck(!check);
	};
	useEffect(() => {
		dispatch(fetchComments({ documentId }));
	}, []);
	const handleSaveComment = (evt) => {
		setComment(evt.editor.getData());
	};

	const config = {
		toolbar: [
			{
				name: "basicstyles",
				items: ["Bold", "Italic", "Underline", "Strike"],
			},
		],
	};
	return [
		<section className="feedback" key={1}>
			{allow && check && (
				<div className="makePost">
					<h1 className="mt-0 ">Залишіть відгук</h1>
					<CKEditor
						name="comments"
						config={config}
						initData={<p>Введіть ваш коментар тут!</p>}
						onChange={(evt) => handleSaveComment(evt)}
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
					<h1>
						{" "}
						<span style={{ color: "#d84727" }}>Поки що </span> немає відгуків
					</h1>
				</div>
			)}
		</div>,
	];
}

export default Feedback;
