import { GET_DATA } from "../constant/constant";

export const actionData = (data) => {
    console.log(data)
    return {
        type: GET_DATA,
        data
    }
}