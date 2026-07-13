import Diamonds from "../../icons/Diamonds"
import Hearts from "../../icons/Hearts"
import Peaks from "../../icons/Peaks"
import Clubs from "../../icons/Сlubs"
import styles from "./Card.module.css"

interface Props {
    nominal?: "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "T"
    side?: "front" | "back"
    suit?: "diamonds" | "peaks" | "clubs" | "hearts"
    style?: React.CSSProperties
}

export default function ({ nominal, suit = "diamonds", side = "front", style }: Props) {
    if (side == "front") {
        return (
            <div style={style} className={styles.card}>
                <div className={styles['left-container']}>
                    {suit == "diamonds" && <Diamonds className={styles.suit} />}
                    {suit == "peaks" && <Peaks className={styles.suit} />}
                    {suit == "hearts" && <Hearts className={styles.suit} />}
                    {suit == "clubs" && <Clubs className={styles.suit} />}
                    <span className={suit == "peaks" || suit == "clubs" ? styles.white : styles.red}>{nominal}</span>
                </div>
                <div className={styles['right-container']}>
                    {suit == "diamonds" && <Diamonds className={styles.suit} />}
                    {suit == "peaks" && <Peaks className={styles.suit} />}
                    {suit == "hearts" && <Hearts className={styles.suit} />}
                    {suit == "clubs" && <Clubs className={styles.suit} />}
                    <span className={suit == "peaks" || suit == "clubs" ? styles.white : styles.red}>{nominal}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div style={style} className={styles.card}>
                <span className={styles['back-text']}>
                    Split21
                </span>
            </div>
        )
    }


}