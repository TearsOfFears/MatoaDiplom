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
	if (!hideModalEdit) return null;
	if (!hideModalAdd) return null;

	if (Object.keys(contentEdit).length === 3) {
		setHideModalAdd(hideModalAdd);
		setHideModalEdit(hideModalEdit);
		if (!hideModalAdd || !hideModalEdit) return null;
		console.log(true);
	}

	if (Object.keys(contentEdit).length === 1) {
		setHideModalEdit(hideModalEdit);
		if (hideModalEdit) return null;
	}

	if (Object.keys(contentEdit).length === 2) {
		setHideModalEdit(hideModalEdit);
		if (!hideModalEdit) return null;
	}

	// else{
	// 	setHideModalEdit(!hideModalEdit);
	// 	setHideModalAdd(!hideModalAdd);console.log("cahnge");
	// }
	// if (Object.keys(contentEdit).length > 0) {
	// 	setHideModalEdit(!hideModalEdit);
	// 	if (hideModalEdit || hideModalAdd) return null;
	// 	console.log(hideModalEdit);
	// }
	console.log(hideModalAdd);
	return [
		<div
			className="modalOverlay"
			onClick={() => toggleModal()}
			key={1}
			onAnimationEnd={() => setHideModalEdit(!hideModalEdit)}
		/>,
		<div className="modalWrap" key={2}>
			<div className="modal">{children}</div>
		</div>,
	];
};

export default Modal;
