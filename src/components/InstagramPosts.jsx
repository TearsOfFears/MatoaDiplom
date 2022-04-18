import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import Posts1 from "../assets/img/home/Posts1.png";
import Posts2 from "../assets/img/home//Posts2.png";
import Posts3 from "../assets/img/home//Posts3.png";
import Posts4 from "../assets/img/home//Posts4.png";
import Posts5 from "../assets/img/home//Posts5.png";
import { fetchHomeContentInstagramStart } from "../redux/Home/home.actions";

const arrayPosts = [Posts1, Posts2, Posts3, Posts4, Posts5];

const mapState = ({contentHome})=>({content:contentHome.contentInstagram.dataInstagram})

function InstagramPosts() {

	const dispatch = useDispatch();
	const { content } = useSelector(mapState);
	console.log(content);
	useEffect(() => {
		dispatch(fetchHomeContentInstagramStart());
	}, []);

	return (
		<section className="instagram-posts ">
			<div className="container nopadding">
				<div className="row">
					<h1>Instagram </h1>
					<hr />
					<div className="posts nopadding">
						{Array.isArray(content) &&
							content.length > 0 && content.map((data, index) => {
							const {sliderThumbnail,documentId} =  data;
							return <img src={sliderThumbnail} alt="" key={documentId} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default InstagramPosts;
