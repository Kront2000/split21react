import Card from '@/src/components/shared/Card/Card';
import styles from './Game.module.css'
import Background from '@/src/components/shared/Background/Background'
import Button from '@/src/components/shared/Button/Button';
import Take from '@/src/components/icons/Take';
import Exit from '@/src/components/icons/Exit';
import Enemy from '@/src/components/shared/Enemy/Enemy';
import GameOverModal from '@/src/components/game/GameOverModal/GameOverModal';
import { useState } from 'react';




export default function Game() {

    const [modalMessage, setModalMessage] = useState({ message: "", });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [whoseTurn, setWhoseTurn] = useState("user")
    return (
        <div className={styles.screen}>
            <Background speed="10000s" opacity="40%" />
            <GameOverModal show={showModal} message={modalMessage} />

            <div className={styles['game-palce']}>
                <div className={styles['user-zone']}>
                    <div className={styles['user-zone__card-grid']}>
                        {/* {cardsOfEnemy.map((card) => <Card style={{ rotate: "180deg" }} key={card.id} nominal={card.name} suit={card.suit} side='back' />)} */}
                    </div>

                    <Enemy message={message} />
                </div>

                <div className={styles['user-zone']}>
                    <div className={styles['info-container']}>
                        <div className={styles['info-container__info']}>
                            <Card side='back' />
                            <div className={styles['info-container__text-container']}>
                                <p onClick={() => { setShowModal(true) }} className={styles.text}>Ваш ход</p>
                                <p onClick={() => { console.log(showModal) }} className={styles.text}>В колоде *** карты</p>
                            </div>
                        </div>
                        <div className={styles['info-container__buttons-container']}>
                            {/* {(whoseTurn == 'user') && <Button onClick={() => { }} color="succes" afterIcon={<Take />}>Взять карту</Button>}
                            {(whoseTurn == 'user') && <Button onClick={() => { }} color="error" afterIcon={<Exit />}>Хватит</Button>}
                            {countOfGameSteps == 0 && <Button onClick={} color="suuces" >Начать</Button>} */}
                        </div>
                    </div>
                    <div className={styles['user-zone__card-grid']}>
                        {/* {cardsOfUser.map((card) => <Card key={card.id} nominal={card.name} suit={card.suit} />)} */}
                    </div>
                </div>
            </div>
        </div>
    )
}