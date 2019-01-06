import axios from 'axios';
import { GET_ERRORS } from '../actions/types';

export const createProject = (projectObject, history) => async dispatch => {
    try {
        await axios.post(
            'http://localhost:8080/api/project',
            projectObject);
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}