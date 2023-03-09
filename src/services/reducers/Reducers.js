import { GET_DATA } from "../constant/constant";

const initialState = [];

function Reducer(state = initialState, action) {

    switch (action.type) {
        case GET_DATA:
            return [action.data];
        default:
            return state
    }

}

export default Reducer