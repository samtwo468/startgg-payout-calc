import React from 'react'
import './PrizeBox.css'


const PrizeBox = ({setPrize, num, appears}) => {
    return (
        <div id='master'>
            {appears && 
            <div>
                {num}.&nbsp;&nbsp;&nbsp;
                <input type='text' class='textbox' onChange={(e) => setPrize(num, e.target.value)}></input>
                <input className='checkbox' type='checkbox'></input>
                Paid Out
            </div>
            }
        </div>
    )
}

export default PrizeBox