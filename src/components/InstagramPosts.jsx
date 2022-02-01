import React from "react";

import Posts1 from "../assets/img/home/Posts1.png";
import Posts2 from "../assets/img/home//Posts2.png";
import Posts3 from "../assets/img/home//Posts3.png";
import Posts4 from "../assets/img/home//Posts4.png";
import Posts5 from "../assets/img/home//Posts5.png";

const arrayPosts = [Posts1, Posts2, Posts3, Posts4, Posts5];

function InstagramPosts() {
	return (
		<section class="instagram-posts ">
			<div className="container nopadding">
				<div className="row">
					<h1>Instagram </h1>
					<hr />
					<div className="posts nopadding">
						{arrayPosts.map((image, index) => {
							return <img src={image} alt="" key={index} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default InstagramPosts;
