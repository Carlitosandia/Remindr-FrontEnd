import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import numbersReducer from "./numbersReducer";
import googleReducer from "./googleReducer";
import notificationsReducer from "./notificationsReducer";

export default combineReducers({
    users: usersReducer,
    phones: numbersReducer,
    googleAccounts: googleReducer,
    notifications: notificationsReducer
});