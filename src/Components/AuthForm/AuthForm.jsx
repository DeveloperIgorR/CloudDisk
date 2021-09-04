import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthorizationService from '../../API/AuthorizationService/AuthorizationService'
import { instance } from '../../API/instance'
import { AuthContext } from '../../context'
import a from './AuthForm.module.css'

const AuthForm = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[emailDirty,setEmailDirty] = useState('')
    const[passwordDirty,setPasswordDirty] = useState('')
    const[emailError,setEmailError] = useState('Email не может быть пустым')
    const[passwordError,setPasswordError] = useState('Пароль не может быть пустым')
    const[formValid,setFormValid] = useState(false)
    const[user,setUser] = useState('')
    const router = useHistory()
    const{isAuth,setIsAuth} = useContext(AuthContext)

    useEffect (() => {
        if(emailError || passwordError){
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[emailError,passwordError])
 
    async function login (){
        try {
        const response = await AuthorizationService.auth(email, password)
        setUser(response.data.user)           
        localStorage.setItem('token',response.data.token)
        router.push(`/`)
        } catch(e) {
            console.log(e)
        } finally{
            setIsAuth(true)
        }
    }  
    
    const blurHandler = (event) => {
        switch(event.target.name){
            case 'email':
                setEmailDirty(true)
                break 
            case 'password':
                setPasswordDirty(true)
                break  
        }

    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(event.target.value).toLowerCase())){
            setEmailError('Некорректный email')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
        if(event.target.value.length < 2 || event.target.value.length > 8){
            setPasswordError('Пароль должен быть не менее 2-х и не более 8 символов')
            if(!event.target.value){
                setPasswordError('Пароль не может быть пустым')
            }            
        } else {
            setPasswordError('')
        }
    }    
    
    return (
        <div className={a.window}>
            <h3>Авторизация</h3>
            <div className={a.component1}>

                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                <input type= 'email' value={email} name = 'email' onBlur={blurHandler} onChange={event => emailHandler(event)} placeholder='Введите адрес электронной почты ...'/>

                {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                <input type= 'password' value={password} name = 'password' onBlur={blurHandler} onChange={event => passwordHandler(event)} placeholder='Введите пароль ...'/> 

            </div>
            <div className={a.component2}>

                <div className={a.component4}>
                    <input type='checkbox'/><p>Запомнить меня?</p>
                </div>
                <button disabled={!formValid} onClick={login}>Войти</button>

            </div>
            <div className={a.component3}>
                 <button>Забыли пароль?</button>
            </div>
        </div>
    )
}
export default AuthForm