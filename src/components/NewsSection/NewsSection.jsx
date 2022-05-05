import React from "react";
import { ButtonForm, Buttons } from "../index";
import "./news.scss";
import newsImage from "./../../assets/img/home/newsImage.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNewsHistory } from "../../redux/News/news.actions";
import { useState } from "react";
const mapState = ({ newsData }) => ({ news: newsData.newsRender.dataNews });

function NewsSection() {
	const dispatch = useDispatch();
	const { news } = useSelector(mapState);
	const navigate = useNavigate();
	const [array, setArray] = useState([]);



	useEffect(() => {
		dispatch(fetchNewsHistory());
		
		if (Array.isArray(news) && news.length > 0) {
			const lastItem = news[news.length - 1];
			setArray(lastItem);
		}
	}, [array]);

	const handleGetDetails = (newsLink) => {
		navigate(`/news/${newsLink}`);
	};


	return (
		<div className="container">
			<h1>Останні новини</h1>
			<hr />
			<div className="row">
				<div className="wrapper-news">
					<div>
						<h3>{array.titleNews}</h3>
						<h1>{array.titleNews}</h1>
						<ButtonForm
							onClick={(e) => handleGetDetails(array.newsLink)}
							className="btn-withoutBg"
						>
							Більше
						</ButtonForm>
					</div>
					<div>
						<img src={array.newsThumbnail} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewsSection;
