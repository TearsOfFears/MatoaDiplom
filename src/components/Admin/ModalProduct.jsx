import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../redux/Products/products.actions";

const Modal = ({ toggleModal, hideModal, children }) => {
	const dispatch = useDispatch();


	if (!hideModal) return null;
	return [
		<div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
		<div className="modalWrap" key={2}>
			<div className="modal">{children}</div>
		</div>,
	];
};

export default Modal;
