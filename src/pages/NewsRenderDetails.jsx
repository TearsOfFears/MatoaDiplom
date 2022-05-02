import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchNewsDetailsStart } from "../redux/News/news.actions";

const mapState = ({ newsData }) => ({ newsCurrent: newsData.newsDetails });

function NewsRenderDetails() {
	const { newsCurrent } = useSelector(mapState);
	const { newsLink } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchNewsDetailsStart(newsLink));
	}, []);
	return (
		<div>
			{Array.isArray(newsCurrent) &&  newsCurrent.map((data, key) => {
				return <div>{data.titleNews}</div>;
			})}
		</div>
	);
}

export default NewsRenderDetails;
