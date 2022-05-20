import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Header, Bils, ButtonForm, Buttons, Orders } from "../components";

import { useDispatch } from "react-redux";
import { Admin } from "../pages";
import UserProfile from "../components/Admin/UserProfile";
import VerticalNav from "../components/Admin/VerticalNav";
import { signOutUserStart } from "../redux/User/user.actions";
import MenageHomePage from "../components/Admin/HomePageMenage/MenageHomePage";

import "./Layouts.scss";
import MenageNews from "../components/Admin/MenageNews";
import MenageFeedbacks from "../components/Admin/MenageFeedbacks";
const AdminLayout = (props) => {
	const [active, setActive] = useState(0);

	const arrMenage = [<Admin />, <MenageHomePage />, <Orders/>,<MenageNews/>,<MenageFeedbacks/>];
	const arrButtons = [
		"Переглянути продукти",
		"Переглянути контент",
		"Переглянути замовлення",
		"Переглянути новини",
		"Переглянути відгуки",
	];
	const getIndex = (index) => {
		setActive(index);
	};
	return (
		<div className="adminLayout">
			<Header {...props} />
			<div className="container d-flex flex-row mt-5 justify-content-between">
				<div className="contorlPanel">
					<div className="sideBar">
						<VerticalNav>
							<ul>
								{arrButtons.map((text, index) => {
									return (
										<li>
											<ButtonForm key={index} onClick={(e) => getIndex(index)}>
												{text}
											</ButtonForm>
										</li>
									);
								})}
							</ul>
						</VerticalNav>
					</div>
				</div>
				<div className="content">{arrMenage[active]}</div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminLayout;
