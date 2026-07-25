import LaurelWreath from '@/src/components/icons/LaurelWreath'
import styles from './Leaderboard.module.css'
import LeaderRow from '@/src/components/leaderBoard/LeaderRow/LeaderRow'
import { useEffect, useState } from 'react'
import Card from '@/src/components/shared/Card/Card'
import Loader from '@/src/components/shared/Loader/Loader'
import useToast from '@/src/stores/toast'

interface LeaderList {
    id: number,
    score: number,
    login: string,
}

export default function Leaderboard() {

    const toast = useToast().add

    async function fetchLeader() {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + "/user/score")
            const responseText = await response.text()
            if (response.ok) {
                setLeaderList(JSON.parse(responseText))
            } else {
                toast(responseText, "error")
                setLeaderList([])
            }
        } catch {
            toast("Не удалось выполнить запрос", "error")
            setLeaderList([])
        }

    }

    const [leaderList, setLeaderList] = useState<LeaderList[]>()

    useEffect(() => {
        fetchLeader()
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <p className={styles.title__text}>Зал славы</p>
                <LaurelWreath className={styles["title__wreath-left"]} />
                <LaurelWreath className={styles["title__wreath-right"]} />
            </div>

            <p className={styles.subtitle}>Игра с ИИ</p>
            <div className={styles["leader-board--blue"]}>
                {leaderList && leaderList.map((player, index) =>
                    <LeaderRow key={player.id} place={index + 1} name={player.login} score={player.score} />
                )}
                {!leaderList && <Loader />}
            </div>
        </div>
    )
}