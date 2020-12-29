import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as CheckedIcon } from '../images/icon-check.svg'
import { ReactComponent as CrossIcon } from '../images/icon-cross.svg'
import { Draggable } from 'react-beautiful-dnd'

const TaskWrapper = styled.div`
    width: 100%;
    background-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)'};
    border-bottom: 1px solid;
    border-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(233, 14%, 35%) ' : 'hsl(236, 33%, 92%)'};
    padding: 0.5rem 0;
    justify-content: flex-start;
    align-items: center;
    &:first-child {
        border-radius: 4px 4px 0 0;
    }
    ${(props) =>
        props.filter === 'activeFilter' &&
        css`
            display: ${(props) =>
                props.taskStatus === 'Completed' ? 'none' : 'flex'};
        `}
    ${(props) =>
        props.filter === 'completedFilter' &&
        css`
            display: ${(props) =>
                props.taskStatus === 'Active' ? 'none' : 'flex'}; ;
        `}
${(props) =>
        (props.filter === 'allFilter' || props.filter === '') &&
        css`
            display: flex;
        `}

@media (min-width: 768px) {
        padding: 1rem 0;
    }
`

const Checkbox = styled.div`
    position: relative;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid;
    border-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(233, 14%, 35%) ' : 'hsl(236, 33%, 92%)'};
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) =>
        props.taskStatus === 'Completed'
            ? 'linear-gradient(135deg,rgb(87, 221, 255),rgb(192, 88, 243));'
            : 'none'};
    &:before {
        content: '';
        display: inline-block;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        ${(props) =>
            props.theme === 'dark' &&
            css`
                background: ${(props) =>
                    props.taskStatus === 'Completed'
                        ? 'linear-gradient(135deg,rgb(87, 221, 255),rgb(192, 88, 243));'
                        : 'hsl(235, 24%, 19%)'};
            `}
        ${(props) =>
            props.theme === 'light' &&
            css`
                background: ${(props) =>
                    props.taskStatus === 'Completed'
                        ? 'linear-gradient(135deg,rgb(87, 221, 255),rgb(192, 88, 243));'
                        : 'hsl(0, 0%, 98%)'};
            `}
    }
    &:hover {
        cursor: pointer;
        background-image: linear-gradient(
            135deg,
            rgb(87, 221, 255),
            rgb(192, 88, 243)
        );
    }

    @media (min-width: 768px) {
        width: 18px;
        height: 18px;
        margin: 0 1rem;
        &:before {
            width: 16px;
            height: 16px;
        }
    }
`

const TaskContent = styled.p`
    text-decoration: ${(props) =>
        props.taskStatus === 'Completed' ? 'line-through' : 'none'};
    ${(props) =>
        props.theme === 'dark' &&
        css`
            color: ${(props) =>
                props.taskStatus === 'Completed'
                    ? 'hsl(234, 11%, 52%)'
                    : 'hsl(236, 33%, 92%)'};
        `}
    ${(props) =>
        props.theme === 'light' &&
        css`
            color: ${(props) =>
                props.taskStatus === 'Completed'
                    ? 'hsl(233, 11%, 84%)'
                    : 'hsl(233, 14%, 35%)'};
        `}
`

const Task = (props) => {
    const {
        content,
        id,
        number,
        markAsCompleted,
        deleteOne,
        status,
        filter,
        theme,
    } = props

    const [isShown, setIsShown] = useState(false)

    const handleChecked = () => {
        markAsCompleted(id)
    }

    const displayCrossIcon = () => {
        setIsShown((prevValue) => !prevValue)
    }
    const hideCrossIcon = () => {
        setIsShown((prevValue) => !prevValue)
    }

    const handleDeleteOne = () => {
        deleteOne(id)
    }

    return (
        <Draggable draggableId={id} key={id} index={number}>
            {(provided) => (
                <TaskWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={displayCrossIcon}
                    onMouseLeave={hideCrossIcon}
                    taskStatus={status}
                    filter={filter}
                    theme={theme}
                >
                    <Checkbox
                        taskStatus={status}
                        onClick={handleChecked}
                        theme={theme}
                    >
                        <CheckedIcon
                            className={
                                status === 'Completed' ? 'checked-icon' : 'hide'
                            }
                        />
                    </Checkbox>
                    <TaskContent theme={theme} taskStatus={status}>
                        {content}
                    </TaskContent>
                    <CrossIcon
                        className={isShown ? 'cross-icon' : 'hide'}
                        onClick={handleDeleteOne}
                    />
                </TaskWrapper>
            )}
        </Draggable>
    )
}

export default Task
