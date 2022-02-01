import React, { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, Parallax, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import testimonials1 from "../assets/img/home/testimonials.png";

import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Testimonals() {
	const content = [
		{
			id: 1,
			title: "WAY KAMBAS MINI EBONY 1",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: testimonials1,
			author: "Gita Savitri",
			position: "Content Creator/Influencer",
		},
		{
			id: 2,
			title: "WAY KAMBAS MINI EBONY 2",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: testimonials1,
			author: "Gita Savitri",
			position: "Content Creator/Influencer",
		},
		{
			id: 3,
			title: "WAY KAMBAS MINI EBONY 3",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: testimonials1,
			author: "Gita Savitri",
			position: "Content Creator/Influencer",
		},
		{
			id: 4,
			title: "WAY KAMBAS MINI EBONY 4",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: testimonials1,
			author: "Gita Savitri",
			position: "Content Creator/Influencer",
		},
	];
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	return (
			<div className="container nopadding ">
				<div className="row">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, Parallax, A11y]}
						spaceBetween={50}
						slidesPerView={1}
						navigation={{
							prevEl: ".prev-testimonals",
							nextEl: ".next-testimonals",
						}}
						parallax={true}
						loop={true}
                        className="swiper-testimonals" 
					>
						{content.map((data) => {
							return (
								<SwiperSlide key={data.id}>
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<div className="swiper-slide-wrapper">
												<div className="swiper-slide-wrapper__img">
													<img
														src={data.image}
														alt=""
														data-swiper-parallax="-1400"
														data-swiper-parallax-duration="700"
													/>
												</div>
												<div className="swiper-slide-wrapper__content">
													<h1
														data-swiper-parallax="-900"
														data-swiper-parallax-duration="500"
													>
														{data.title}
													</h1>
													<hr
														data-swiper-parallax="-900"
														data-swiper-parallax-duration="600"
													/>
													<p
														data-swiper-parallax="-900"
														data-swiper-parallax-duration="700"
														className="subtext"
													>
														{data.content}
													</p>
													<p
														data-swiper-parallax="-1100"
														data-swiper-parallax-duration="800"
														className="name"
													>
														{data.author}
													</p>
													<p
														data-swiper-parallax="-1200"
														data-swiper-parallax-duration="900"
														className="whoIs"
													>
														{data.position}
													</p>
												</div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
                         <div className="button-swiper">
						<div className="swiper-button-prev prev-testimonals"></div>
						<div className="swiper-button-next next-testimonals"></div>
                        </div>
					</Swiper>
				</div>
			</div>
	);
}

export default Testimonals;
