import { useEffect, useState } from "react"
import useHistoryOfVictories from "../stores/useHistoryOfVictories";
import useGame from "../stores/useGame";

export default async function useGroq(historyOfGame, historyOfVictories, score) {

    return new Promise(async (res, rej) => {
        const reqBody = {
            historyOfGame: historyOfGame,
            historyOfVictories: historyOfVictories,
            score: score
        }

        let response = await fetch('http://localhost:8080', {
            method: 'POST',
            body: JSON.stringify(reqBody)
        })
        let respText = await response.text()
        try {

            if (respText) {
                let data = await JSON.parse(respText)
                console.log(data)
                if (data.event && data.message && data.messageForLongAFK) {
                    res(data)
                }
            }
            res(null)
        } catch (err) {
            console.log(err)
            res(null)
        }


    })


}