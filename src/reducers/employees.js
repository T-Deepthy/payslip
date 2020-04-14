import * as types from '../actions/types'
const INITIAL_STATE = { data: [], error: null, loading: false, status: null }
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EMPLOYEES_FETCH_REQUEST:
      return {
        data: [],
        error: null,
        loading: true,
        status: null
      }
    case types.EMPLOYEES_FETCH_SUCCESS:
      return {
        data: action.response.data,
        error: null,
        loading: false,
        status: action.response && action.response.status
      }
    case types.EMPLOYEES_FETCH_FAILED:
      return {
        data: [],
        error: action.error,
        loading: false,
        status: null
      }

    case types.EMPLOYEE_CREATE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.response.data],
      }
    case types.EMPLOYEE_CREATE_FAILED:
      return {
        ...state,
        error: action.error,
      }

    case types.EMPLOYEE_EDIT_SUCCESS:
      return {
        ...state,
        data: state.data.map(emp => {
          if (emp._id === action.response.data._id) {
            return action.response.data;
          }
          return emp;
        }),
      }
    case types.EMPLOYEE_EDIT_FAILED:
      return {
        ...state,
        error: action.error,
      }

    case types.EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(employee => employee._id !== action.employee._id)
      }
    case types.EMPLOYEE_DELETE_FAILED:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }

}
