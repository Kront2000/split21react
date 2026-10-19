import Loader from '../../shared/Loader/Loader'
import styles from './LoadingOverModal.module.css'

interface Props {
    show: boolean
    message?: string
}

export default function FoundedOverModal({show, message}: Props){
    return (
        <div className={styles.overlay + " " + (show == true ?  " " : styles.hidden)}>
            <div className={styles.modal}>
                <Loader></Loader>
                <p className={styles.text}>{message}</p>
            </div>
        </div>
    )
}