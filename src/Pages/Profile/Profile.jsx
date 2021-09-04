import p from './Profile.module.css'
import diskLogo from '../../Asets/Images/Component 1.png'
import component2 from '../../Asets/Images/carbon_user-avatar-filled.png'
import component3 from '../../Asets/Images/ProfileImage.png'
import backLogo from '../../Asets/Images/Group 2.png'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Profile = () => {
    const[user,setUser] = useState({name:'Igor Romanovich',
    post:'example@box.com', freeSpace:'6 Gb'}) 
    
    const router = useHistory()

    return(
        <div className={p.profile}>
            <div className={p.top}>
                <div className={p.component1}>
                    <img  src={diskLogo} /> <p>Dropdisk</p>
                </div>
                <div className={p.component2}>
                    <input placeholder='Search in disk' />
                </div>
                <div className={p.backLogo}>
                    <button onClick={() => router.push('/')}><img src={backLogo}/></button>
                </div>
                <div className={p.component3}>
                     <input value={user.name}/>
                     <img src={component2}/>
                </div>
            </div>
            <div className={p.bottom}>
                <div className={p.component4}>
                    <img src={component3}/>
                    <input value={user.name}/>                    
                </div>
                <div className={p.component5}>
                    <input value={`email: ${user.post}`}/>
                    <input value={` free space: ${user.freeSpace}`} />
                </div>
                <div className={p.component6}>
                    <button>Сменить пароль</button>
                    <button>Очистить диск</button>
                </div>
            </div>

        </div>
    )
}
export default Profile