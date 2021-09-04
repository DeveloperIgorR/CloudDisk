import l from './Loader.module.css'

const Loader = () => {
    return(
        <div className={l.ldsSpinner}>
         <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}
export default Loader