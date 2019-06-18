import { connect } from 'react-redux'
import {
    createUser,
    deleteUser,
    modifyUser
} from '../../actions/userListActions';
import {
    clickModifyBtn,
    clickCancelBtn,
    openDelUsrConfirm
} from '../../actions/tableUiActions'
import UserList from '../../components/UserList/UserList'

const mapStateToProps = (state) => {{
    return {
        users: state.users.get('users').toJS(),
        isOpenedDelUsrConfirm: state.users.get('isOpenedDelUsrConfirm'),
        selectedUsrIndex: state.users.get('selectedUsrIndex')
    }
}};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser:(user)=>{
            dispatch(createUser(user));
        },
        modifyUser:(index,user)=>{
            dispatch(modifyUser(index,user));
        },
        onDeleteUser: (index)=> {
            dispatch(deleteUser({ index }));
        },
        showModifiableUser:(index)=>{
            dispatch(clickModifyBtn({index}))
        },
        cancelModifyUser:()=>{
            dispatch(clickCancelBtn())
        }
    }
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);