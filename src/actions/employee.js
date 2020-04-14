import axios from 'axios'
import { API } from './config'
import * as types from './types'

export const getEmployees = () => {
  return dispatch => {
    dispatch({
      type: types.EMPLOYEES_FETCH_REQUEST,
    })

    axios.get(`${API}employees`)
      .then(function (response) {
        dispatch({
          type: types.EMPLOYEES_FETCH_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.EMPLOYEES_FETCH_FAILED,
          error
        })
      });
  };
}

export const createEmployee = (employee) => {
  return dispatch => {
    axios.post(`${API}employees`, employee)
      .then(function (response) {
        dispatch({
          type: types.EMPLOYEE_CREATE_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.EMPLOYEE_CREATE_FAILED,
          error
        })
      });
  };
}

export const editEmployee = (employee) => {
  return dispatch => {
    axios.put(`${API}employees/${employee._id}`, employee)
      .then(function (response) {
        dispatch({
          type: types.EMPLOYEE_EDIT_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.EMPLOYEE_EDIT_FAILED,
          error
        })
      });
  };
}

export const deleteEmployee = (employee) => {
  return dispatch => {
    axios.delete(`${API}employees/${employee._id}`)
      .then(function (response) {
        dispatch({
          type: types.EMPLOYEE_DELETE_SUCCESS,
          employee
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.EMPLOYEE_DELETE_FAILED,
          error
        })
      });
  };
}