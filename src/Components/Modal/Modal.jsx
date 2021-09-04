import React from 'react'
import m from '../../Components/Modal/Modal.module.css'
import component1 from '../../Asets/Images/Component 2.png'

const Modal = ({active, setActive, children})=>{
    return(
        <div className={active ? [m.modal, m.modalActive].join(" ") : m.modal} onClick={() => setActive(false)}>
            <div className={active? [m.content, m.contentActive].join(" ") : m.content} onClick={e => e.stopPropagation()}>
                <div className={m.inside}>
                    <img src={component1}/><h3>Добро пожаловать в DropDisk</h3>
                </div>
            {children}

            </div>
        </div>
    )
}
export default Modal