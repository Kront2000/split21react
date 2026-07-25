import styles from './Loader.module.css'
import { useEffect, useState } from 'react'
import Card from '@/src/components/shared/Card/Card'
import randomaizer from '@/src/utils/randomaizer'

interface Card {
    nominal?: "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "T"
    suit?: "diamonds" | "peaks" | "clubs" | "hearts"
}

export default function Leaderboard() {

    const [cardProp, setCardProp] = useState<Card>({ nominal: "6", suit: "clubs" });
    const [side, setSide] = useState<'front' | 'back'>('front')

    function changeCard() {
        const nominal = ["6", "7", "8", "9", "10", "J", "Q", "K", "T"]
        const suit = ["diamonds", "peaks", "clubs", "hearts"]
        setCardProp({ nominal: nominal[randomaizer(0, 8)] as "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "T", suit: suit[randomaizer(0, 3)] as "diamonds" | "peaks" | "clubs" | "hearts" })
    }

    const [isSpin, setIsSpin] = useState(false);
    function startLoading(foo: boolean = true) {
        if (foo) {
            setIsSpin(true)
            setTimeout(() => {
                setSide("back")
            },800)
            setTimeout(() => { startLoading(false) }, 2000)
        } else {
            changeCard()
            setIsSpin(false)
            setTimeout(() => {
                setSide("front")
            },800)
            setTimeout(() => { startLoading(true) }, 2000)

        }
    }

    useEffect(() => {
        startLoading()
    }, [])

    return (
        <div className={styles.loading}>
            <Card suit={cardProp.suit} nominal={cardProp.nominal} side={side} className={styles.card + " " + (isSpin ? styles.spin : "")} />
            <p className={styles.loading__text}>loading...</p>
        </div>
    )
}