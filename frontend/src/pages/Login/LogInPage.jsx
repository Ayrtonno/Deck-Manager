import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import React, { useRef, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"

const LoginPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [open, setOpen] = useState()
    const [message, setMessage] = useState()
    const history = useHistory()
    const goToHomepage = () => { history.push("/") }
    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8080/login', {
            email: email,
            password: password
        })
        setMessage(`Welcome back, ${response.data.user.username}!`)
        setOpen(true)
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
