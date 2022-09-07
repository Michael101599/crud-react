import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';

const useStyles = makeStyles(() => ({
    root: {
        '& > :not(style)': {
            m: 1,
            width: '45ch', 
            marginTop: '10px'
        },
    },
}))

export default function AddUser(){

    const [state, setState] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    })

    const {name, email, contact, address} = state;
    const [error, setError] = useState('');

    const classes = useStyles();

    let navigate = useNavigate();
    let dispatch = useDispatch()

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({
            ...state, 
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact || !address){
            setError('Please input the fields')
        }else{
            dispatch(addUser(state));
            navigate('/');
            setError('')
        }
    }

    return(
        <div>
            <Button style={{width: '100px', marginTop: '40px'}} variant="contained" color='secondary' onClick={() => navigate('/')} >Go Back</Button>
            <h2>Add User</h2>
            {error && <h3 style={{color: 'red'}} >{error}</h3>}
            <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit} >
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} name='name' type='text' onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email} name='email' type='email' onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="Contact" variant="outlined" value={contact} name='contact' type='number' onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="Address" variant="outlined" value={address} name='address' type='text' onChange={handleInputChange} />
                <br />
                <Button style={{width: '100px'}} variant="contained" color='primary' type='submit' >Submit</Button>
            </form>
        </div>
    )
}