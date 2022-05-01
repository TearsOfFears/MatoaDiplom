import React from "react";
import { useEffect } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchNewsHistory } from "../../redux/News/news.actions";
import { formatDate } from "../../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ButtonForm } from "..";
const mapState = ({ newsData }) => ({ news: newsData.newsRender.dataNews });
function NewsRender() {
	const dispatch = useDispatch();
	const { news } = useSelector(mapState);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(fetchNewsHistory());
	}, []);

	const handleGetDetails = (newsLink) => {
		navigate(`/news/${newsLink}`);
	};
	return (
		<div className="container">
			{Array.isArray(news) &&
				news.map((data, key) => {
					const { newsThumbnail, titleNews, descShort, newsCreated, newsLink } =
						data;
					return (
						<div className="wrapper-post" key={key}>
							<div className="wrapper-content">
								<div className="wrapper-text-img">
									<div className="wrapper-text-img__img">
										<LazyLoadImage
											effect="blur"
											useIntersectionObserver={true}
											src={newsThumbnail}
											//width="250px"
											wrapperClassName="img-lazy"
										/>
									</div>
									<div className="wrapper-text-img__title">
										<h1>{titleNews}</h1>
										<div dangerouslySetInnerHTML={{ __html: descShort }} />
									</div>
								</div>
								<div className="wrapper-readMore">
									<ButtonForm onClick={(e) => handleGetDetails(newsLink)}>
										Читати далі
									</ButtonForm>
								</div>
							</div>
							<div>{formatDate(newsCreated)}</div>
						</div>
					);
				})}
		</div>
	);
}

export default NewsRender;
