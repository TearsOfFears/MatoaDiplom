import React, { useEffect } from "react";
import "./caraousel.scss";
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Parallax,
	Lazy,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Buttons } from "../index";
import {
	faInfoCircle,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHomeContentStart } from "../../redux/Home/home.actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const mapState = ({ contentHome }) => ({
	content: contentHome.contentProduct.data,
});

function Swiper1() {
	const dispatch = useDispatch();
	const { content } = useSelector(mapState);

	useEffect(() => {
		dispatch(fetchHomeContentStart());
	}, []);

	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);

	return (
		<section className="caraousel">
			<div className="container">
				<div className="row">
					<Swiper
						modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Lazy]}
						spaceBetween={50}
						slidesPerView={1}
						navigation={{
							prevEl: ".swiper-button-prev",
							nextEl: ".swiper-button-next",
						}}
						preloadImages={true}
						lazy={true}
						parallax={true}
						loop={true}
					>
						{Array.isArray(content) &&
							content.length > 0 &&
							content.map((data) => {
								const {
									documentId,
									descText,
									linkDetail,
									linkDiscover,
									sliderThumbnail,
									title,
								} = data;
								return (
									<SwiperSlide key={documentId}>
										<div className="swiper-slide-wrapper">
											<div
												className="swiper-slide-wrapper__img"
												data-swiper-parallax={-1400}
												data-swiper-parallax-duration={700}
											>
												<LazyLoadImage
													effect="blur"
													src={sliderThumbnail}
													width="340px"
												
												/>
											</div>
											<div className="swiper-slide-wrapper__content">
												<h1
													data-swiper-parallax={-900}
													data-swiper-parallax-duration={500}
												>
													{title}
												</h1>
												<hr
													data-swiper-parallax={-900}
													data-swiper-parallax-duration={600}
												/>
												<p
													data-swiper-parallax={-900}
													data-swiper-parallax-duration={700}
													dangerouslySetInnerHTML={{ __html: descText }}
												/>

												<div
													className="links"
													data-swiper-parallax={-1200}
													data-swiper-parallax-duration={800}
												>
													<Link to={linkDiscover} className="btn-discover">
														Подробиці
													</Link>

													<Link to={`/product/${linkDetail}`} className="btn-read mt-2">
													
															<FontAwesomeIcon icon={faInfoCircle}/>
															Перегялнути
													
													</Link>
												</div>
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
