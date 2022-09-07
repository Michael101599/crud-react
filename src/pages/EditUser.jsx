import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/actions';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        '& > :not(style)': {
            m: 1,
            width: '45ch', 
            marginTop: '10px'
        },
    },
}))

export default function EditUser(){

    const [state, setState] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    })

    const {name, email, contact, address} = state;
    let {id} = useParams();
    const [error, setError] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, []);

    const {user} = useSelector((state) => state.data);

    useEffect(() => {
        if(user){
            setState({...user})
        }
    }, [user])

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
            dispatch(updateUser(state, id));
            navigate('/');
            setError('')
        }
    }

    const classes = useStyles();

    return(
        <div>
            <Button style={{width: '100px', marginTop: '40px'}} variant="contained" color='secondary' onClick={() => navigate('/')} >Go Back</Button>
            <h2>Edit User</h2>
            {error && <h3 style={{color: 'red'}} >{error}</h3>}
            <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit} >
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name || ''} name='name' type='text' onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email || ''} name='email' type='email' onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="Contact" variant="outlined" value={contact || ''} name='contact' type='number' onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="Address" variant="outlined" value={address || ''} name='address' type='text' onChange={handleInputChange} />
                <br />
                <Button style={{width: '100px'}} variant="contained" color='primary' type='submit' >Update</Button>
            </form>
        </div>
    )
}