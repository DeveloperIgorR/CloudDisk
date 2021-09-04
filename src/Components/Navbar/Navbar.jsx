import n from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import diskIcon from '../../Asets/Images/Component 1.png'
import avaIcon from '../../Asets/Images/carbon_user-avatar-filled.png'
import { AuthContext } from '../../context'
import { useContext } from 'react'

const Navbar = (props) => {
    const{isAuth,setIsAuth} = useContext(AuthContext)
    const{searchFolder,setSearchFolder} = useContext(AuthContext)
    function logOut(){
        localStorage.clear()
        setIsAuth(false)
    }

    return(
        <div className={n.auth}>

                <div className={n.authField}>

                    <div className={n.diskField}>
                        <img src={diskIcon} /> <p>Dropdisk</p>
                    </div>

                    <div className={n.searchField}>
                        <input placeholder='Search in disk' 
                        value={searchFolder} onChange={event => setSearchFolder(event.target.value)}/>
                    </div>

                    <div className={n.profileField}>
                        {(isAuth)
                        ? <button onClick={logOut}>Выйти</button>
                        : <NavLink to={'/auth'}><button>Log in</button></NavLink>}
                        <NavLink to={'/profile'}><img src={avaIcon} /></NavLink>
                    </div>

                </div>
            </div>
    )
}
export default Navbar