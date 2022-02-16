import React, { useState } from "react";

const Modal = ({ hideModal, toggleModal, children }) => {
	if (hideModal) return null;

	return [
		<div
			className="modalOverlay"
			onClick={() => toggleModal()}
			key={1}
		/>,
		<div className="modalWrap" 	key={2}>
			<div className="modal">{children}</div>
		</div>,
	];
};

export default Modal;
