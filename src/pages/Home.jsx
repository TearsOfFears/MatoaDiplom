import React from "react";
import {
	Swiper1,
	Header,
	OurProducts,
	MonthyDeals,
	NewsSection,
	LinesBg,
	LinesBottom,
	Series1,
	Testimonals,
	TestimonalsLines,
	InstagramPosts,
	Bils,
} from "../components";

function Home() {
	return (
		<div className="mainHome">
			<Swiper1 />
			<OurProducts />
			<MonthyDeals />
			<section className="news">
				<LinesBg />
				<NewsSection />
				<LinesBottom />
			</section>
			<Series1 />
			<section className="testimonals">
				<TestimonalsLines />
				<Testimonals />
			</section>
			<InstagramPosts />
			<Bils />
		</div>
	);
}

export default Home;
