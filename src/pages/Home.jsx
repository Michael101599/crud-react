import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, loadUsers } from "../redux/actions";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@mui/styles';
import {useNavigate} from 'react-router-dom';

const useButtonStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
    },
},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function Home(){

    const buttonStyles = useButtonStyles()

    let dispatch = useDispatch();
    const {users} = useSelector(state => state.data)

    let navigate = useNavigate();
    
    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    const handleDelete = (id) => {
        if(window.confirm("Are you sure want to delete the user?")){
            dispatch(deleteUser(id));
        }
      }

    return(
        <div>
            <div className={buttonStyles.root} >
                <Button style={{marginTop: '10px', marginBottom: '10px'}} variant="contained" color='primary' onClick={() => navigate('/addUser')} >Add User</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Contact</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    {<TableBody>
                    {users && users.map((user) => (
                        <StyledTableRow key={user.id}>
                        <StyledTableCell component="th" scope="row">
                            {user.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{user.email}</StyledTableCell>
                        <StyledTableCell align="center">{user.contact}</StyledTableCell>
                        <StyledTableCell align="center">{user.address}</StyledTableCell>
                        <StyledTableCell align="center">
                            <div className={buttonStyles.root} >
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button style={{marginRight: '5px'}} color='secondary' onClick={() => handleDelete(user.id)}>Delete</Button>
                                    <Button color='primary' onClick={() => navigate(`/editUser/${user.id}`)}>Edit</Button>
                                </ButtonGroup>
                            </div>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>}
                </Table>
            </TableContainer>
        </div>
    )
}