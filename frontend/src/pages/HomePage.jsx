import React from "react"
import Card from "@material-ui/core/Card";

import classes from "./HomePage.module.css"
import { CardContent } from "@material-ui/core";

const HomePage = (props) => {
    return (
        <div className={classes.quadratone}>
            <Card>
                <CardContent>
                    All Decks List
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    Base Decks
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    Premium Decks
                </CardContent>
            </Card>
        </div>
    );
};

export default HomePage;
