import axios from 'axios'
import { API } from './config'
import * as types from './types'

export const getSalaryComponents = () => {
  return dispatch => {
    dispatch({
      type: types.SALARY_COMPONENTS_FETCH_REQUEST,
    })

    axios.get(`${API}components`)
      .then(function (response) {
        dispatch({
          type: types.SALARY_COMPONENTS_FETCH_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.SALARY_COMPONENTS_FETCH_FAILED,
          error
        })
      });
  };
}

export const createSalaryComponent = (component) => {
  return dispatch => {
    axios.post(`${API}components`, component)
      .then(function (response) {
        dispatch({
          type: types.SALARY_COMPONENT_CREATE_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.SALARY_COMPONENT_CREATE_FAILED,
          error
        })
      });
  };
}

export const editSalaryComponent = (component) => {
  return dispatch => {
    axios.put(`${API}components/${component._id}`, component)
      .then(function (response) {
        dispatch({
          type: types.SALARY_COMPONENT_EDIT_SUCCESS,
          response
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.SALARY_COMPONENT_EDIT_FAILED,
          error
        })
      });
  };
}

export const deleteSalaryComponent = (component) => {
  return dispatch => {
    axios.delete(`${API}components/${component._id}`)
      .then(function (response) {
        dispatch({
          type: types.SALARY_COMPONENT_DELETE_SUCCESS,
          component
        })
      })
      .catch(function (error) {
        dispatch({
          type: types.SALARY_COMPONENT_DELETE_FAILED,
          error
        })
      });
  };
}