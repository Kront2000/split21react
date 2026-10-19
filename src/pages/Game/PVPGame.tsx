import Card from '@/src/components/shared/Card/Card';
import styles from './Game.module.css'
import Background from '@/src/components/shared/Background/Background'
import Button from '@/src/components/shared/Button/Button';
import Take from '@/src/components/icons/Take';
import Exit from '@/src/components/icons/Exit';
import Enemy from '@/src/components/shared/Enemy/Enemy';
import GameOverModal from '@/src/components/game/GameOverModal/GameOverModal';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as cookie from '@/src/utils/cookie';
import { useNavigate } from 'react-router';
import LoadingOverModal from '@/src/components/game/LoadingOverModal/LoadingOverModal';

interface Card {
    id: number;
    name: "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "T";
    suit: "diamonds" | "peaks" | "clubs" | "hearts";
    value: number;
}

interface modalMessage {
    message: string
    win?: "user" | "enemy"
}

export default function PVPGame() {
    const wsRef = useRef<WebSocket>(null)
    const type = "pvp"
    const [enemyName, setEnemyName] = useState<undefined | string>(undefined)
    const [enemyRating, setEnemyRating] = useState<undefined | string>(undefined)
    let navigate = useNavigate();
    useEffect(() => {
        console.log(cookie.getCookie("accessToken"))
        console.log(document.cookie)
        const url = cookie.getCookie("accessToken") ? import.meta.env.VITE_SERVER_URL + "?token=" + cookie.getCookie("accessToken") + "&type=" + type : import.meta.env.VITE_SERVER_URL + "?type=" + type
        let socket = new WebSocket(url)
        wsRef.current = socket

        socket.onopen = () => {
            setShowFoundedOverModal(true)
            console.log("Успешное подключение к севреру")
        }
        socket.onclose = () => {
            console.log("Соединение разорвано")
            setShowFoundedOverModal(false)
        }
        socket.onmessage = (message) => {
            const parseMessage = JSON.parse(message.data)
            console.log(parseMessage)
            if (parseMessage.whoseTurn) {
                setWhoseTurn(parseMessage.whoseTurn)
            }
            if (parseMessage.info) {
                if (parseMessage.info === "game over") {
                    navigate("/")
                }
            }
            if (parseMessage.enemyName) {
                console.log(parseMessage.enemyName)
                setEnemyName(parseMessage.enemyName)
                if (parseMessage.enemyRating) {
                    setEnemyRating(parseMessage.enemyRating)
                }
            }
            if (parseMessage.enemyMessage) {
                setMessage(parseMessage.enemyMessage)
            }
            if (parseMessage.countOfDeckEnemy) {
                let array = []
                for (let i = 0; i < parseMessage.countOfDeckEnemy; i++) {
                    array.push(i)
                }
                setCardsCountOfEnemy(array)
            }
            if (parseMessage.userDeck) {
                setUserDeck(parseMessage.userDeck)
            }
            if (parseMessage.countMainDeck) {
                setCountMainDeck(parseMessage.countMainDeck)
            }
            if (parseMessage.info) {
                if (parseMessage.info == "enemy is founded") {
                    setShowFoundedOverModal(false)
                }
            }
            if (parseMessage.winMessage) {
                setModalMessage({ message: parseMessage.winMessage, win: parseMessage.win })
                setTimeout(() => {
                    setShowModal(true)
                }, 3000)
            }
        }
        return () => {
            socket.close();
        }

    }, [])
    const send = useCallback((data: "take" | "pass" | "start") => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            console.log(wsRef.current)
            wsRef.current.send(JSON.stringify({ event: data }))
        }
    }, [])

    function startGame() {
        setUserDeck([])
        setCardsCountOfEnemy([])
        setMessage('')
        setShowModal(false)
        setWhoseTurn('start')
    }

    const [userDeck, setUserDeck] = useState<Card[]>([])
    const [cardsCountOfEnemy, setCardsCountOfEnemy] = useState<number[]>([])
    const [modalMessage, setModalMessage] = useState<modalMessage>({ message: "" });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [whoseTurn, setWhoseTurn] = useState("user")
    const [countMainDeck, setCountMainDeck] = useState(0)
    const [showFoundedOverModal, setShowFoundedOverModal] = useState(false)
    return (
        <div className={styles.screen}>
            <Background speed="10000s" opacity="40%" />
            <GameOverModal show={showModal} message={modalMessage} startGame={startGame} />
            <LoadingOverModal show={showFoundedOverModal} message='Ищем соперника...'/>

            <div className={styles['game-palce']}>
                <div className={styles['user-zone']}>
                    <div className={styles['user-zone__card-grid']}>
                        {cardsCountOfEnemy.map((i) => <Card side='back' key={i} />)}
                    </div>
                    {whoseTurn !== 'start' && whoseTurn !== 'waiting' && <Enemy name={enemyName} rating={enemyRating} message={message} />}
                </div>

                <div className={styles['user-zone']}>
                    <div className={styles['info-container']}>
                        <div className={styles['info-container__info']}>
                            <Card side='back' />
                            <div className={styles['info-container__text-container']}>
                                <p onClick={() => { setShowModal(true) }} className={styles.text}>Ваш ход</p>
                                <p onClick={() => { console.log(showModal) }} className={styles.text}>В колоде {countMainDeck} карты</p>
                            </div>
                        </div>
                        <div className={styles['info-container__buttons-container']}>
                            {whoseTurn == 'user' && <Button onClick={() => { send("take") }} color="succes" afterIcon={<Take />}>Взять карту</Button>}
                            {whoseTurn == 'user' && <Button onClick={() => { send("pass") }} color="error" afterIcon={<Exit />}>Хватит</Button>}
                            {whoseTurn == 'start' && <Button onClick={() => { send("start"); setWhoseTurn("waiting") }} color="succes" >Начать</Button>}
                            {whoseTurn == 'waiting' && <Button onClick={() => { send("start"); }} color="suuces" >Ожидаем второго игрока...</Button>}
                        </div>
                    </div>
                    <div className={styles['user-zone__card-grid']}>
                        {userDeck.map((card) => <Card key={card.id} nominal={card.name} suit={card.suit} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}