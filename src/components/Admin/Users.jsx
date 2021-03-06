import React from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getAllUsers, giveUserRole } from "../../redux/User/user.actions";
import SelectCustom from "react-select";
import { apiInstanceDelete } from "../../utils/utils";
const mapState = ({ user }) => ({ allUsers: user.allUsers });
function Users() {
	const dispatch = useDispatch();
	const { allUsers } = useSelector(mapState);
	useEffect(() => {
		dispatch(getAllUsers({}));
	}, []);
	const colums = [
		{
			id: "number",
			lable: "#",
		},
		{
			lable: "Ім`я",
		},

		{
			lable: "ID",
		},
		{
			lable: "Ролі",
		},
		{
			lable: "Пошта",
		},
		{
			lable: "Добавити ролі",
		},
		{
			lable: "Видалити",
		},
	];

	const styles = {
		fontSize: "16px",
		cursor: "cursor",
		width: "15%",
	};

	const { dataUsers, queryDocUsers, isLastPageUsers } = allUsers;
	const handleSetPackaging = (e, documentId) => {
		const { value } = e.target;
		const name = e.target.options[e.target.selectedIndex].text;
		const activity = { label: name, value: value };
		const activityData = {
			activity,
		};
		dispatch(giveUserRole({ activityData, documentId }));
		dispatch(getAllUsers({}));
	};
	const Avaibility = [
		{ label: "user", value: "user", },
		{
			label: "admin",
			value: "admin",
		},
	];
	const colourStyles = {
		control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
			...styles,
			backgroundColor: "white",
			borderColor: isFocused ? "#d84727" : "#f7f6f4 ",
			borderColor: isSelected ? "#f7f6f4" : "#d84727",
			boxShadow: "none",
			fontSize: "14px",
			"&:hover": {
				color: "#f7f6f4",
			},
		}),
		menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
		menu: (provided) => ({ ...provided, zIndex: 9999 }),
		menubar: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				zIndex: 9999,
			};
		},
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,

				backgroundColor: isDisabled ? "#d84727" : "#f7f6f4",
				backgroundColor: isFocused ? "#d84727" : "#f7f6f4",
				backgroundColor: isSelected ? "#d84727" : "#f7f6f4",
				color: isSelected ? "#f7f6f4" : "#333",
				cursor: isDisabled ? "not-allowed" : "default",

				":hover": {
					backgroundColor: "#d84727",
					color: "#f7f6f4",
					zIndex: 9999,
				},
			};
		},
	};
	const handleChange = (event,documentId) => {
		let arr = event.map((data, key) => {
			return data.value;
		});
        const userRoles = {userRoles:arr}
		dispatch(giveUserRole({userRoles:arr,documentId}))
	};
    const handleDelete = async (documentID)=>{
		
        dispatch(deleteUser(documentID));
		await apiInstanceDelete.post("",{
			uid:documentID,
		});
    }
	return (
		<div>
			<h1>Користувачі</h1>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{colums.map((column, pos) => {
								const { lable } = column;
								return (
									<TableCell key={pos}>
										{lable}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(dataUsers) &&
							dataUsers.length > 0 &&
							dataUsers.map((data, pos) => {
								const { displayName, email, documentID, userRoles } =
									data;
                                    const roles = userRoles.map(data=>{
                                        return (
                                            {label:data,value:data}
                                        )
                                    })
								return (
									<TableRow key={documentID}>
										<TableCell component="th" scope="row">
											{pos + 1}
										</TableCell>
										<TableCell component="th" scope="row">
											{displayName}
										</TableCell>
										<TableCell align="left">{documentID}</TableCell>
										<TableCell align="left">
											<ul style={{ listStyleType: "none" }}>
												{Array.isArray(userRoles) &&
													userRoles.map((data, key) => {
														return <li key={key}>{data}</li>;
													})}
											</ul>
										</TableCell>
										<TableCell align="left">{email}</TableCell>
										<TableCell style={{ width: "300px" }}>
											{
												<SelectCustom
													isMulti
													options={Avaibility}
													placeholder="Наявність"
													styles={colourStyles}
													isSearchable={false}
													onChange={(e) => handleChange(e,documentID)}
													value={roles}
												/>
											}
										</TableCell>
										<TableCell align="left">
											<button
												className="delete"
												 onClick={() => handleDelete(documentID)}
											>
												<svg
													width="17"
													height="19"
													viewBox="0 0 17 19"
													fill="#d84727"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M15.6972 2.29715H12.0601L11.7033 0.870009C11.5755 0.358703 11.1161 5.13325e-06 10.589 0H5.49104C4.964 5.13325e-06 4.50459 0.358703 4.37677 0.870009L4.02002 2.29715H0.382859C0.171412 2.29715 0 2.46857 0 2.68001C0 2.89146 0.171412 3.06287 0.382859 3.06287H1.56972L2.28069 17.2866C2.31157 17.8977 2.816 18.3772 3.42781 18.3772H12.6912C13.3032 18.3772 13.8077 17.8972 13.8382 17.2859L14.5493 3.06287H15.6972C15.9087 3.06287 16.0801 2.89146 16.0801 2.68001C16.0801 2.46857 15.9087 2.29715 15.6972 2.29715ZM6.12553 13.4001C6.12553 13.6115 5.95411 13.7829 5.74267 13.7829C5.53122 13.7829 5.35981 13.6115 5.35981 13.4001V7.27433C5.35981 7.06289 5.53122 6.89147 5.74267 6.89147C5.95411 6.89147 6.12553 7.06289 6.12553 7.27433V13.4001ZM8.03973 14.5486C8.25117 14.5486 8.42259 14.3772 8.42259 14.1658V6.5086C8.42259 6.29715 8.25117 6.12574 8.03973 6.12574C7.82828 6.12574 7.65687 6.29715 7.65687 6.5086V14.1658C7.65687 14.3772 7.82828 14.5486 8.03973 14.5486ZM10.7204 13.4001C10.7204 13.6115 10.549 13.7829 10.3376 13.7829C10.1261 13.7829 9.95471 13.6115 9.95471 13.4001V7.27433C9.95471 7.06289 10.1261 6.89147 10.3376 6.89147C10.549 6.89147 10.7204 7.06289 10.7204 7.27433V13.4001ZM5.11937 1.05584L4.8091 2.29715H11.2705L10.9602 1.05584C10.9178 0.885236 10.7645 0.765524 10.5887 0.765712H5.49082C5.31503 0.765524 5.16176 0.885236 5.11937 1.05584Z"
														fill="#d84727"
													/>
												</svg>
											</button>
										</TableCell>
									</TableRow>
								);
							})}
						<TableRow>
							{/* {!isLastPageUsers && <LoadMore {...configLoadMore} />} */}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default Users;
