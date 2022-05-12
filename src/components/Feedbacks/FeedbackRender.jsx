import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoadMore } from "..";
import { fetchComments } from "../../redux/Comments/comments.actions";
import { formatDate } from "../../utils/utils";
import { IconLogin } from "../index";
import "./feedback.scss";
const mapState = ({ commentData }) => ({
	comments: commentData.comments,
});
const FeedbackRender = () => {
	const { comments } = useSelector(mapState);
	const dispatch = useDispatch();
	const { dataComments, queryDocComments, isLastPageComments } = comments;

	const handleLoadMore = () => {
		dispatch(
			fetchComments({
				startAfterDoc: queryDocComments,
				persistComments: dataComments,
			})
		);
	};
	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	};

	return (
		<div className="wrapper-post">
			{Array.isArray(dataComments) &&
				dataComments.map((data, key) => {
					const { comment, displayName, commentCreated, photoURL } = data;
					return (
						<div className="post" key={key}>
							<div>
								<div className="img-name">
									{photoURL === null ? (
										<IconLogin />
									) : (
										<img src={photoURL} alt="" />
									)}
									<h3>{displayName}</h3>
								</div>
								{formatDate(commentCreated)}
							</div>

						
							<div dangerouslySetInnerHTML={{ __html: comment }} />
						</div>
					);
				})}

			<div className="col-12">
			{!isLastPageComments && <LoadMore {...configLoadMore} />}
			</div>
		</div>
	);
};

export default FeedbackRender;
