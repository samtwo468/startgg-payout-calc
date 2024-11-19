import React from 'react'
import './Header.css'
import Link from 'next/link'

const Header = () => {
    return (
        <div>
            <div id="header">
                <Link id='tpc' href='/'>Tournament Payout Calculator</Link>
                <Link id='home' href='/'>Home</Link>
                <Link id='faq' href='/FAQ'>FAQ</Link>
                <Link id='feedback' href='/Feedback'>Feedback</Link>
            </div>
            <hr id='hr'></hr>
        </div>
    )
}

export default Header