import axios from "axios";
import moment from "moment";
import {createSelector} from "reselect"

export const checkUserIsAdmin = currentUser =>{
    if(!currentUser || !Array.isArray(currentUser.userRoles))
    return false;
    const {userRoles} = currentUser;

    if(userRoles.includes("admin"))
    return true;
    return false;
}

export const checkUserIsSimple= currentUser =>{
    if(!currentUser || !Array.isArray(currentUser.userRoles))
    return false;
    const {userRoles} = currentUser;

    if(userRoles.includes("user") || userRoles.includes("admin")  )
    return true;
    return false;
}

export const apiInstance = axios.create({
    baseURL:'http://localhost:5001/matoa-diplom/us-central1/api'
});


export const formatDate = (data) => {
	let myDate = new Date(
		data.seconds * 1000 + data.nanoseconds / 1000000
	);
	let formatedTime = myDate.toJSON();
	let localDate = new Date(formatedTime);
	let test = moment(localDate).format("DD.MM.YYYY,HH:mm ");
	return test;
};

export const formatOnlyDate = (data) => {
	let myDate = new Date(
		data.seconds * 1000 + data.nanoseconds / 1000000
	);
	let formatedTime = myDate.toJSON();
	let localDate = new Date(formatedTime);
	let test = moment(localDate).format("DD.MM.YYYY");
	return test;
};




export const selectOrders = state => state.ordersData;

export const selectOrderItems = createSelector(
    [selectOrders],
    ordersData => ordersData.ordersHistory.data
);


