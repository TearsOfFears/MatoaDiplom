import React from "react";

import logoWhite from "./../../assets/img/home/logo-white.png";
import { Buttons } from "./../index";

import {
	faInstagram,
	faTwitter,
	faFacebookF,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.scss";
import { Link } from "react-router-dom";
function Footer() {
	return (
		<footer className="footer nopadding">
			<div className="container">
				<div className="row pt-5">
					<div className="wrapper-footer">
						<div className="wrapper-info">
							<img src={logoWhite} alt="" />
							<div className="wrapper-info__adress ">
								<h2>Адреси</h2>
								<p>
									Магазин та Офіс
									<br />
									вулиця Хрещатик, будинок 32, Київ, Україна
								</p>
							</div>
							<div className="wrapper-info__hours">
								<h2>Години роботи</h2>
								<p>
									{" "}
									Понеділок - Неділя
									<br />
									10.00 - 18.00
								</p>
							</div>
						</div>
						<div className="contacts">
							<h1>Зв`язатись </h1>
							<hr />
							<div className="wrapper-contacts">
								<div className="wrapper-contacts-block">
									<h2>Телефон</h2>
									<p>380-68-777-4313</p>
								</div>
								<div className="wrapper-contacts-block">
									<h2>
										Сервісний <br />
										центер
									</h2>
									<p>380-99-333-2244</p>
								</div>
								<div className="wrapper-contacts-block">
									<h2>
										Гаряча
										<br />
										лінія
									</h2>
									<p>380-99-232-8080</p>
								</div>
							</div>
							<ul>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faFacebookF} />
									</Buttons>
								</li>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faInstagram} />
									</Buttons>
								</li>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faTwitter} />
									</Buttons>
								</li>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faYoutube} />
									</Buttons>
								</li>
							</ul>
						</div>
						<div className="links">
							<h1>Корисні посилання</h1>
							<hr />
							<ul>
								<li>
									<Link to="/news" className="nav-link-footer">
										Новини
									</Link>
								</li>
								<li>
									<Link to="/forBusiness" className="nav-link-footer">
										Для Бізнесу
									</Link>
								</li>
								<li>
									<Link to="/aboutUs" className="nav-link-footer">
										Про нас
									</Link>
								</li>
							</ul>
						</div>
						<div className="compaign">
							<h1>Колекції</h1>
							<hr />
							<ul>
								<li>
									<Link
										to="/products?sort=&order=&available=&discount=&series="
										className="nav-link-footer"
									>
										Без колекції
									</Link>
								</li>
								<li>
									<Link
										to="/products?sort=&order=&available=&discount=&series=skeleton"
										className="nav-link-footer"
									>
										Скелетон колекція
									</Link>
								</li>
								<li>
									<Link
										to="/products?sort=&order=&available=&discount=&series=ebony"
										className="nav-link-footer"
									>
										Чорна колекція
									</Link>
								</li>
								<li>
									<Link
										to="/products?sort=&order=&available=&discount=&series=maple"
										className="nav-link-footer"
									>
										Кленова колекція
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
