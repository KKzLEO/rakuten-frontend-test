import React,{ PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './UserList.scss'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import {Delete, Create, Check, Clear, Add} from '@material-ui/icons';

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOpenedConfirmDelMsg : false,
            isCreateMode: false,
            selectedUsrIndex:0,
            newUsr:{
                id:0,
                name:"",
                phone:"",
                email:"",
                isModifyElement:false
            },
            validator:{
                errors:{}
            }
        }
    };

    handleModify(index){
        this.setState({
            newUsr: this.props.users[index],
            isCreateMode:false,
            selectedUsrIndex:index,
            validator:{
                errors:{}
            }
        });
        this.props.showModifiableUser(index);
    };

    toggleDelUsrConfirm(index = -1){
        this.setState({
            isOpenedConfirmDelMsg: !this.state.isOpenedConfirmDelMsg,
            selectedUsrIndex: index
        });
    }
    
    handleDelete(index){
        this.setState({
            isOpenedConfirmDelMsg: false
        });
        this.props.onDeleteUser(index);
    }

    handleCancelCreate(){
        this.setState({
            isCreateMode:false
        });
    }

    handleCreate(){
        this.props.cancelModifyUser();
        this.setState({
            isCreateMode: !this.state.isCreateMode,
            newUsr: {
                id:0,
                name:"",
                phone:"",
                email:"",
                isModifyElement:false
            },
            validator:{
                errors:{}
            }
        });
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        const user = Object.assign({},this.state.newUsr);
        user[name] = value;
        this.setState({
            newUsr: user
        },function(){
            this.validator(name);
        });
    }

    validator(name = ''){
        let errors = {};
        let originalErrors = this.state.validator.errors;
        let fields = this.state.newUsr;

        let nameValidator = function(props,state){
            if(fields.name === '' || fields.name === undefined){
                if(errors.name === undefined) errors.name = [];
                errors.name = [...errors.name,'請輸入姓名'];
            }
            if(fields.name !== '' && props.users.find((user,index)=>{ return user.name === fields.name && index !== state.selectedUsrIndex}) !== undefined){
                if(errors.name === undefined) errors.name = [];
                errors.name = [...errors.name,'姓名重複'];
            }
            if(errors.name !== undefined && errors.name.length !== 0){
                errors.name = errors.name.join(' ');
            }
        }

        let phoneValidator = function(){
            // if(fields.phone === '' || fields.phone === undefined){
            //     if(errors.phone === undefined) errors.phone = [];
            //     errors.phone = [...errors.phone,'請輸入手機'];
            // }
            var reg = /^[0-9]*$/;
            if(fields.phone !== '' && fields.phone !== undefined && !reg.test(fields.phone)){
                if(errors.phone === undefined) errors.phone = [];
                errors.phone = [...errors.phone,'請輸入數字'];
            }
            if(errors.phone !== undefined && errors.phone.length !== 0){
            errors.phone = errors.phone.join(' ');
            }
            
        }

        let emailValidator = function(){
            if(fields.email === '' || fields.email === undefined){
                if(errors.email === undefined) errors.email = [];
                errors.email = [...errors.email,'請輸入信箱'];
            }
            var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(fields.email !== '' && fields.email !== undefined && !reg.test(fields.email)){
                if(errors.email === undefined) errors.email = [];
                errors.email = [...errors.email,'信箱格式錯誤'];
            }
            if(errors.email !== undefined && errors.email.length !== 0){
                errors.email = errors.email.join(' ');
            }
            
        }

        switch (name) {
            case 'name':
                nameValidator(this.props,this.state);
                break;
            case 'phone':
                phoneValidator();
                break;
            case 'email':
                emailValidator();
                break
            default:
                nameValidator(this.props,this.state);
                phoneValidator();
                emailValidator();
                break;
        }

        if(name !== '') originalErrors[name] = errors[name];
        else originalErrors = errors

        this.setState({
            validator:{
                errors:originalErrors
            }
        });

        return Object.keys(originalErrors).length === 0;
    }

    createUsr(){
        if(this.validator()){
            this.props.createUser(this.state.newUsr);
            this.setState({
                newUsr: {
                    id:0,
                    name:"",
                    phone:"",
                    email:"",
                    isModifyElement:false
                },
                isCreateMode:false
            });
        }
    }

    modifyUsr(index){
        if(this.validator()){
            this.props.modifyUser({index,user:this.state.newUsr});
            this.setState({
                newUsr: this.props.users[index]
            });
        }
    }

    render(){
        const state = this.props;
        return(
            <div styleName="user-list">
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton aria-label="Add" onClick={()=>this.handleCreate()} >
                            <Add />
                        </IconButton>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state.users.map((item,index)=>{
                                    if(item.isModifyElement){
                                        return(
                                            <TableRow key={this.state.newUsr.id}>
                                                <TableCell>{this.state.newUsr.id}</TableCell>
                                                <TableCell><TextField
                                                            id="standard-name"
                                                            label="Name"
                                                            value={this.state.newUsr.name}
                                                            margin="normal"
                                                            name="name"
                                                            onChange={(e)=>this.handleInputChange(e)}
                                                            error={this.state.validator.errors.name !== undefined}
                                                            helperText={this.state.validator.errors.name !== undefined ? this.state.validator.errors.name : ''} 
                                                        /></TableCell>
                                                <TableCell><TextField
                                                            id="standard-phone"
                                                            label="Phone"
                                                            value={this.state.newUsr.phone}
                                                            margin="normal"
                                                            name="phone"
                                                            onChange={(e)=>this.handleInputChange(e)}
                                                            error={this.state.validator.errors.phone !== undefined}
                                                            helperText={this.state.validator.errors.phone !== undefined ? this.state.validator.errors.phone : ''} 
                                                        /></TableCell>
                                                <TableCell><TextField
                                                            id="standard-email"
                                                            label="Email"
                                                            value={this.state.newUsr.email}
                                                            margin="normal"
                                                            name="email"
                                                            type="email"
                                                            required
                                                            onChange={(e)=>this.handleInputChange(e)}
                                                            error={this.state.validator.errors.email !== undefined}
                                                            helperText={this.state.validator.errors.email !== undefined ? this.state.validator.errors.email : ''} 
                                                        /></TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="Check" onClick={()=>this.modifyUsr(index)}>
                                                        <Check />
                                                    </IconButton>
                                                    <IconButton aria-label="Clear" onClick={()=>state.cancelModifyUser()}>
                                                        <Clear />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
        
                                    }
        
        
        
                                    return(
                                    <TableRow key={item.id}>
                                        <TableCell>{ item.id }</TableCell>
                                        <TableCell>{ item.name }</TableCell>
                                        <TableCell>{ item.phone }</TableCell>
                                        <TableCell>{ item.email }</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Create" onClick={()=>this.handleModify(index)}>
                                                <Create />
                                            </IconButton>
                                            <IconButton aria-label="Delete" onClick={()=>this.toggleDelUsrConfirm(index)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    )
                                })
                            }
                        
                        {
                            this.state.isCreateMode ? (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell><TextField
                                                label="Name" 
                                                margin="normal" 
                                                name="name" 
                                                error={this.state.validator.errors.name !== undefined}
                                                helperText={this.state.validator.errors.name !== undefined ? this.state.validator.errors.name : ''} 
                                                onChange={(e)=>this.handleInputChange(e)}
                                            /></TableCell>
                                    <TableCell><TextField
                                                label="Phone"
                                                margin="normal"
                                                name="phone" 
                                                error={this.state.validator.errors.phone !== undefined}
                                                helperText={this.state.validator.errors.phone !== undefined ? this.state.validator.errors.phone : ''}
                                                onChange={(e)=>this.handleInputChange(e)}
                                            /></TableCell>
                                    <TableCell><TextField
                                                label="Email" 
                                                name="email" 
                                                type="email"
                                                margin="normal" 
                                                required
                                                error={this.state.validator.errors.email !== undefined}
                                                helperText={this.state.validator.errors.email !== undefined ? this.state.validator.errors.email : ''}
                                                onChange={(e)=>this.handleInputChange(e)}
                                            /></TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Check" onClick={()=>this.createUsr()}>
                                            <Check />
                                        </IconButton>
                                        <IconButton aria-label="Clear" onClick={()=>this.handleCancelCreate()}>
                                            <Clear />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) : null
                        }
                        </TableBody>
                    </Table>
                </Container>
                <Dialog
                    open={this.state.isOpenedConfirmDelMsg}
                    onClose={()=>this.toggleDelUsrConfirm()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"WARNING"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        確定要刪除嗎
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>this.toggleDelUsrConfirm()} color="primary">
                        否
                    </Button>
                    <Button onClick={()=>this.handleDelete(this.state.selectedUsrIndex)} color="primary" autoFocus>
                        是
                    </Button>
                    </DialogActions>
                </Dialog>

            </div>


        )
    };
    
}
  
export default CSSModules(UserList, styles);