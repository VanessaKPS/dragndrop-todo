import React, { useState } from 'react'
import styled from 'styled-components'

const InputArea = styled.div`
    width: 100%;
    background-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)'};
    border-radius: 4px;
    margin: 1rem 0;
    padding: 0.5rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: ${(props) =>
        props.theme === 'light' && `3px 3px 10px hsl(233, 11%, 84%)`};
    @media (min-width: 768px) {
        padding: 1rem 0;
    }
`

const CheckBox = styled.div`
    width: 13px;
    height: 13px;
    margin: 0 0.5rem;
    border-radius: 50%;
    border: 1px solid;
    border-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(233, 14%, 35%) ' : 'hsl(236, 33%, 92%)'};

    @media (min-width: 768px) {
        width: 18px;
        height: 18px;
        margin: 0 1rem;
    }
`

const CreateTask = (props) => {
    const { theme, addTask } = props
    const [newTask, setNewTask] = useState('')

    const handleInput = (e) => {
        setNewTask(e.target.value)
    }
    return (
        <InputArea theme={theme}>
            <CheckBox theme={theme} />
            <form
                onSubmit={(e) => {
                    addTask(e.target.addNewTask.value)
                    setNewTask('')
                    e.preventDefault()
                }}
            >
                <input
                    className={
                        theme === 'dark' ? 'input-text' : 'light-input-text'
                    }
                    type='text'
                    onChange={handleInput}
                    value={newTask}
                    name='addNewTask'
                    autoComplete='off'
                    autoFocus='on'
                ></input>
            </form>
        </InputArea>
    )
}
export default CreateTask
