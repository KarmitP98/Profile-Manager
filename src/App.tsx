import * as React                               from "react";
import "./App.css";
import ForgotPassword                           from './components/ForgotPassword/ForgotPassword';
import Signup                                   from "./components/Signup/Signup";
import {Container}                              from "react-bootstrap";
import UpdateProfile                            from './components/Update-Profile/UpdateProfile';
import {AuthProvider}                           from "./Contexts/AuthContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard                                from "./components/Dashboard/Dashboard";
import Login                                    from "./components/Login/Login";
import PrivateRoute                             from './components/PrivateRoute';
function App() {
    return (
        <Container className="d-flex align-items-center justify-content-center"
                   style={{minHeight: "100vh"}}>
            <div className={"w-100"} style={{maxWidth: "400px"}}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute path='/' component={Dashboard} exact/>
                            <PrivateRoute path='/update-profile' component={UpdateProfile}/>
                            <Route path='/signup' component={Signup}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/forgot-password' component={ForgotPassword}/>
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}

export default App;
