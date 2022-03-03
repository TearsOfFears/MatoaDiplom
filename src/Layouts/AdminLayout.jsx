import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Footer, Header, Bils,ButtonForm, } from "../components";

import { useDispatch } from "react-redux";
import { Admin } from "../pages";
import UserProfile from "../components/Admin/UserProfile";
import VerticalNav from "../components/Admin/VerticalNav";
import { signOutUserStart } from "../redux/User/user.actions";

const AdminLayout = (props) => {
	const dispatch = useDispatch();	
	const [hideModal, setHideModal] = useState(true);
	const toggleModal = () => setHideModal(!hideModal);

	const configModal = {
		hideModal,
		toggleModal,
		setHideModal
	};

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<div className="adminLayout">
			<Header {...props} />
			<div className="container d-flex flex-row">
				<div className="contorlPanel">
					<div className="sideBar">
						<VerticalNav>
							<ul>
								<li>
									{" "}
									<Link to="/admin">До дому</Link>
									
								</li>
								<li>	<ButtonForm onClick={() => toggleModal()}>Додати продукцію</ButtonForm></li>
								<li>
									<span className="btn" onClick={() => signOut()}> Вийти</span>
								</li>
							</ul>
						</VerticalNav>
					</div>
				</div>
				<div className="content"><Admin  {...configModal}/></div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminLayout;
