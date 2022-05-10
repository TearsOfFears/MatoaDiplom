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
		const limit = 1;
		dispatch(fetchNewsHistory({limit}));
	}, [array]);

	const handleGetDetails = (newsLink) => {
		navigate(`/news/${newsLink}`);
	};
console.log(news);
console.log(array);
	return (
		<div className="container">
			<h1>Останні новини</h1>
			<hr />
			<div className="row">
				{Array.isArray(news) && news.map((data,key)=>{
					return (
						<div className="wrapper-news" key={key}>
						<div>
							<h3>{data.titleNews}</h3>
							<h1>{data.titleNews}</h1>
							<ButtonForm
								onClick={(e) => handleGetDetails(data.newsLink)}
								className="btn-withoutBg"
							>
								Більше
							</ButtonForm>
						</div>
						<div>
							<img src={data.newsThumbnail} alt="" />
						</div>
					</div>
					)
				})}

			</div>
		</div>
	);
}

export default NewsSection;
