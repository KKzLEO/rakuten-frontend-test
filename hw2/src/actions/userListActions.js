import { createAction } from 'redux-actions';
import {
    CREATE_USER,
    DELETE_USER,
    MODIFY_USER
} from '../constants/actionTypes'

export const createUser = createAction(CREATE_USER);
export const deleteUser = createAction(DELETE_USER);
export const modifyUser = createAction(MODIFY_USER);