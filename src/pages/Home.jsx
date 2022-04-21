import React from "react";
import {
	Swiper1,
	Header,
	OurProducts,
	MonthyDeals,
	News,
	LinesBg,
	LinesBottom,
	Series1,
	Testimonals,
	TestimonalsLines,
	InstagramPosts,
	Bils,
	Footer,
} from "../components";

function Home() {
	return (
		<div className="mainHome">
			<Swiper1 />
			<OurProducts />
			<MonthyDeals />
			<section className="news">
				<LinesBg />
				<News />
				<LinesBottom />
			</section>
			<Series1 />
			<section className="testimonals">
				<TestimonalsLines />
				<Testimonals />
			</section>
			{/* <InstagramPosts /> */}
			{/* <Bils /> */}
		</div>
	);
}

export default Home;
