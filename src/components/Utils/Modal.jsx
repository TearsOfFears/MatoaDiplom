import React, { useState } from "react";

const Modal = ({
	hideModalEdit,
	hideModalAdd,
	toggleModal,
	setHideModalEdit,
	setHideModalAdd,
	children,
	contentEdit,
	product,
	hideModal,
	setHideModal,
}) => {


	if (Object.keys(contentEdit).length === 3) {
		setHideModalAdd(hideModalAdd);
		setHideModalEdit(hideModalEdit);
		if (!hideModalAdd || !hideModalEdit) return null;
		console.log(3);
	}

	if (Object.keys(contentEdit).length === 4) {
		setHideModalAdd(hideModalAdd);
		setHideModalEdit(hideModalEdit);
		if (!hideModalAdd || !hideModalEdit) return null;
	}

	if (Object.keys(contentEdit).length === 1) {
		setHideModalEdit(hideModalEdit);
		if (hideModalEdit) return null;
		console.log(1);
	}

	if (Object.keys(contentEdit).length === 2) {
		setHideModalEdit(hideModalEdit);
		if (!hideModalEdit) return null;
		console.log(2);
	}



	if (!hideModalEdit) return null;
	if (!hideModalAdd) return null;
	return [
		<div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
		<div className="modalWrap" key={2}>
			<div className="modal">{children}</div>
		</div>,
	];
};

export default Modal;
