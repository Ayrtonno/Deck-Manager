import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import * as yup from 'yup';

import { usePostLoginMutation } from "../../store/api/userApi"

let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  });

const LoginPage = () => {
    const [login, {data: user, isLoading}] = usePostLoginMutation()
    
    const [email, setEmail] = useState()
    const [emailError, setEmailError] = useState()
    const [password, setPassword] = useState()
    const [passwordError, setPasswordError] = useState()

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        // deve controllare che ci sia data e che isLoading sia false
        if (user?.username && !isLoading) {
            setMessage(`Welcome back, ${user.username}!`)
            setOpen(true)   
        }
    }, [user?.username, isLoading])

    const history = useHistory()
    
    const goToHomepage = () => { history.push("/") }
    
    const onSubmit = async (e) => {
        try {
        e.preventDefault()
        const isValid = await schema.validate({email, password})           
        login({email, password})       
        } catch (error) {
            console.log({...error})
            /* debugger */
            if (error.path == "email") {
                setEmailError(error.errors[0])
            } 
            else {
                setPasswordError(error.errors[0])
            }
        }
    }

    return (
        <div>
            Login
            <form onSubmit={onSubmit}>
                
                <TextField helperText={emailError} error={!!emailError} label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField helperText={passwordError} error={!!passwordError} label="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" type="submit">Login</Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>
                        Login
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={goToHomepage}>
                            Go To Homepage
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    )
}

export default LoginPage
