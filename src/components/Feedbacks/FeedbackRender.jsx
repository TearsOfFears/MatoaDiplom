import React from "react";
import { useSelector } from "react-redux";
import "./feedback.scss";
const mapState = ({ commentData }) => ({
	comments: commentData.comments.dataComments,
});
const FeedbackRender = () => {
	const { comments } = useSelector(mapState);
	return (
		<div>
			{Array.isArray(comments) &&
				comments.map((data, key) => {
					return <h1>{data.comment}</h1>;
				})}
		</div>
	);
};

export default FeedbackRender;
