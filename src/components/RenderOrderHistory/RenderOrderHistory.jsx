import React from "react";

import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import { Order } from "../../pages";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const colums = [
	{
		id: "orderCreated",
		lable: "Order date",
	},
	{
		id: "documentID",
		lable: "Order ID",
	},
	{
		id: "orderTotal",
		lable: "Amount",
	},
];

const styles = {
	fontSize: "16px",
	cursor: "pointer",
	width: "10%",
};
const formatText = (columnName,columnVal)=>{
  switch(columnName){
      case `orderTotal`:
        return `${columnVal} грн`;
        case `orderCreated`:
        return moment(columnVal.nano).format('DD/MM/YYYY')
    default:
        return columnVal
  }
}
const RenderOrderHistory = ({ orders }) => {

  const navigate = useNavigate();
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{colums.map((column, pos) => {
							const { lable } = column;
							return (
								<TableCell key={pos} style={styles}>
									{lable}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.isArray(orders) &&
						orders.length > 0 &&
						orders.map((row, pos) => {
              const {documentID}=row;
							return (
								<TableRow key={pos} onClick={()=> navigate(`/order/${documentID}`)}>
									{colums.map((column, pos) => {
          
										const columnName = column.id;
                    const columnVal = row[columnName]
                    const formatedText =formatText(columnName,columnVal)
										return (
											<TableCell key={pos} style={styles}>
												{formatedText}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default RenderOrderHistory;
