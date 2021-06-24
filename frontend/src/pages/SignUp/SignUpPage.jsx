import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"

const SignUpPage = () => {
    /*con ref posso accedere direttamente ad un elemento della pagina, in questo caso sul text field email
    const emailRef = useRef() */
    const [userObj, setUserObj] = useState({})
    const handleChange = (key, value) => {
        setUserObj((userObj) => {
            userObj[key] = value
            return userObj
        })
    }

    const [open, setOpen] = useState()
    const [message, setMessage] = useState()

    const history = useHistory()

    const goToHomepage = () => { history.push("/") }

    const onSubmit = async (e) => {
        e.preventDefault()
        //nella post, i due elementi sono: ("URL", {body}) (come quello di insomnia) 
        const response = await axios.post('http://localhost:8080/sign-up', {
            email: userObj.email,
            username: userObj.username,
            password: userObj.password,
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            address: userObj.address,
            city: userObj.city,
            nation: userObj.nation,
            phoneNumber: userObj.phoneNumber,
        })
        setMessage(response.data)
        setOpen(true)
    }

    return (
        <div>
            Sign Up
            <form onSubmit={onSubmit}>
                <TextField label="Email" onChange={(e) => handleChange("email", e.target.value)}  /* ref={emailRef} */ />
                <TextField label="Username" onChange={(e) => handleChange("username", e.target.value)} />
                <TextField label="Password" onChange={(e) => handleChange("password", e.target.value)} />
                <TextField label="First Name" onChange={(e) => handleChange("firstName", e.target.value)} />
                <TextField label="Last Name" onChange={(e) => handleChange("lastName", e.target.value)} />
                <TextField label="Address" onChange={(e) => handleChange("address", e.target.value)} />
                <TextField label="City" onChange={(e) => handleChange("city", e.target.value)} />
                <TextField label="Nation" onChange={(e) => handleChange("nation", e.target.value)} />
                <TextField label="Phone Number" onChange={(e) => handleChange("phoneNumber", e.target.value)} />
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
