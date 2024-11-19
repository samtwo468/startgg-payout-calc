'use client'
import {useRouter} from 'next/navigation'
import Header from '../components/Header'
import './page.css'

const FAQ = () => {
    return (
        <div>
            <Header/>
            <div id='slug'>
                <p className='title'>What is a Slug?</p>
                <br></br>
                A Slug is part of a URL that provides information about what specific page you're viewing.
                <br></br>
                For example, look at this URL: https://www.start.gg/tournament/name-pending-72/details
                <br></br>
                The full Slug tells us that we are on the details page for the tournament named Name Pending 72.
                <br></br>
                For this tool, only use the part of the Slug that is/is close to your tournament name.
            </div>
            <hr className='questionBreak'></hr>
        </div>
    )
}

export default FAQ