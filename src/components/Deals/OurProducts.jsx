import React from "react";

import productsEyes from "./../../assets/img/home/productsEyes.png";
import productsWatch from "./../../assets/img/home/productsWatch.png";
import "./style.scss";
import { Buttons } from "./../index";
import { Link } from "react-router-dom";

function OurProducts() {
	return (
		<section className="ourProducts">
			<div className="container nopadding">
				<div className="row">
					<div className="wrapper-ourProducts">
						<div>
							<h1>
							Розкішні <span> окуляри</span>
							</h1>
							<p>Подивіться на красу екзотичного світу в розкішних окулярах</p>
							<Link to="/products?sort=glasses&order=&available=&discount=&series=" className="btn-discover">Перегляньте зараз</Link>
						
							<img src={productsEyes} alt="" />
						</div>
						<div>
							<h1>
							Зручні  <span> годинники</span>
							</h1>
							<p>
							Відчуйте балансову функцію та красу в наших дерев’яних годинниках
							</p>
							<Link to="/products?sort=watches&order=&available=&discount=&series=" className="btn-discover">Перегляньте зараз</Link>
							<img src={productsWatch} alt="" className="size-big" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OurProducts;
