import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./slices/settingSlice";
import serviceReducer from "./slices/serviceSlice";
import memberReducer from "./slices/memberSlice";
import clientReducer from "./slices/clientSlice";
import aboutReducer from "./slices/aboutSlice";
import priceReducer from "./slices/pricingSlice";
import projectViewReducer from "./slices/projectViewSlice";
import contactUsReducer from "./slices/contactUsSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
    reducer : {
        settings : settingReducer,
        services : serviceReducer,
        members: memberReducer,
        clients: clientReducer,
        about: aboutReducer,
        price: priceReducer,
        projectView: projectViewReducer,
        contactUs: contactUsReducer,
        auth: authReducer
    }
});

export default store;