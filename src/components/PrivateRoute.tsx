import React     from 'react';
import {Route, Redirect}   from 'react-router-dom'
import {useAuth} from '../Contexts/AuthContext';
// @ts-ignore
function PrivateRoute({component: Component, ...rest}) {
  const {currentUser} = useAuth()
  return (
    <Route {...rest}
    render = {(props:any) => {
      return currentUser ? <Component {...props}/> : <Redirect to={'/login'}/>
    }}>
    </Route>
  );
}

export default PrivateRoute;
