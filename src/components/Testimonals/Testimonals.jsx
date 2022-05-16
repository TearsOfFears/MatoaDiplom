import React, { useEffect } from "react";
import "./testimonals.scss";
import { Navigation, Pagination, Scrollbar, Parallax, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import testimonials1 from "./../../assets/img/home/testimonials.png";
import { useSelector, useDispatch } from "react-redux";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchHomeContentTestimonalsStart } from "./../../redux/Home/home.actions";

const mapState = ({ contentHome }) => ({
	content: contentHome.contentTestimonals.dataTestimonals,
});

function Testimonals() {
	const { content } = useSelector(mapState);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchHomeContentTestimonalsStart());
	}, []);
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	
	return (
		<div className="container ">
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
					{Array.isArray(content) &&
						content.length > 0 &&
						content.map((data, pos) => {
							const {
								titleTestimonals,
								descTextTestimonals,
								textAuthor,
								jobPosition,
								testimonalsThumbnail,
							} = data;
							return (
								<SwiperSlide key={pos}>
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<div className="swiper-slide-wrapper">
												<div className="swiper-slide-wrapper__img">
													<img
														src={testimonalsThumbnail}
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
														{titleTestimonals}
													</h1>
													<hr
														data-swiper-parallax="-900"
														data-swiper-parallax-duration="600"
													/>
													<p
														data-swiper-parallax="-1100"
														data-swiper-parallax-duration="800"
														className="subtext"
														dangerouslySetInnerHTML={{
															__html: descTextTestimonals,
														}}
													/>
													<p
														data-swiper-parallax="-1100"
														data-swiper-parallax-duration="800"
														className="name"
													>
														{textAuthor}
													</p>
													<p
														data-swiper-parallax="-1200"
														data-swiper-parallax-duration="900"
														className="whoIs"
													>
														{jobPosition}
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
