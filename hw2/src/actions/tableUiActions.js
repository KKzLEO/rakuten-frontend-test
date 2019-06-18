import { createAction } from 'redux-actions';
import {
    CLICK_CREATE_BTN,
    CLICK_MODIFY_BTN,
    CLICK_DELETE_BTN,
    CLICK_CANCEL_BTN,
    OPEN_DEL_USR_CONFIRM
} from '../constants/actionTypes'

export const clickCreateBtn = createAction(CLICK_CREATE_BTN);
export const clickModifyBtn = createAction(CLICK_MODIFY_BTN);
export const clickDeleteBtn = createAction(CLICK_DELETE_BTN);
export const clickCancelBtn = createAction(CLICK_CANCEL_BTN);
export const openDelUsrConfirm = createAction(OPEN_DEL_USR_CONFIRM);
