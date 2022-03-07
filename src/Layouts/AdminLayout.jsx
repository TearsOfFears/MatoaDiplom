import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Header, Bils, ButtonForm } from "../components";

import { useDispatch } from "react-redux";
import { Admin } from "../pages";
import UserProfile from "../components/Admin/UserProfile";
import VerticalNav from "../components/Admin/VerticalNav";
import { signOutUserStart } from "../redux/User/user.actions";
import MenageHomePage from "../components/Admin/MenageHomePage";
const AdminLayout = (props) => {
	const dispatch = useDispatch();
	// const [hideModal, setHideModal] = useState(true);
	// const toggleModalAddProductPage = () => setHideModal(!hideModal);
	// const toggleModalHome = () => setHideModal(!hideModal);
	//onClick={() => toggleModalAddProductPage()}
	// const configModalProductPage = {
	// 	hideModal,
	// 	toggleModalAddProductPage,
	// 	setHideModal,
	// };
	// const configModalHome = {
	// 	hideModal,
	// 	toggleModal,
	// 	setHideModal,
	
	// };

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<div className="adminLayout">
			<Header {...props} />
			<div className="container d-flex flex-row mt-5">
				<div className="contorlPanel">
					<div className="sideBar">
						<VerticalNav>
							<ul>
								<li>
									<Link to="/admin">До дому</Link>
								</li>
								<li>
									<ButtonForm >
										Перегялнути продукти
									</ButtonForm>
								</li>
								<li>
									<ButtonForm >
										Перегялнути контент головного екрану
									</ButtonForm>
								</li>
								<li>
									<span className="btn" onClick={() => signOut()}>
										Вийти
									</span>
								</li>
							</ul>
						</VerticalNav>
					</div>
				</div>
				<div className="content">
					<Admin/>
					{/* <MenageHomePage {...configModalHome} /> */}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminLayout;
