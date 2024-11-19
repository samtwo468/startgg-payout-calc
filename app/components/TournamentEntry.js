'use client'
require("dotenv").config()
import React, {useState, useEffect} from "react"
import {useRouter} from 'next/navigation'
import './TournamentEntry.css'

const TournamentEntry = () => {

    const router = useRouter()

    const [tourney, setTourney] = useState("")

    const submitHandler = (event) => {
        event.preventDefault()
        //console.log("tourney = " + tourney)
        //getTournamentData()
        if (tourneyData !== null && tourneyData.tournament !== null) {
            localStorage.setItem("tourneyData", JSON.stringify(tourneyData))
            router.push("/Calculator")
        }
    }

    const [tourneyData, setTourneyData] = useState(null)


    function convertToSlug(tourney) {
        let URLcheck = tourney.indexOf("start.gg/tournament/") //this is 20 chars long
        if (URLcheck >= 0) {
            let beginningOfSlug = tourney.substring(URLcheck + 20)
            //console.log("bSlug = " + beginningOfSlug)
            let endOfSlug = beginningOfSlug.indexOf("/")
            //console.log("endOfSlug = " + endOfSlug)
            //console.log(beginningOfSlug.substring(0, endOfSlug))
            return beginningOfSlug.substring(0, endOfSlug)
        }
        return tourney
    }


    function getTournamentData() {
        const testQuery = `
            query($tourneySlug: String) {
                tournament(slug: $tourneySlug) {
                    name
                    events {
                        name,
                        numEntrants
                    }
                }
            }
        `
        var tourneySlug = convertToSlug(tourney)
        console.log(tourneySlug)
        fetch("https://api.start.gg/gql/alpha", {
            method: "POST",
            headers: {
                "Authorization":"Bearer " + process.env.API_KEY,
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                query: testQuery,
                variables: {
                    tourneySlug: tourneySlug
                }
            })
        }).then(response => {
            if (response.ok) return response.json()
            else return response.json().then(response => {throw new Error(response.error)})
        }).then(data => {
            setTourneyData(data.data)
            //console.log(tourneyData)
            //console.log((tourneyData !== null && tourneyData.tournament !== null))
        }).catch(error => alert("Error: " + error.message))
    }



    useEffect(() => {
        const timeout = setTimeout(() => {
            if (tourney != "") {
                //console.log("timeout: tourney = " + tourney)
                //console.log(tourneyData)
                getTournamentData()
            }
        }, 650)
        return () => clearTimeout(timeout)
    }, [tourney])

    return (
        <div>
            <div className="title">
                <text>Enter Tournament URL or Tournament Slug:</text>
            </div>
            <div className="explanation">
                <text>(URLs from any page from the tournament will work)</text>
            </div>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <input
                        type='text'
                        id='tourneyEntry'
                        value = {tourney}
                        placeholder="name-pending-67"
                        onChange={(event) => setTourney(event.target.value)}
                    />
                    <div className='fetchedName'>
                        {(tourneyData !== null && tourneyData.tournament !== null) ? <p id='name'>{tourneyData.tournament.name}</p> : <p> </p>}
                        {(tourneyData !== null && tourneyData.tournament == null) ? <p>Error: Invalid Slug</p> : <p> </p>}
                    </div>
                    <button type="submit">Calculate!</button>
                </form>
            </div>
        </div>
    )
}

export default TournamentEntry