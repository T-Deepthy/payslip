import * as types from '../actions/types'
const INITIAL_STATE = { data: [], error: null, loading: false, status: null }
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DESIGNATIONS_FETCH_REQUEST:
      return {
        data: [],
        error: null,
        loading: true,
        status: null
      }
    case types.DESIGNATIONS_FETCH_SUCCESS:
      return {
        data: action.response.data,
        error: null,
        loading: false,
        status: action.response && action.response.status
      }
    case types.DESIGNATIONS_FETCH_FAILED:
      return {
        data: [],
        error: action.error,
        loading: false,
        status: null
      }

      case types.DESIGNATION_CREATE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.response.data],
      }
    case types.DESIGNATION_CREATE_FAILED:
      return {
        ...state,
        error: action.error,
      }

    case types.DESIGNATION_EDIT_SUCCESS:
      return {
        ...state,
        data: state.data.map(designation => {
          if (designation._id === action.response.data._id) {
            return action.response.data;
          }
          return designation;
        }),
      }
    case types.DESIGNATION_EDIT_FAILED:
      return {
        ...state,
        error: action.error,
      }

    case types.DESIGNATION_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(designation => designation._id !== action.designation._id)
      }
    case types.DESIGNATION_DELETE_FAILED:
      return {
        ...state,
        error: action.error,
      }
      default:
        return state;
    }
  
  }
  