import { useState, useEffect } from "react"
import axios from "axios"
import { AppBar, IconButton, Toolbar, TextField, Drawer, ListItem, List, ListItemIcon, ListItemText, Divider, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import { Menu, PersonAdd, AccountCircle, Home, ShoppingCart, ExitToApp } from "@material-ui/icons"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useHistory } from "react-router"


import classes from "./App.module.css"

import HomePage from "./pages/Homepage/HomePage"
import SignUpPage from "./pages/SignUp/SignUpPage"
import LogInPage from "./pages/Login/LoginPage"

// per react quest "App" è un componente funzionale perche è una funzione di per sè.
const App = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const history = useHistory(

    )
    const goToSignUp = () => {
        history.push("/sign-up")
        setDrawerOpen(false)
    }
    const goToLogin = () => {
        history.push("/login")
        setDrawerOpen(false)
    }
    const goToHomePage = () => {
        history.push("/")
        setDrawerOpen(false)
    }
    const goToCart = () => {
        history.push("/cart")
        setDrawerOpen(false)
    }
    //questo vvvvv serve a vedere se l'user è gia loggato, e in caso le sue informazioni (quelle che abbiamo nel DB).
    const [userInfo, setUserInfo] = useState()
    useEffect(() => {
        axios.get("http://localhost:8080/user-info").then((response) => {
            setUserInfo(response.data.user)
        })
    }, [])

    //questa funzione avverte il backend che deve invalidare la sessione, e sul frontend ripuliamo le informazioni
    /* const goToLogout = () => {
        axios.get("http://localhost:8080/logout").then((response) => {
            setUserInfo()
        })
    } */
    const [open, setOpen] = useState()
    const [message, setMessage] = useState()

    const goToLogout = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        await axios.get("http://localhost:8080/logout")
        setUserInfo()
        setMessage("You have been Logged Out! BB :c")
        setOpen(true)
        setDrawerOpen(false)
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar classes={{ root: classes.toolbar }}>
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h3" >
                        Holy War Deck Shop
                    </Typography>
                    <TextField label="Search for a Deck..." />
                </Toolbar>
            </AppBar>

            <Drawer anchor={"left"} open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem button onClick={goToHomePage}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={"Homepage"} />
                    </ListItem>
                    <Divider />
                    {!userInfo ? (
                        <ListItem button onClick={goToSignUp}>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary={"Sign Up"} />
                        </ListItem>
                    ) : <></>}
                    {!userInfo ? (
                        <ListItem button onClick={goToLogin}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItem>
                    ) : <></>}
                    {userInfo ? (
                        <ListItem button onClick={goToCart}>
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            <ListItemText primary={"Cart"} />
                        </ListItem>
                    ) : <></>}
                    <Divider />
                    {userInfo ? (
                        <ListItem button onClick={goToLogout}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    ) : <></>}

                </List>
            </Drawer>

            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/sign-up" exact>
                    <SignUpPage />
                </Route>
                <Route path="/login" exact>
                    <LogInPage />
                </Route>
            </Switch>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    Logout
                        </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setOpen(false)}>
                        Close
                            </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default App


