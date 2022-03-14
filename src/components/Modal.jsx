import React, { useState } from "react";

const Modal = ({
	hideModalEdit,
	hideModalAdd,
	toggleModal,
	setHideModalEdit,
	setHideModalAdd,
	children,
	contentEdit,
}) => {
	if (hideModalEdit || hideModalAdd) return null;
	return [
		<div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
		<div className="modalWrap" key={2}>
			<div className="modal">{children}</div>
		</div>,
	];
};

export default Modal;
