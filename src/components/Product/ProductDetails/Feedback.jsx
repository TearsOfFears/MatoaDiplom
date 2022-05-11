import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";

import "./feedback.scss";
import { Buttons } from "../..";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/Comments/comments.actions";
function Feedback() {
	const dispatch = useDispatch();
	const [comment, setComment] = useState([]);
	const handleSend = () => {
		//setComment([]);
		dispatch(addComment({ comment }));
	};
	return (
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
		</section>
	);
}

export default Feedback;
