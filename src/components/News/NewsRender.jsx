import React from "react";
import { useEffect } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchNewsHistory,fetchNewsDetailsStart, setNewsDetailsStart } from "../../redux/News/news.actions";
import { formatOnlyDate } from "../../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ButtonForm } from "..";
const mapState = ({ newsData }) => ({ news: newsData.newsRender.dataNews });
function NewsRender() {
	const dispatch = useDispatch();
	const { news } = useSelector(mapState);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(setNewsDetailsStart([]));
		dispatch(fetchNewsHistory());
		window.scrollTo(0, 0);
	}, []);

	const handleGetDetails = (newsLink) => {
		navigate(`/news/${newsLink}`);
	};
	return (
		<div className="container">
			<h1>Останні новини</h1>
			<hr />
			{Array.isArray(news) &&
				news.map((data, key) => {
					const { newsThumbnail, titleNews, descShort, newsCreated, newsLink } =
						data;
					return (
						<div className="wrapper-post" key={key}>
							<div className="date">{formatOnlyDate(newsCreated)}</div>
							<h2>{titleNews}</h2>
							<div className="wrapper-content">
								<div className="wrapper-content__img">
									<LazyLoadImage
										effect="blur"
										useIntersectionObserver={true}
										src={newsThumbnail}
										//width="250px"
										wrapperClassName="img-lazy"
									/>
								</div>
								<div className="wrapper-content__text-link">
									<div dangerouslySetInnerHTML={{ __html: descShort }} />
									<div className="wrapper-readMore">
										<ButtonForm style="mt-0" onClick={(e) => handleGetDetails(newsLink)}>
											Читати далі
										</ButtonForm>
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default NewsRender;
