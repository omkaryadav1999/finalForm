import { createStore } from "redux";
import rootReducer from "./services/reducers/combineReducers";

const Store = createStore(
    rootReducer
)

export default Store