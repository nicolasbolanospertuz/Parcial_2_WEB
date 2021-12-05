import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MySpaces from "../MySpaces/MySpaces";

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <MySpaces/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;