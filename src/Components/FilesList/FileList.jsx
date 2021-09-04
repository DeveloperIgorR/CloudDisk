import f from './FileList.module.css'
import bigFolder from '../../Asets/Images/fxemoji_filefolder (2).png'
import bigerFolder from '../../Asets/Images/fxemoji_filefolder (3).png'
import downloadIcon from '../../Asets/Images/ant-design_cloud-download-outlined (1).png'
import smallFolder from '../../Asets/Images/fxemoji_filefolder.png'
import deleteIcon from '../../Asets/Images/Vector 9.png'
import heartIcon from '../../Asets/Images/heart-svgrepo-com 1.svg'

const FileList = (props) => {

   function onDoubleClick (event){
    props.setParentDir(event)
    props.setPreviosDir([...props.previosDir,props.parentDir])
   }   

    switch (props.type ) { 
        case'LIST':
        return (
            <div>
                {props.files.map((currentFolder) => {
                    return <div key={currentFolder._id} className={f.openFolders}>
                        <div className={f.leftGroopIcons}>
                            <button><img src={downloadIcon} />
                            </button><img onDoubleClick={() => onDoubleClick(currentFolder._id)} src={smallFolder} />
                            <p>{currentFolder.name}</p>
                        </div>
                        <div className={f.rightGroopIcons}>
                            <p>{currentFolder.date}</p>
                            <p>{currentFolder.size}</p>
                            <button onClick={() => props.delFiles(currentFolder)}><img src={deleteIcon} /></button>
                            <button onClick={() => props.onHeartIconClick(currentFolder)} ><img src={heartIcon} /></button>
                        </div>
                    </div>
                })}
            </div>
        )
        case'PLATE':
        return(
            <div className={f.openGroopFolders}>
                {props.files.map((currentFolder) => {
                    return <div key={currentFolder._id} >                        
                        <div className={f.iconGroop} >                            
                            <button ><img onDoubleClick={() => onDoubleClick(currentFolder._id)} src={bigFolder} /></button>
                            <p>{currentFolder.name}</p>
                        </div>
                    </div>
                })}
            </div>
        )
        case'BIG_PLATE':
        return(
            <div className={f.openGroopFolders}>
                {props.files.map((currentFolder) => {
                    return <div key={currentFolder._id}>                        
                        <div className={f.bigIconGroop} >                            
                            <button ><img  onDoubleClick={() => onDoubleClick(currentFolder._id)} src={bigerFolder} /></button>
                            <p>{currentFolder.name}</p>
                        </div>
                    </div>
                })}
            </div>
        )
        default:
        return (
            <div>
                {props.files.map((currentFolder) => {
                    return <div key={currentFolder._id} className={f.openFolders}>
                        <div className={f.leftGroopIcons}>
                            <button><img src={downloadIcon} />
                            </button><img onDoubleClick={() => onDoubleClick(currentFolder._id)} src={smallFolder} />
                            <p>{currentFolder.name}</p>
                        </div>
                        <div className={f.rightGroopIcons}>
                            <p>{currentFolder.date}</p>
                            <p>{currentFolder.size}</p>
                            <button onClick={() => props.delFiles(currentFolder)}><img src={deleteIcon} /></button>
                            <button onClick={() => props.onHeartIconClick(currentFolder)} ><img src={heartIcon} /></button>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

export default FileList