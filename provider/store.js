import { configureStore } from '@reduxjs/toolkit';
import themeReducer from "./reducers/themeReducer";
import drawerReducer from "./reducers/drawerReducer";
import userReducer from "./reducers/userReducer";
import eventsReducer from "./reducers/eventsReducer";
import jobsReducer from "./reducers/jobsReducer";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        drawer: drawerReducer,
        events: eventsReducer,
        user: userReducer,
        jobs: jobsReducer,
    },
});

export default store;