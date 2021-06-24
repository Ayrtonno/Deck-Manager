import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {useGetUserInfoQuery } from "../../store/api/userApi"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const UserInfoPage = () => {

    const {data: user} = useGetUserInfoQuery()

    const classes = useStyles();
  
   return (
       <div>
            <h2>{user?.username}</h2>
            <br/>     
            <h3>{user?.firstName}</h3>
            <br/>
            <h3>{user?.lastName}</h3>
            <br/>
            <h3> {user?.address + ", " + user?.city + ", " + user?.nation}</h3>
            <br/>
            <h3>{user?.phoneNumber}</h3>
            <br/>

            <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
            </IconButton>
            </label>
            </div>
            {/* <div>
                {JSON.stringify(user)}
            </div> */}
        </div>
    )
}

export default UserInfoPage;