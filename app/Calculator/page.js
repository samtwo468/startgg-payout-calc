'use client'
import React, {useState, useEffect} from "react"
import {useRouter} from 'next/navigation'
import "./page.css"
import Header from "../components/Header"
import PrizeBox from "../components/PrizeBox"

const Calculator = () => {
    
    if (typeof window !== "undefined") {

    const tourneyData = JSON.parse(localStorage.getItem("tourneyData"))
    const [event, setEvent] = useState(0)

    const [eventOp1, setEventOp1] = useState("")
    const [eventOp2, setEventOp2] = useState("")
    const [eventOp3, setEventOp3] = useState("")
    const [eventOp4, setEventOp4] = useState("")
    const [eventOp5, setEventOp5] = useState("")
    const [eventOp6, setEventOp6] = useState("")
    const [eventOp7, setEventOp7] = useState("")
    const [eventOp8, setEventOp8] = useState("")
    const [eventOp9, setEventOp9] = useState("")
    const [eventOp10, setEventOp10] = useState("")

    const [entry, setEntry] = useState(5)
    const [numDQs, setNumDQs] = useState(0)

    const [entrants, setEntrants] = useState(tourneyData.tournament.events[0].numEntrants)

    const [firstPrize, setFirstPrize] = useState(0)
    const [secondPrize, setSecondPrize] = useState(0)
    const [thirdPrize, setThirdPrize] = useState(0)
    const [fourthPrize, setFourthPrize] = useState(0)
    const [fifthPrize, setFifthPrize] = useState(0)
    const [sixthPrize, setSixthPrize] = useState(0)
    const [seventhPrize, setSeventhPrize] = useState(0)
    const [eighthPrize, setEighthPrize] = useState(0)

    function setPrizesToZero() {
        setFirstPrize(0)
        setSecondPrize(0)
        setThirdPrize(0)
        setFourthPrize(0)
        setFifthPrize(0)
        setSixthPrize(0)
        setSeventhPrize(0)
        setEighthPrize(0)
    }

    function safelySetPrize(place, value) {
        if (!isNaN(parseFloat(value))) {
            switch(place) {
                case 1:
                    setFirstPrize(value)
                    break
                case 2: 
                    setSecondPrize(value)
                    break
                case 3: 
                    setThirdPrize(value)
                    break
                case 4: 
                    setFourthPrize(value)
                    break
                case 5:
                    setFifthPrize(value)
                    break
                case 6: 
                    setSixthPrize(value)
                    break
                case 7: 
                    setSeventhPrize(value)
                    break
                case 8: 
                    setEighthPrize(value)
                    break
                default: break
            }
        }
        else if (value === "") {
            switch(place) {
                case 1:
                    setFirstPrize(0)
                    break
                case 2: 
                    setSecondPrize(0)
                    break
                case 3: 
                    setThirdPrize(0)
                    break
                case 4: 
                    setFourthPrize(0)
                    break
                case 5:
                    setFifthPrize(0)
                    break
                case 6: 
                    setSixthPrize(0)
                    break
                case 7: 
                    setSeventhPrize(0)
                    break
                case 8: 
                    setEighthPrize(0)
                    break
                default: break
            }
        }
    }

    function calcSuggestion() {
        if (entrants <= 0) return //error handling for empty events

        let totalPrizePool = ((tourneyData.tournament.events[event].numEntrants - numDQs) * entry)
        let remainingPrizePool = totalPrizePool
        let payouts = []
        
        if (entrants <= 2) { //top 1 payout
            payouts.push(totalPrizePool, 0)
        }
        else if (entrants <= 5) { //top 2 payout
            let top1 = Math.floor(totalPrizePool*0.7)
            let top2 = Math.floor(totalPrizePool*0.3)
            payouts.push(top1, top2, 0)
        }
        else if (entrants <= 10) { //top 3 payout
            let top1 = Math.floor(totalPrizePool*0.5)
            let top2 = Math.floor(totalPrizePool*0.3)
            let top3 = Math.floor(totalPrizePool*0.2)
            payouts.push(top1, top2, top3, 0)
        }
        else if (entrants <= 16) { //top 4 payout
            let top1 = Math.floor(totalPrizePool*0.4)
            let top2 = Math.floor(totalPrizePool*0.3)
            let top3 = Math.floor(totalPrizePool*0.2)
            let top4 = Math.floor(totalPrizePool*0.1)
            payouts.push(top1, top2, top3, top4, 0, 0, 0, 0)
        }
        else if (entrants <= 24) { //top 6 payout
            let top1 = Math.floor(totalPrizePool*0.35)
            let top2 = Math.floor(totalPrizePool*0.25)
            let top3 = Math.floor(totalPrizePool*0.15)
            let top4 = Math.floor(totalPrizePool*0.10)
            let top5 = Math.floor(totalPrizePool*0.05)
            let top6 = Math.floor(totalPrizePool*0.05)
            payouts.push(top1, top2, top3, top4, top5, top6, 0, 0)
        }
        else { //top 8 payout (the max for this app)
            let top1 = Math.floor(totalPrizePool*0.350)
            let top2 = Math.floor(totalPrizePool*0.200)
            let top3 = Math.floor(totalPrizePool*0.150)
            let top4 = Math.floor(totalPrizePool*0.100)
            let top5 = Math.floor(totalPrizePool*0.050)
            let top6 = Math.floor(totalPrizePool*0.050)
            let top7 = Math.floor(totalPrizePool*0.025)
            let top8 = Math.floor(totalPrizePool*0.025)
            payouts.push(top1, top2, top3, top4, top5, top6, top7, top8)
        }

        let avoidFloatRounding = 0 // getting rid of the chance of phantom dollars
        payouts.forEach(amt => {
            avoidFloatRounding += amt
        })

        if (avoidFloatRounding < totalPrizePool) {
            payouts[0] += totalPrizePool-avoidFloatRounding
        }

        return payouts
    }

    useEffect(() => {

        //console.log(tourneyData.tournament.events[0].numEntrants)

        for (let i = 0; i < tourneyData.tournament.events.length; i++) {
            switch(i) {
                case 0: 
                    setEventOp1(tourneyData.tournament.events[i].name)
                    break
                case 1: 
                    setEventOp2(tourneyData.tournament.events[i].name)
                    break
                case 2: 
                    setEventOp3(tourneyData.tournament.events[i].name)
                    break
                case 3: 
                    setEventOp4(tourneyData.tournament.events[i].name)
                    break
                case 4:
                    setEventOp5(tourneyData.tournament.events[i].name)
                    break
                case 5: 
                    setEventOp6(tourneyData.tournament.events[i].name)
                    break
                case 6: 
                    setEventOp7(tourneyData.tournament.events[i].name)
                    break
                case 7: 
                    setEventOp8(tourneyData.tournament.events[i].name)
                    break
                case 8: 
                    setEventOp9(tourneyData.tournament.events[i].name)
                    break
                case 9: 
                    setEventOp10(tourneyData.tournament.events[i].name)
                    break
                default: break
            }
        }
    }, [])

    } // consts and functions

    if (typeof window === "undefined") return null
    return (
        <div>
            <Header></Header>
            <div id="eventMaster">
                Select an Event:
                <select 
                    className='events'
                    defaultValue={eventOp1}
                    onChange={(e) => {
                        switch(e.target.value) {
                            case eventOp1:
                                setEvent(0)
                                setEntrants(tourneyData.tournament.events[0].numEntrants)
                                break
                            case eventOp2:
                                setEvent(1)
                                setEntrants(tourneyData.tournament.events[1].numEntrants)
                                break
                            case eventOp3:
                                setEvent(2)
                                setEntrants(tourneyData.tournament.events[2].numEntrants)
                                break
                            case eventOp4:
                                setEvent(3)
                                setEntrants(tourneyData.tournament.events[3].numEntrants)
                                break
                            case eventOp5:
                                setEvent(4)
                                setEntrants(tourneyData.tournament.events[4].numEntrants)
                                break
                            case eventOp6:
                                setEvent(5)
                                setEntrants(tourneyData.tournament.events[5].numEntrants)
                                break
                            case eventOp7:
                                setEvent(6)
                                setEntrants(tourneyData.tournament.events[6].numEntrants)
                                break
                            case eventOp8:
                                setEvent(7)
                                setEntrants(tourneyData.tournament.events[7].numEntrants)
                                break
                            case eventOp9:
                                setEvent(8)
                                setEntrants(tourneyData.tournament.events[8].numEntrants)
                                break
                            case eventOp10:
                                setEvent(9)
                                setEntrants(tourneyData.tournament.events[9].numEntrants)
                                break
                            default: break
                        }
                    }}
                >
                    <option value={eventOp1}>{eventOp1}</option>
                    {eventOp2 !== "" && <option value={eventOp2}>{eventOp2}</option>}
                    {eventOp3 !== "" && <option value={eventOp3}>{eventOp3}</option>}
                    {eventOp4 !== "" && <option value={eventOp4}>{eventOp4}</option>}
                    {eventOp5 !== "" && <option value={eventOp5}>{eventOp5}</option>}
                    {eventOp6 !== "" && <option value={eventOp6}>{eventOp6}</option>}
                    {eventOp7 !== "" && <option value={eventOp7}>{eventOp7}</option>}
                    {eventOp8 !== "" && <option value={eventOp8}>{eventOp8}</option>}
                    {eventOp9 !== "" && <option value={eventOp9}>{eventOp9}</option>}
                    {eventOp10 !== "" && <option value={eventOp10}>{eventOp10}</option>}
                </select>
                Entrants: {tourneyData.tournament.events[event].numEntrants}
                <div className="entryFee">
                    Entry Fee: $
                    <input type="text" defaultValue="5" size="1" onChange={(e) => setEntry(e.target.value)}></input>
                </div>
                <div className="dqs">
                    Number of DQs/Free Entrants: 
                    <input type="text" defaultValue="0" size="1" onChange={(e) => setNumDQs(e.target.value)}></input>
                </div>
                <br></br>
                Remaining Prize Pool = $ {(((tourneyData.tournament.events[event].numEntrants - numDQs) * entry) - firstPrize - secondPrize - thirdPrize - fourthPrize - fifthPrize - sixthPrize - seventhPrize - eighthPrize)}
            </div>
            <br></br>
            <div className="cardHolder">
                
                <div className="card">
                        <PrizeBox setPrize={safelySetPrize} num={1} appears={entrants > 0}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={2} appears={entrants > 1}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={3} appears={entrants > 2}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={4} appears={entrants > 3}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={5} appears={entrants > 4}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={6} appears={entrants > 5}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={7} appears={entrants > 6}></PrizeBox>
                        <PrizeBox setPrize={safelySetPrize} num={8} appears={entrants > 7}></PrizeBox>
                </div>
            </div>
            <br></br>
            <br></br>
            <hr id="suggestionLine"></hr>
            Payout suggestion:
            <ol>
                {calcSuggestion().map((prize, index) => 
                <li key={index}>${prize}</li>
                )}
            </ol>
        </div>
    )
}

export default Calculator