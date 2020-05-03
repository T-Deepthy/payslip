import * as types from '../actions/types'
const INITIAL_STATE = { data: [], error: null, loading: false, status: null }
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SALARY_COMPONENTS_FETCH_REQUEST:
      return {
        data: [],
        error: null,
        loading: true,
        status: null
      }
    case types.SALARY_COMPONENTS_FETCH_SUCCESS:
      return {
        data: action.response.data,
        error: null,
        loading: false,
        status: action.response && action.response.status
      }
    case types.SALARY_COMPONENTS_FETCH_FAILED:
      return {
        data: [],
        error: action.error,
        loading: false,
        status: null
      }

    case types.SALARY_COMPONENT_CREATE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.response.data],
      }
    case types.SALARY_COMPONENT_CREATE_FAILED:
      return {
        ...state,
        error: action.error,
      }
      
    case types.SALARY_COMPONENT_EDIT_SUCCESS:
      return {
        ...state,
        data: state.data.map(comp => {
          if (comp._id === action.response.data._id) {
            return action.response.data;
          }
          return comp;
        }),
      }
    case types.SALARY_COMPONENT_EDIT_FAILED:
      return {
        ...state,
        error: action.error,
      }

    case types.SALARY_COMPONENT_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(salaryComponent => salaryComponent._id !== action.component._id)
      }
    case types.SALARY_COMPONENT_DELETE_FAILED:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }

}
