import React, { useState, useEffect } from 'react'
import '../styles.css'
import styled from 'styled-components'
import darkBgImgDesktop from '../images/bg-desktop-dark.jpg'
import lightBgImgDesktop from '../images/bg-desktop-light.jpg'
import { ReactComponent as SunIcon } from '../images/icon-sun.svg'
import { ReactComponent as MoonIcon } from '../images/icon-moon.svg'
import CreateTask from './CreateTask'
import Loader from './Loader'
import TasksList from './TasksList'
import TasksListFooter from './TasksListFooter'
import { DragDropContext } from 'react-beautiful-dnd'
import {
    getData,
    addNewTask,
    batchDelete,
    singleDelete,
    changeStatus,
    createNewOrderedArray,
} from './Data'

//styled components//
const BackgroundImage = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(235, 21%, 11%)' : 'hsl(0, 0%, 98%)'};
`

const UnitWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 5%;
    left: 10%;
    @media (min-width: 768px) {
        width: 40%;
        left: 30%;
    }
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    color: hsl(236, 33%, 92%);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 2px;
    @media (min-width: 768px) {
        font-size: 1rem;
        letter-spacing: 10px;
        padding: 1rem;
    }
`

const App = () => {
    const [savedTask, setSavedTask] = useState([])
    const [chosenFilter, setChosenFilter] = useState('')
    const [theme, setTheme] = useState('dark')
    const [isLoading, setIsLoading] = useState(false)

    const getTasks = async () => {
        setIsLoading(true)
        const result = await getData()
        setSavedTask(result)
    }
    useEffect(() => {
        getTasks()
        console.log('useEffect is running')
        return setIsLoading(false)
    }, [])

    // creation of new task and saved in savedTask array//
    const handleNewTask = async (item) => {
        let orderNumber = savedTask.length

        // const newTask = {content: item, status:'Active'}
        // setSavedTask(prevTasks => [...prevTasks, newTask])
        await addNewTask(item, orderNumber)
        await getTasks()
    }

    //identify which filter was selected, BATCH DELETE tasks with completed status, save chosen filter in state to be used for conditional rendering//
    const requestFilter = (filterId) => {
        if (filterId === 'deleteCompletedFilter') {
            const clearCompleted = async () => {
                //     setSavedTask((prevValues) => {
                //     return prevValues.filter((task) => task.status === 'Active')
                // })
                await batchDelete()
                await getTasks()
            }
            clearCompleted()
        } else {
            setChosenFilter(filterId)
        }
    }

    //delete one task by id//
    const deleteOne = async (id) => {
        // setSavedTask((prevValues) => {
        //     return prevValues.filter((task, index) => index !== id)
        // })
        await singleDelete(id)
        await getTasks()
    }

    //change status of tasks//
    const markAsDone = async (id) => {
        // setSavedTask((prevValues) => {
        //     let chosenTask = prevValues[id]
        //     if (chosenTask.status === 'Active') {
        //         prevValues[id] = { ...chosenTask, status: 'Completed' }
        //     }
        //     if (chosenTask.status === 'Completed') {
        //         prevValues[id] = { ...chosenTask, status: 'Active' }
        //     }
        //     return [...prevValues]
        // })
        await changeStatus(id)
        await getTasks()
    }

    //save chosen theme in state for conditional rendering//
    const changeTheme = () => {
        setTheme((prevValue) => {
            if (prevValue === 'dark') {
                return 'light'
            } else {
                return 'dark'
            }
        })
    }

    //save new index of task after drag//
    const handleOnDragEnd = async (result) => {
        const { destination, source } = result
        if (!destination) {
            return
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        const newSavedTask = Array.from(savedTask)
        const [reorderedItem] = newSavedTask.splice(source.index, 1)
        newSavedTask.splice(destination.index, 0, reorderedItem)
        setSavedTask(newSavedTask)
        await createNewOrderedArray(newSavedTask)
    }

    return (
        <div className='app-wrapper'>
            <BackgroundImage theme={theme}>
                <img
                    className='background-img'
                    src={
                        theme === 'dark' ? darkBgImgDesktop : lightBgImgDesktop
                    }
                    alt='background'
                />
            </BackgroundImage>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <UnitWrapper theme={theme}>
                    <HeaderWrapper>
                        <h1>TODO</h1>
                        {theme === 'dark' ? (
                            <SunIcon onClick={changeTheme} />
                        ) : (
                            <MoonIcon onClick={changeTheme} />
                        )}
                    </HeaderWrapper>
                    <CreateTask addTask={handleNewTask} theme={theme} />
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <TasksList
                            item={savedTask}
                            markAsCompleted={markAsDone}
                            deleteOne={deleteOne}
                            filter={chosenFilter}
                            theme={theme}
                        />
                    )}
                    <TasksListFooter
                        tasks={savedTask}
                        filter={requestFilter}
                        theme={theme}
                    />
                    {savedTask.length > 1 && (
                        <p className='drag-n-drop-info'>
                            Drag and Drop to Reorder List
                        </p>
                    )}
                </UnitWrapper>
            </DragDropContext>
        </div>
    )
}

export default App
