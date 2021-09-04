import d from './DiskSpace.module.css'

const DiskSpace = () => {
    let value = '10%'
    let space = 1
    return (
        <div>
            <div className={d.OutsideWrapper}>
                <div style={{ width: value, height: '20px', borderRadius: '13px', backgroundColor: '#566885' }}></div>
            </div>
            <div style={{color:'white',paddingTop:'5px'}}>
                {`Свободно${space}/10Гб`}
            </div>            
        </div>

    )
}
export default DiskSpace