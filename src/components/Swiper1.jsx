import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import caraousel1 from "../assets/img/home/caraousel1.png";
import caraousel2 from "../assets/img/home/maple-1.png";

import {
	faInfoCircle,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Swiper1() {
	const content = [
		{
			id: 1,
			title: "WAY KAMBAS MINI EBONY 1",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: caraousel1,
		},
		{
			id: 2,
			title: "WAY KAMBAS MINI EBONY 2",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: caraousel2,
		},
		{
			id: 3,
			title: "WAY KAMBAS MINI EBONY 3",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: caraousel1,
		},
		{
			id: 4,
			title: "WAY KAMBAS MINI EBONY 4",
			content:
				"MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
			image: caraousel1,
		},
	];
	const navigationPrevRef = React.useRef(null)
	const navigationNextRef = React.useRef(null)

	return (
		<section className="caraousel">
			<div className="container">
				<div className="row">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y, Parallax]}
						spaceBetween={50}
						slidesPerView={1}
						navigation={{
							prevEl: ".swiper-button-prev",
							nextEl: ".swiper-button-next",
						}}
						loop={true}
					>
						{content.map((data) => {
							return (
								<SwiperSlide key={data.id}>
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
											>
												{data.content}
											</p>
											<a
												href="#"
												className="btn-discover "
												data-swiper-parallax="-1100"
												data-swiper-parallax-duration="700"
											>
												Discover
											</a>
											<a
												href="#"
												className="btn-read"
												data-swiper-parallax="-1200"
												data-swiper-parallax-duration="700"
											>
												<FontAwesomeIcon icon={faInfoCircle} />
												Read details
											</a>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
						<div className="swiper-button-prev">
							<FontAwesomeIcon icon={faChevronLeft} />
						</div>
						<div className="swiper-button-next">
							<FontAwesomeIcon icon={faChevronRight} />
						</div>
					</Swiper>
				</div>
			</div>
		</section>
	);
}

export default Swiper1;
