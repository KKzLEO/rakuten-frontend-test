import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import Main from './components/Main/Main'
import { createStore } from 'redux'
import rootReducer from './reducers/userListReducers'
import { createUser,deleteUser,modifyUser } from './actions/userListActions'

import './scss/global.scss';
// 引入 react-tap-event-plugin 避免 material-ui onTouchTap event 會遇到的問題
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
let store = createStore(rootReducer);
// console.log(store.getState());

// let unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// )

// store.dispatch(createUser({
//     user:{
//         id:88,
//         name:"TEST1",
//         phone:"0000",
//         email:"ds@mgil.ocm.rw"
//     }
// }));
// store.dispatch(createUser({
//     user:{
//         id:89,
//         name:"TEST12",
//         phone:"0000",
//         email:"ds@mgil.ocm.rw"
//     }
// }));
// store.dispatch(createUser({
//     user:{
//         id:90,
//         name:"TEST3",
//         phone:"0000",
//         email:"ds@mgil.ocm.rw"
//     }
// }));

// unsubscribe();


ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
);