import d from './Disk.module.css'
import arrowLogo from '../../Asets/Images/Vector 3.png'
import backLogo from '../../Asets/Images/Group 2.png'
import downloadLogo from '../../Asets/Images/ant-design_cloud-download-outlined.png'
import { useEffect, useMemo, useState } from 'react'
import FileList from '../../Components/FilesList/FileList'
import Navbar from '../../Components/Navbar/Navbar'
import Modal from '../../Components/Modal/Modal'
import CreateFolder from '../../Components/CreateFolder/CreateFolder'
import SortSelectors from '../../Components/SortSelectors/SortSelectors'
import Loader from '../../Components/UI/Loader/Loader'
import DiskSpace from '../../Components/UI/DiskSpace/DiskSpace'
import FileService from '../../API/FileService/FileService'


const Disk = () => {
    const [favourites, setFavourites] = useState([])
    const [files, setFiles] = useState([])   
    const [selectedSort, setSelectedSort] = useState('')
    const [searchFolder, setSearchFolder] = useState('')
    const [type, setType] = useState('')
    const [sortedtype, setSortedType] = useState('')
    const [active, setActive] = useState(false)
    const [activeChild, setActiveChild] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [parentDir, setParentDir] = useState(null)
    const [previosDir, setPreviosDir] = useState([])        

    let addNewFile = (newFile) => {
        setFiles([...files, newFile])
    }
    
    useEffect(() => {
        getFiles()
        const data = JSON.parse(localStorage.getItem('favourites')) || []
        setFavourites(data)
    }, [parentDir])    

    async function getFiles() {
        setFetching(true)
        try {
            const response = await FileService.receiveFiles(parentDir)
            setFiles(response.data) 
            console.log(response.data)           
            
        } catch (e) {
            console.log(e)
        } finally{
            setFetching(false)
        }
    }  

    async function delFiles(event){
        console.log(event._id)
        setFetching(true)
        try{
            const response = await FileService.deleteFiles(event._id)
            let filtredFiles = files.filter(i => event._id != i._id )  
            setFiles(filtredFiles)                 
            
        } catch (e) {
            console.log(e.response)
        } finally{
            setFetching(false)
        }
    }

    const sortedArr = [...files].sort((a, b) => String(a[selectedSort]).localeCompare(b[selectedSort]))

    const sortedFolder = useMemo(() => {
        return sortedArr.filter(currentFolder => currentFolder.name.toLowerCase().includes(searchFolder))
    }, [searchFolder, sortedArr])

    let sortByEvent = (event) => {
        let field = event.target.value 
        setSelectedSort(field)             
        setFiles(sortedArr)        
    }
    let sortBySize = (user) => {                
        setSelectedSort(user)  
        setFiles(sortedArr)
        setSortedType('FROM_SMALL_TO_BIG')
    }    
    
    function onHeartIconClick(currentFolder){
        const newFaworites = [...favourites,currentFolder]
        setFavourites(newFaworites)
        localStorage.setItem('favourites', JSON.stringify(newFaworites))
    }

    return (
        <div className={d.disk}>

            <Navbar
                searchFolder={searchFolder}
                setSearchFolder={setSearchFolder}
            />

            <div className={d.favourite}>
            <h2>Избранное</h2>
                {favourites.map((i) => {
                    return <div key={i._id} className={d.folder} >
                        <button><img src={arrowLogo} /></button>
                        <a>{i.name}</a>
                    </div>
                })} 
                <DiskSpace/>               
            </div>

            <div className={d.openFolder}>

                <div className={d.header}>
                    { parentDir === null
                        ? <button  disabled><img src={backLogo} /></button>
                        : <button  onClick={() => setParentDir(previosDir.pop())}><img src={backLogo} /></button>
                    }
                    <h2>Files</h2>
                    <button><img src={downloadLogo} /></button>
                </div>

                <div className={d.createButton}>
                    <div className={d.topLineButton}>
                        <button onClick={() => setActiveChild(true)}>Create new folder</button>
                        <Modal active={activeChild} setActive={setActiveChild}>
                            <CreateFolder
                                parentDir={parentDir}
                                setActiveChild={setActiveChild}
                                addNewFile={addNewFile}
                                fetching={fetching}
                                setFetching={setFetching}
                            />
                        </Modal>
                    </div>

                    <SortSelectors                        
                        setType={setType}                        
                        setSortedType={setSortedType}                        
                        sortByEvent={sortByEvent} 
                        sortBySize={sortBySize} 
                        sortedtype={sortedtype} />
                </div>

                {
                (type === 'LIST') 
                ? <div className={d.nameField}>
                    <div>
                        <p>Name</p>
                    </div>
                    <div className={d.nameFieldRight}>
                        <p>Date</p>
                        <p>Size</p>
                    </div>
                 </div>
                : <div className={d.bottomLine}></div>
                } 
                
                {fetching
                    ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
                    : <FileList
                        files={sortedFolder}
                        type={type}
                        delFiles={delFiles}
                        setParentDir={setParentDir}
                        setPreviosDir={setPreviosDir}                         
                        previosDir={previosDir} 
                        parentDir={parentDir}
                        onHeartIconClick={onHeartIconClick}                                        
                        />}

            </div>

        </div>
    )
}
export default Disk