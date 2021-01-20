import React from 'react'

const Loader = () => {
    return (
        <div className='loader-wrapper'>
            <svg
                className='spinner'
                width='174px'
                height='174px'
                viewBox='0 0 66 66'
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle
                    className='path'
                    fill='transparent'
                    stroke-width='2'
                    cx='33'
                    cy='33'
                    r='15'
                    stroke='url(#gradient)'
                />
                <linearGradient id='gradient'>
                    <stop offset='50%' stop-color='#42d179' stop-opacity='1' />
                    <stop offset='73%' stop-color='#42d179' stop-opacity='.5' />

                    <stop offset='90%' stop-color='#42d179' stop-opacity='0' />
                </linearGradient>

                <svg
                    className='spinner-dot dot'
                    width='5px'
                    height='5px'
                    viewBox='0 0 66 66'
                    xmlns='http://www.w3.org/2000/svg'
                    x='41'
                    y='20'
                >
                    <circle
                        className='path'
                        fill='#42d179'
                        cx='33'
                        cy='33'
                        r='30'
                    ></circle>
                </svg>
            </svg>
        </div>
    )
}

export default Loader
