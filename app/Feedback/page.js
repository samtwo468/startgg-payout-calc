'use client'
import {useRouter} from 'next/navigation'
import Header from '../components/Header'
import './page.css'

const Feedback = () => {
    return (
        <div>
            <Header/>
            <div id='message'>
                <text>Feel free to DM @samtwo on Discord for any site suggestions or errors!</text>
            </div>
        </div>
    )
}

export default Feedback