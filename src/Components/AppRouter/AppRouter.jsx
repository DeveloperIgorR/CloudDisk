import { useContext } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { AuthContext } from "../../context"
import { privateRoutes, publicRoutes } from "../../router/routs"

const AppRouter = () => {
    const {isAuth,setIsAuth} = useContext(AuthContext)
    return(
        isAuth
        ?
        <Switch>
          {privateRoutes.map(route =>
            <Route
              component={route.component}
              path={route.path}
              exact={route.exact}
              key={route.path} />
          )}
          <Redirect to='/' />
        </Switch>   
         :
        <Switch>
          {publicRoutes.map(route =>
            <Route
              component={route.component}
              path={route.path}
              exact={route.exact}
              key={route.path}/>
          )}
          <Redirect to='/auth' />
        </Switch>
    )
}
export default AppRouter