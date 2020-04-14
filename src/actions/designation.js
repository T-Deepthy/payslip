import axios from 'axios'
import { API } from './config'
import * as types from './types'

export const getDesignations = () => {
  return dispatch => {
    dispatch({
      type: types.DESIGNATIONS_FETCH_REQUEST,
    })

    axios.get(`${API}designations`)
      .then(function (response) {
        dispatch({
          type: types.DESIGNATIONS_FETCH_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.DESIGNATIONS_FETCH_FAILED,
          error
        })
      });
  };
}

export const createDesignation = (designation) => {
  return dispatch => {
    axios.post(`${API}designations`, designation)
      .then(function (response) {
        dispatch({
          type: types.DESIGNATION_CREATE_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.DESIGNATION_CREATE_FAILED,
          error
        })
      });
  };
}

export const editDesignation = (designation) => {
  return dispatch => {
    axios.put(`${API}designations/${designation._id}`, designation)
      .then(function (response) {
        dispatch({
          type: types.DESIGNATION_EDIT_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.DESIGNATION_EDIT_FAILED,
          error
        })
      });
  };
}

export const deleteDesignation = (designation) => {
  return dispatch => {
    axios.delete(`${API}designations/${designation._id}`)
      .then(function (response) {
        dispatch({
          type: types.DESIGNATION_DELETE_SUCCESS,
          designation
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.DESIGNATION_DELETE_FAILED,
          error
        })
      });
  };
}