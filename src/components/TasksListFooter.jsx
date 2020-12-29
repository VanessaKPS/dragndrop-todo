import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const FooterWrapper = styled.div`
    width: 100%;
    background-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(235, 21%, 11%)' : 'hsl(0, 0%, 98%)'};
    color: ${(props) =>
        props.theme === 'dark' ? 'hsl(233, 14%, 35%)' : 'hsl(236, 9%, 61%)'};
    font-size: 12px;
    text-align: center;
    border-radius: 0 0 4px 4px;
    @media (min-width: 768px) {
        box-shadow: ${(props) =>
            props.theme === 'light' && '3px 0px 10px hsl(233, 11%, 84%);'};
        font-size: 12px;
        background-color: ${(props) =>
            props.theme === 'dark' ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)'};
    }
`

const MobileFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        display: none;
    }
`

const Count = styled.div`
    padding: 0.5rem 0;
    display: flex;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    border-radius: 0 0 4px 4px;
    background-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)'};
    box-shadow: ${(props) =>
        props.theme === 'light' && '3px 0px 10px hsl(233, 11%, 84%);'};
`

const DesktopFooter = styled.div`
    display: none;
    @media (min-width: 768px) {
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const ActiveCount = styled.p`
    margin: 0 1rem;
`

const TasksStatus = styled.div`
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: ${(props) =>
        props.theme === 'dark' ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)'};
    border-radius: 4px;
    box-shadow: ${(props) =>
        props.theme === 'light' && '3px 3px 10px hsl(233, 11%, 84%);'};
    @media (min-width: 768px) {
        width: 30%;
        box-shadow: none;
    }
`

const StatusContent = styled.p`
margin: 0 3px;
cursor: pointer;
&:first-child {
  color: hsl(220, 98%, 61%);
}
@media (pointer:fine) {
    &:not(:first-child):hover {
  color: ${(props) =>
      props.theme === 'dark' ? 'hsl(236, 33%, 92%)' : 'hsl(235, 19%, 35%)'};
}
}
${(props) =>
    props.clickedStatus &&
    css`
        color: hsl(192, 100%, 67%);
        text-decoration: underline;
    `}
}


`

const DeleteCompleted = styled.div`
    margin: 0 1rem;
    &:hover {
        color: ${(props) =>
            props.theme === 'dark'
                ? 'hsl(236, 33%, 92%)'
                : 'hsl(235, 19%, 35%)'};
        cursor: pointer;
    }
`

const TasksListFooter = (props) => {
    const { tasks, filter, theme } = props
    const [isClicked, setIsClicked] = useState({
        activeFilter: false,
        completedFilter: false,
    })
    const items = tasks
    const filterMethod = filter
    const activeItems = items.filter((item) => item.status !== 'Completed')

    const handleClick = (e) => {
        const chosenFilter = e.target.id
        filterMethod(chosenFilter)
        setIsClicked(() => {
            if (chosenFilter === 'activeFilter') {
                return { activeFilter: true, completedFilter: false }
            }
            if (chosenFilter === 'completedFilter') {
                return { activeFilter: false, completedFilter: true }
            } else {
                return { activeFilter: false, completedFilter: false }
            }
        })
    }

    return (
        <FooterWrapper theme={theme}>
            <MobileFooter>
                <Count theme={theme}>
                    <ActiveCount>{activeItems.length} items left</ActiveCount>
                    <DeleteCompleted
                        theme={theme}
                        id='deleteCompletedFilter'
                        onClick={handleClick}
                    >
                        Clear Completed
                    </DeleteCompleted>
                </Count>
                <TasksStatus theme={theme}>
                    <StatusContent
                        theme={theme}
                        className='status'
                        id='allFilter'
                        onClick={handleClick}
                    >
                        All
                    </StatusContent>
                    <StatusContent
                        theme={theme}
                        clickedStatus={isClicked.activeFilter}
                        id='activeFilter'
                        onClick={handleClick}
                    >
                        Active
                    </StatusContent>
                    <StatusContent
                        theme={theme}
                        clickedStatus={isClicked.completedFilter}
                        id='completedFilter'
                        onClick={handleClick}
                    >
                        Completed
                    </StatusContent>
                </TasksStatus>
            </MobileFooter>

            <DesktopFooter>
                <ActiveCount>{activeItems.length} items left</ActiveCount>
                <TasksStatus theme={theme}>
                    <StatusContent
                        theme={theme}
                        className='status'
                        id='allFilter'
                        onClick={handleClick}
                    >
                        All
                    </StatusContent>
                    <StatusContent
                        theme={theme}
                        clickedStatus={isClicked.activeFilter}
                        id='activeFilter'
                        onClick={handleClick}
                    >
                        Active
                    </StatusContent>
                    <StatusContent
                        theme={theme}
                        clickedStatus={isClicked.completedFilter}
                        id='completedFilter'
                        onClick={handleClick}
                    >
                        Completed
                    </StatusContent>
                </TasksStatus>
                <DeleteCompleted
                    theme={theme}
                    id='deleteCompletedFilter'
                    onClick={handleClick}
                >
                    Clear Completed
                </DeleteCompleted>
            </DesktopFooter>
        </FooterWrapper>
    )
}

export default TasksListFooter
