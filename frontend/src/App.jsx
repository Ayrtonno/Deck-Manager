import { useState, useEffect, useMemo } from "react"
import { AppBar, IconButton, Toolbar, TextField, Drawer, ListItem, List, ListItemIcon, ListItemText, Divider, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import { Menu, PersonAdd, AccountCircle, Home, ShoppingCart, ExitToApp} from "@material-ui/icons"
// react router dom è quello che gestisce le rotte
import { Switch, Route } from "react-router-dom"
import { useHistory } from "react-router"

// tu inizi a creare una app che col tempo continua a crescere. man mano che cresce inizio ad avere molte props, molto state e molte callback.
// diventa quindi difficile separare componenti le une dalle altre (tanti file interdipendenti fra loro, tipo albero ma al contrario)
// rischio quindi cosi, che modificando un componente, intacco lo stato degli altri componenti, sputtanando tutto. 
// supponiamo voglio riusare un componente in un altra parte, se è intrecciato con altri componenti diventa difficile "duplicarlo"
// lo STORE (generico del frontend, in questo caso fatto con redux) organizza le informazioni 
// i reducer salvano nello store le informazioni delle dispatch, che interagiscono con i componenti, aggiornandolo
// i selector espongono le informazioni del mio componente
// di per se stora info utili

import classes from "./App.module.css"

import HomePage from "./pages/Homepage/HomePage"
import SignUpPage from "./pages/SignUp/SignUpPage"
import LogInPage from "./pages/Login/LoginPage"
import DeckInfoPage from "./pages/DeckInfo/DeckInfoPage"
import UserInfoPage from "./pages/UserInfo/UserInfoPage"
import { useGetLogoutMutation, useGetUserInfoQuery } from "./store/api/userApi"

// per react quest "App" è un componente funzionale perche è una funzione di per sè.
const App = () => {

    // dispatch serve a collegare le azioni al componente
    // const dispatch = useDispatch();

    // lo state è di react e serve a settare dati locali (che mi servono in questo componente e non ad un altro)
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    // la history mi salva in memoria le pagine visitate
    const history = useHistory()

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
    const goToUserInfo = () => {
        history.push("/user-info")
        setDrawerOpen(false)
    }
    const goToCart = () => {
        history.push("/cart")
        setDrawerOpen(false)
    }

    //questo vvvvv serve a vedere se l'user è gia loggato, e in caso le sue informazioni (quelle che abbiamo nel DB).
    /*
    const [userInfo, setUserInfo] = useState()
    */  


    //questa funzione avverte il backend che deve invalidare la sessione, e sul frontend ripuliamo le informazioni
    /* const goToLogout = () => {
        axios.get("http://localhost:8080/logout").then((response) => {
            setUserInfo()
        })
    } */
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    const {data: userInfo} = useGetUserInfoQuery()

    const [logout, {isLoading, data: logoutResponse, isUninitialized: hasLoggedOut}] = useGetLogoutMutation()

    useEffect(() => {
        if (!isLoading && logoutResponse && !hasLoggedOut) {
            setMessage("You have been Logged Out! BB :c")
            setOpen(true)
            setDrawerOpen(false)
        }
    }, [hasLoggedOut, isLoading, logoutResponse])

    /* // "e" sta per event, 
    const goToLogout = async (e) => {
        // stopPropagation ferma la propagazione dell'evento al DOM (quello che vedo sul browser)
        e.stopPropagation()
        // ogni evento ha un azione di default, in questo caso da NON eseguire
        e.preventDefault()

        await axios.get("http://localhost:8080/logout")
        setMessage("You have been Logged Out! BB :c")
        setOpen(true)
        setDrawerOpen(false)
        // Chiama logout, è un reducer che non ha action e quindi nessun argomento
        dispatch(logout())
    } */

    const isLogged = useMemo(() => userInfo?.id, [userInfo?.id])

    // in app.jsx tengo le cose che voglio vedere in tutte le pagine sempre
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
                    {!isLogged ? (
                        <ListItem button onClick={goToSignUp}>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary={"Sign Up"} />
                        </ListItem>
                    ) : <></>}
                    {!isLogged ? (
                        <ListItem button onClick={goToLogin}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItem>
                    ) : <></>}
                    {isLogged ? (
                        <ListItem button onClick={goToUserInfo}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary={"User Info"} />
                        </ListItem>
                    ) : <></>}
                    {isLogged ? (
                        <ListItem button onClick={goToCart}>
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            <ListItemText primary={"Cart"} />
                        </ListItem>
                    ) : <></>}
                    <Divider />
                    {isLogged ? (
                        <ListItem button onClick={() => logout()}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    ) : <></>}

                </List>
            </Drawer>

            {/* switch è un componente di react router dom che visualizza in automatico la pagina giusta in base alla rotta specificata */}
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
                <Route path="/deck-info/:deckId" exact>
                    <DeckInfoPage />
                </Route>
                <Route path="/user-info" exact>
                    <UserInfoPage />
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

//prova a fare get logout (mutation simile a login) e la pagina con informazioni dell'utente
//domani validare i form