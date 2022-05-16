import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchNewsDetailsStart } from "../redux/News/news.actions";
import { formatOnlyDate } from "./../utils/utils";
const mapState = ({ newsData }) => ({ newsCurrent: newsData.newsDetails });

function NewsRenderDetails() {
	const { newsCurrent } = useSelector(mapState);
	const { newsLink } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchNewsDetailsStart({ newsLink }));
	}, []);
	return (
		<div>
			{Array.isArray(newsCurrent) &&
				newsCurrent.map((data, key) => {
					const {titleNews, descLong, newsCreated} =
						data;
					return (
						<div className="wrapper-news">
							<div className="wrapper-title">
								<h3>{titleNews}</h3>
								<hr className="mt-3 mb-2"/>
								<div className="date">{formatOnlyDate(newsCreated)}</div>
							</div>
							<div className="wrapper-content"  dangerouslySetInnerHTML={{ __html: descLong }} />
						</div>
					);
				})}
		</div>
	);
}

export default NewsRenderDetails;
