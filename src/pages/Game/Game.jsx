import Card from '@/src/components/shared/Card/Card';
import styles from './Game.module.css'
import Background from '@/src/components/shared/Background/Background'
import Button from '@/src/components/shared/Button/Button';
import Take from '@/src/components/icons/Take';
import Exit from '@/src/components/icons/Exit';
import useGame from '@/src/stores/useGame'
import randomaizer from '@/src/utils/randomaizer';
import { useState } from 'react';
import Enemy from '@/src/components/shared/Enemy/Enemy';
import useGroq from '@/src/utils/groq';
import useHistoryOfVictories from '@/src/stores/useHistoryOfVictories';
import GameOverModal from '@/src/components/game/GameOverModal/GameOverModal';


export default function Game() {
    const mainDeck = useGame((state) => state.mainDeck)
    const countOfGameSteps = useGame((state) => state.stepCount)
    const incrementStepCount = useGame((state) => state.incrementStepCount)
    const cardsOfUser = useGame((state) => state.cardsOfUser)
    const cardsOfEnemy = useGame((state) => state.cardsOfEnemy)
    const deleteFormMainDeck = useGame((state) => state.deleteCardFromMainDeck)
    const addCardToUserDeck = useGame((state) => state.addCardToUserDeck)
    const addCardToEnemyDeck = useGame((state) => state.addCardToEnemyDeck)
    const resetGame = useGame((state) => state.resetGame)
    const whoseTurn = useGame((state) => state.whoseTurn)
    const setWhoseTurn = useGame((state) => state.setWhoseTurn)
    const setHistoryOfGame = useGame((state) => state.setHistoryOfGame)
    const historyOfVictories = useHistoryOfVictories((state) => state.history)
    const setEnemyIsPass = useGame((state) => state.setEnemyIsPass)
    const enemyIsPass = useGame((state) => state.userIsPass);



    function userTakeCard() {
        let index = randomaizer(0, mainDeck.length - 1);
        addCardToUserDeck(mainDeck[index]);
        deleteFormMainDeck(mainDeck[index]);
        return mainDeck[index];
    }

    function enemyTakeCard() {
        let index = randomaizer(0, mainDeck.length - 1);
        addCardToEnemyDeck(mainDeck[index]);
        deleteFormMainDeck(mainDeck[index]);
        return mainDeck[index];
    }

    function startGame() {
        setMessage("")
        resetGame()
        setShowModal(false)
        incrementStepCount()
        let card = enemyTakeCard();
        setHistoryOfGame("Начало игры");
        setHistoryOfGame(`Противник получил - ${card.name} ${card.suit}`)
        userTakeCard();
    }

    async function madeStep(event) {
        setWhoseTurn("enemy")
        if (event == "take") {
            userTakeCard()
            setHistoryOfGame("Пользователь взял карту")
            if (useGame.getState().cardsOfUser.reduce((prev, curr) => { return prev += curr.value }, 0) > 21) {
                setModalMessage({ message: "Вы набрали больше 21-го очка :(", win: false })
                setShowModal(true)
            } else {
                if (enemyIsPass) {
                    setWhoseTurn("user")
                } else {
                    const res = await useGroq(useGame.getState().historyOfGame, historyOfVictories, useGame.getState().cardsOfEnemy.reduce((prev, curr) => { return prev += curr.value }, 0))
                    if (res.event == "take" && !enemyIsPass) {
                        const card = enemyTakeCard()
                        setMessage(res.message)
                        if (useGame.getState().cardsOfEnemy.reduce((prev, curr) => { return prev += curr.value }, 0) > 21) {
                            setModalMessage({ message: "Противник набрал больше 21-го очка", win: true })
                            setShowModal(true)
                        } else {
                            setHistoryOfGame(`Противник получает карту ${card.suit} ${card.name}`)
                            setWhoseTurn('user')
                        }
                    } else {
                        setMessage(res.message)
                        setEnemyIsPass(true)
                        setWhoseTurn("user")
                    }
                }
            }

        } else if (event == "pass") {
            setHistoryOfGame("Игрок пасс")
            if (enemyIsPass) {
                if (useGame.getState().cardsOfUser.reduce((prev, curr) => { return prev += curr.value }, 0) > useGame.getState().cardsOfEnemy.reduce((prev, curr) => { return prev += curr.value }, 0)) {
                    setModalMessage({ message: "Вы набрали больше очков чем ИИ :)", win: true })
                    setShowModal(true)
                } else {
                    setModalMessage({ message: "Противник набрал больше очков чем вы :(", win: false })
                    setShowModal(true)
                }
            } else {
                const res = await useGroq(useGame.getState().historyOfGame, historyOfVictories, useGame.getState().cardsOfEnemy.reduce((prev, curr) => { return prev += curr.value }, 0))
                if (res.event == "take") {
                    const card = enemyTakeCard()
                    setMessage(res.message)
                    if (useGame.getState().cardsOfEnemy.reduce((prev, curr) => { return prev += curr.value }, 0) > 21) {
                        setModalMessage({ message: "Противник набрал больше 21-го очка" })
                        setShowModal(true)
                    } else {
                        setHistoryOfGame(`Противник получает карту ${card.suit} ${card.name}`)
                        madeStep("pass")
                    }
                } else if (res.event == "pass") {
                    if (useGame.getState().cardsOfUser.reduce((prev, curr) => { return prev += curr.value }, 0) > useGame.getState().cardsOfEnemy.reduce((prev, curr) => { return prev += curr.value }, 0)) {
                        setModalMessage({ message: "Вы набрали больше очков чем ИИ :)", win: true })
                        setShowModal(true)
                    } else {
                        setModalMessage({ message: "Противник набрал больше очков чем вы :(", win: false })
                        setShowModal(true)
                    }
                }
            }
        }
    }

    const [modalMessage, setModalMessage] = useState({ message: "", });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={styles.screen}>
            <Background speed="10000s" opacity="40%" />
            <GameOverModal startGame={startGame} show={showModal} message={modalMessage} />

            <div className={styles['game-palce']}>
                <div className={styles['user-zone']}>
                    <div className={styles['user-zone__card-grid']}>
                        {cardsOfEnemy.map((card) => <Card style={{ rotate: "180deg" }} key={card.id} nominal={card.name} suit={card.suit} side='back' />)}
                    </div>

                    <Enemy message={message} />
                </div>

                <div className={styles['user-zone']}>
                    <div className={styles['info-container']}>
                        <div className={styles['info-container__info']}>
                            <Card side='back' />
                            <div className={styles['info-container__text-container']}>
                                <p onClick={() => { setShowModal(true) }} className={styles.text}>Ваш ход</p>
                                <p onClick={() => { console.log(showModal) }} className={styles.text}>В колоде {mainDeck.length} карты</p>
                            </div>
                        </div>
                        <div className={styles['info-container__buttons-container']}>
                            {(whoseTurn == 'user' && countOfGameSteps != 0) && <Button onClick={() => { madeStep('take') }} color="succes" afterIcon={<Take />}>Взять карту</Button>}
                            {(whoseTurn == 'user' && countOfGameSteps != 0) && <Button onClick={() => { madeStep('pass') }} color="error" afterIcon={<Exit />}>Хватит</Button>}
                            {countOfGameSteps == 0 && <Button onClick={startGame} color="suuces" >Начать</Button>}
                        </div>
                    </div>
                    <div className={styles['user-zone__card-grid']}>
                        {cardsOfUser.map((card) => <Card key={card.id} nominal={card.name} suit={card.suit} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}