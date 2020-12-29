import React from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const TasksList = (props) => {
    const { item, filter, markAsCompleted, deleteOne, theme } = props

    return (
        <Droppable droppableId='todos'>
            {(provided) => (
                <div
                    className={theme === 'light' ? 'tasks-list-wrapper' : ''}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {item.map((task, index) => {
                        const { content, status} = task
                        return (
                            <Task
                                key={index + 1}
                                number={index}
                                content={content}
                                id={task._id}
                                markAsCompleted={markAsCompleted}
                                deleteOne={deleteOne}
                                status={status}
                                filter={filter}
                                theme={theme}
                            />
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default TasksList
