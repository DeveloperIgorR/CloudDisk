import Authorization from "../Pages/Authorization/Authorization";
import Disk from "../Pages/Disk/Disk";
import Profile from "../Pages/Profile/Profile";

export const privateRoutes = [
    {path: '/', component: Disk, exact:true},
    {path: '/profile', component: Profile, exact:true},    
]

export const publicRoutes = [
    {path: '/auth', component: Authorization, exact:true},
]