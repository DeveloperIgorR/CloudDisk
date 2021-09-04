import a from './Authorization.module.css'
import diskIcon from '../../Asets/Images/Component 1.png'
import Modal from '../../Components/Modal/Modal'
import { useState } from 'react'
import Registration from '../../Components/Registration/Registration'
import AuthForm from '../../Components/AuthForm/AuthForm'

const Authorization = () => {
   const [registration,setRegistration] = useState(false)
   const [auth,setAuth] = useState(false)

    return (
        <div className={a.authorization}>
            <div className={a.top}>
                <div className={a.diskField}>
                    <img src={diskIcon} /> <p>Dropdisk</p>
                </div>
                <div >
                    <button onClick={() =>setAuth(true) }>Войти</button>
                    <button onClick={() =>setRegistration(true) }>Регистрация</button>
                </div>
            </div>
            <div className={a.bottom}>
            <Modal active={registration} setActive={setRegistration} >
                  <Registration setRegistration={setRegistration}/>
            </Modal>
            <Modal active={auth} setActive={setAuth} >
                  <AuthForm setAuth={setAuth}/>
            </Modal>

            </div>

        </div>
    )
}
export default Authorization