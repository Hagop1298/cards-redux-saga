import { KeyboardReturnRounded } from "@material-ui/icons"
import { type } from "@testing-library/user-event/dist/type"
import * as types from "./action"

const initialSatate = {
    recipes: [],
    error: null,
    loading: false
}

const recipeReducer = (state = initialSatate, action) => {
    switch (action.type) {
        case types.FETCH_RECIPE_START:
            return {
                ...state,
                loading: true,
            };
        case types.FETCH_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: action.payload
            };
        case types.FETCH_RECIPE_FAIL:
            return {
                ...state,
                loading: true,
                error: action.payload
            };
        default:
            return state;
    }
}

export default recipeReducer;