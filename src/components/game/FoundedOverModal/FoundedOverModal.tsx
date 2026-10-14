import Loader from '../../shared/Loader/Loader'
import styles from './FoundedOverModal.module.css'

interface Props {
    show: boolean
}

export default function FoundedOverModal({show}: Props){
    return (
        <div className={styles.overlay + " " + (show == true ?  " " : styles.hidden)}>
            <div className={styles.modal}>
                <Loader></Loader>
                <p className={styles.text}>Ищем соперниа...</p>
                <p className={styles.text}>Пожалуйста подождите</p>
            </div>
        </div>
    )
}