import React from "react";
import { Buttons } from "./../index";
import "./news.scss";
import newsImage from "./../../assets/img/home/newsImage.png";

function News() {
	return (
		<div className="container">
			<h1>Recent News</h1>
			<hr />
			<div className="row">
				<div className="wrapper-news">
					<div>
						<h3>Where To Travel</h3>
						<h1>Matoa Where To Travel? Yogyakarta</h1>
						<Buttons style="btn-withoutBg">Discover </Buttons>
					</div>
					<div>
						<img src={newsImage} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default News;
