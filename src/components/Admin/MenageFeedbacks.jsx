import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import ReadMoreReact from "read-more-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import { LoadMore } from "./../../components";

import { storage } from "./../../firebase/utils";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchComments,
	deleteComment,
} from "../../redux/Comments/comments.actions";
import { formatDate } from "../../utils/utils";
const mapState = ({ commentData }) => ({
	comments: commentData.comments,
});

function MenageFeedbacks() {
	const dispatch = useDispatch();
	const { comments } = useSelector(mapState);

	const columsFeedbacks = [
		{
			lable: "#",
		},
		{
			lable: "Користувач",
		},
		{
			lable: "Дата відгуку",
		},
		{
			lable: "Відгук",
		},
		{
			lable: "ID-користувача",
		},
		{
			lable: "Видалити",
		},
	];

	const styles = {
		fontSize: "15px",
		cursor: "cursor",
		width: "70px",
	};

	useEffect(() => {
		dispatch(
			fetchComments()
		);
	}, []);

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
		<div>
			<TableContainer>
				<h1>Відгуки</h1>
				<Table>
					<TableHead>
						<TableRow>
							{columsFeedbacks.map((column, pos) => {
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
						{Array.isArray(dataComments) &&
							dataComments.length > 0 &&
							dataComments.map((data, pos) => {
								const {
									comment,
									displayName,
									commentCreated,
									commentCreatedUserID,
									documentID,
								} = data;

								return (
									<TableRow key={documentID} style={styles}>
										<TableCell align="left">{pos + 1}</TableCell>
										<TableCell component="th" scope="row">
											{displayName}
										</TableCell>
										<TableCell align="left">
											{formatDate(commentCreated)}
										</TableCell>
										<TableCell align="left">
											{typeof comment === "string" && comment.length > 0 ? (
												<ReadMoreReact
													text={comment}
													min={5}
													ideal={7}
													max={comment.length}
													readMoreText="click "
												/>
											) : null}
										</TableCell>
										<TableCell align="left">
											{typeof commentCreatedUserID === "string" &&
											commentCreatedUserID.length > 0 ? (
												<ReadMoreReact
													text={commentCreatedUserID}
													min={5}
													ideal={7}
													max={commentCreatedUserID.length}
													readMoreText="click "
												/>
											) : null}
										</TableCell>
										<TableCell align="left">
											<button
												className="delete"
												onClick={() => {
													dispatch(deleteComment(documentID));
													dispatch(
														fetchComments()
													);
												}}
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
							{!isLastPageComments && <LoadMore {...configLoadMore} />}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default MenageFeedbacks;
