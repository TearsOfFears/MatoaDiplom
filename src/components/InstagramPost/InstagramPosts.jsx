import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import "./style.scss";

import { fetchHomeContentInstagramStart } from "../../redux/Home/home.actions";


const mapState = ({contentHome})=>({content:contentHome.contentInstagram.dataInstagram})

function InstagramPosts() {

	const dispatch = useDispatch();
	const { content } = useSelector(mapState);
	useEffect(() => {
		dispatch(fetchHomeContentInstagramStart({}));
	}, []);

	return (
		<section className="instagram-posts ">
			<div className="container">
				<div className="row">
					<h1>Інстаграм </h1>
					<hr />
					<div className="posts">
						{Array.isArray(content) &&
							content.length > 0 && content.map((data, index) => {
							const {sliderThumbnail,documentId} =  data;
							return <img src={sliderThumbnail} alt="" key={documentId} />;
						})}
					</div>
				</div>
			</div>
			{/* <SplineTest/> */}
		</section>
	);
}

export default InstagramPosts;
