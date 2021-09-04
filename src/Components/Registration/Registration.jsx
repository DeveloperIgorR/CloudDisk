import { useEffect, useState } from 'react'
import AuthorizationService from '../../API/AuthorizationService/AuthorizationService'
import { instance } from '../../API/instance'
import r from './Registration.module.css'

const Registration = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState('')
    const [passwordDirty, setPasswordDirty] = useState('')
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [user, setUser] = useState('')
    const [checked,setChecked] = useState(false)

    useEffect(() => {
        if (emailError || passwordError || checked == false) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError,checked])
    
    async function registration() {
        try {
            const response = await AuthorizationService.reg(email, password)            
        } catch (e) {
            console.log(e)            
        } finally{
            props.setRegistration(false)
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

        <div className={r.window}>
            <h3>Регистрация</h3>
            <div className={r.component1}>
                <input type= 'text' value={user} onChange={event => setUser(event.target.value)} placeholder='Введите имя пользователя ...' />

                {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                <input type= 'password' value={password} name = 'password' onBlur={blurHandler} onChange={event => passwordHandler(event)} placeholder='Введите пароль ...'/> 

                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                <input type= 'email' value={email} name = 'email' onBlur={blurHandler} onChange={event => emailHandler(event)} placeholder='Введите адрес электронной почты ...'/>

            </div>
            <div className={r.component2}>
                <input type='checkbox' checked={checked} onChange={() => setChecked(!checked)} /><p>Согласен с условиями соглашения</p>
                <button disabled={!formValid} onClick={registration}>Войти</button>
            </div>
        </div>
    )
}
export default Registration