import BronzeMedalIcon from '../../icons/BronzeMedalIcon'
import GoldMedalIcon from '../../icons/GoldMedalIcon'
import SilverMedalIcon from '../../icons/SilverMedalIcon'
import styles from './LeaderRow.module.css'


interface Props {
    name: string,
    score: number,
    place: number
}

export default function Leaderboard({ name, score, place }: Props) {
    return (
        <div className={styles.row}>
            <div className={styles.row__right}>
                <div className={styles['row__place']}>
                    {place == 1 && <GoldMedalIcon />}
                    {place == 2 && <SilverMedalIcon />}
                    {place == 3 && <BronzeMedalIcon />}
                    {place !== 1 && place !== 2 && place !== 3 && <p className={styles.row__text}>{place}</p>}
                </div>
                <p className={styles.row__text}>{name}</p>
            </div>
            <p className={styles.row__text}>{score}</p>
        </div>
    )
}