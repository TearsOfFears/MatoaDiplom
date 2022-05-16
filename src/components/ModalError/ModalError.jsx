import React from "react";
import "./style.scss";
function ModalError({
	hideModal,
	toggleModal,
	setHideModal,
	isProcessing,
	checkoutError,
	children,
	setCheckoutError,
}) {
	if (hideModal) return null;

	return [
		<div className="modalOverlay" onClick={() => toggleModal()} key={1} />,
		<div className="modalWrapError" key={2}>
			<div className="modal">
				<button
					onClick={(e) => {
						setHideModal(!hideModal);
						setCheckoutError();
					}}
				>
					Закрити
				</button>
				{checkoutError}
			</div>
		</div>,
	];
}

export default ModalError;
