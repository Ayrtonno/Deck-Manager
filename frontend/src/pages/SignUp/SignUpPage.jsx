import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import React, { useRef, useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"

const SignUpPage = () => {
    /*con ref posso accedere direttamente ad un elemento della pagina, in questo caso sul text field email
    const emailRef = useRef() */
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [open, setOpen] = useState()
    const [message, setMessage] = useState()

    const history = useHistory()

    const goToHomepage = () => { history.push("/") }

    const onSubmit = async (e) => {
        e.preventDefault()
        //nella post, i due elementi sono: ("URL", {body}) (come quello di insomnia) 
        const response = await axios.post('http://localhost:8080/sign-up', {
            email: email,
            username: username,
            password: password
        })
        setMessage(response.data)
        setOpen(true)
    }

    return (
        <div>
            Sign Up
            <form onSubmit={onSubmit}>
                <TextField label="Email" onChange={(e) => setEmail(e.target.value)}  /* ref={emailRef} */ />
                <TextField label="Username" onChange={(e) => setUsername(e.target.value)} />
                <TextField label="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" type="submit">Sign Up</Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>
                        Sign Up
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

export default SignUpPage
