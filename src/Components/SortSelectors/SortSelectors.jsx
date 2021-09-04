import BigPlateLogo from '../../Components/Icons/BigPlateLogo'
import ListLogo from '../../Components/Icons/ListLogo'
import PlateLogo from '../../Components/Icons/PlateLogo'
import SortLogo from '../../Components/Icons/SortLogo'
import s from './SortSelectors.module.css'

const SortSelectors = (props) => {
    let sortOptions = [
        { value: 'name', name: 'сортировка по названию' },
        { value: 'date', name: 'сортировка по дате' }
    ]    
    let user = '_id'//сделал id , потому что size везде 0 пока
    return (
        <div className={s.selections}>
            <button onClick={() => props.sortBySize(user)}><SortLogo type={props.sortedtype} /></button>
            <select onChange={event => props.sortByEvent(event)}>
                <option selected disabled value=''>Name</option>
                {sortOptions.map((el) => {
                    return <option key={el.value} value={el.value}>{el.name}</option>
                })}
            </select>
            <button onClick={() => props.setType('BIG_PLATE')}><BigPlateLogo type={props.type} /></button>
            <button onClick={() => props.setType('PLATE')}><PlateLogo type={props.type} /></button>
            <button onClick={() => props.setType('LIST')}><ListLogo type={props.type} /></button>
        </div>
    )
}
export default SortSelectors