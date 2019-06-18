import {
    CREATE_USER,
    DELETE_USER,
    MODIFY_USER,
    CLICK_CREATE_BTN,
    CLICK_MODIFY_BTN,
    CLICK_DELETE_BTN,
    CLICK_CANCEL_BTN,
    OPEN_DEL_USR_CONFIRM
} from '../constants/actionTypes';
import { combineReducers } from 'redux';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    users: [
        {
            id:5,
            name:"Leo",
            phone:"0989154236",
            email:"avrdkfjsd@gmail.com",
            isModifyElement:false
        },
        {
            id:2,
            name:"cindy",
            phone:"0989154236",
            email:"avrdkfjsd@gmail.com",
            isModifyElement:false
        }
    ]
})

function userReducer(state = initialState, action){
    switch(action.type){
        case CREATE_USER:
            var users = state.get('users').toJS();
            users.push({
                id: users.reduce((init,user)=>{ return Math.max(init, user.id)},0)+1,
                name: action.payload.name,
                phone: action.payload.phone,
                email: action.payload.email
            });
            return state.set('users', Immutable.fromJS(users));;
        case DELETE_USER:
            var users = state.get('users').toJS();
            users.splice(action.payload.index,1);
            return state.set('users', Immutable.fromJS(users));
        case MODIFY_USER:
            var users = state.get('users').toJS();
            users.splice(action.payload.index,1,action.payload.user);
            return state.set('users', Immutable.fromJS(users));
        case CLICK_MODIFY_BTN:
            var tempUsers = state.get('users').toJS();
            tempUsers.map((user,index)=>{
                if(index === action.payload.index){
                    user.isModifyElement = !user.isModifyElement;
                }else{
                    user.isModifyElement = false;
                }
            });
            return state.set('users',Immutable.fromJS(tempUsers))
        case CLICK_CANCEL_BTN:
            var tempUsers = state.get('users').toJS();
            tempUsers.map((user,index)=>{
                user.isModifyElement = false;
            });
            return state.set('users',Immutable.fromJS(tempUsers))
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    users:userReducer
})

export default rootReducer;