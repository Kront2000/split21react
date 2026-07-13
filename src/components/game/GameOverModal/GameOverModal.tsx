import styles from './GameOverModal.module.css'
import Button from '@/src/components/shared/Button/Button'

interface Props {
    message: {message: string, win?: "user" | "enemy"}
    show: boolean
    startGame?: () => void
}

export default function GameOverModal({message, show, startGame}: Props){
    return (
        <div onClick={startGame} className={styles.overlay + " " + (show == true ?  " " : styles.hidden)}>
            <div className={styles.modal}>
                <img className={styles.modal__img} src={message.win ? 'src/assets/image/happycat.jpg' : 'src/assets/image/sadcat.jpg'} alt="" />
                <p className={styles.text}>{message.message}</p>
                <p className={styles.text}>{show}</p>
                <Button onClick={startGame}>Начать заново</Button>
                <Button to="/rules">Правила</Button>
            </div>
        </div>
    )
}