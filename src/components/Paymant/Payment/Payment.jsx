import React from "react";

function Payment({ handleChangeState, stage, setStage }) {
	return (
		<div>
			Payment <button onClick={(e) => handleChangeState(2)}> Next</button>
		</div>
	);
}

export default Payment;
