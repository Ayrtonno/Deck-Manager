import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { usePostLoginMutation } from "../../store/api/userApi"

const LoginPage = () => {
    const [login, {data, isLoading}] = usePostLoginMutation()
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const [open, setOpen] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        // deve controllare che ci sia data e che isLoading sia false
        if (data && !isLoading) {
            setMessage(`Welcome back, ${data.user.username}!`)
            setOpen(true)   
        }
    }, [data, isLoading])

    const history = useHistory()
    
    const goToHomepage = () => { history.push("/") }
    
    const onSubmit = async (e) => {
        e.preventDefault()
        login({email, password})       
    }

    return (
        <div>
            Login
            <form onSubmit={onSubmit}>
                <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" onChange={(e) => setPassword(e.target.value)} />
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
