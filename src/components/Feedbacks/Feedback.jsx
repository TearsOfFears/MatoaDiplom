import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";

import "./feedback.scss";
import { Buttons } from "..";
import { useDispatch } from "react-redux";
import {
	addComment,
	fetchComments,
} from "../../redux/Comments/comments.actions";
import { useEffect } from "react";
import FeedbackRender from "./FeedbackRender";

function Feedback(product) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState([]);
	const { documentId } = product;
	const handleSend = () => {
		//setComment([]);
		dispatch(addComment({ comment, documentId }));
	};
	useEffect(() => {
		dispatch(fetchComments({ documentId }));
	}, []);
	return [
		<section className="feedback">
			<CKEditor
				config={{
					toolbar: [
						{
							name: "basicstyles",
							items: ["Bold", "Italic", "Underline", "Strike"],
						},
					],
				}}
				onChange={(evt) => setComment(evt.editor.getData())}
			/>
			<Buttons style="btn-read" onClick={() => handleSend()}>
				Підтверидти
			</Buttons>
		</section>,
		<FeedbackRender />,
	];
}

export default Feedback;
