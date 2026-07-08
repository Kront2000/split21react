import Card from '@/src/components/shared/Card/Card'
import styles from './Rules.module.css'
import Button from '@/src/components/shared/Button/Button';
import Back from '@/src/components/icons/Back';



export default function Rules() {

    const arr = [{name: "J", value: 2}, {name: "Q", value: 3}, {name: "K", value: 4} ,{name: "6", value: 6}, {name: "7", value: 7}, {name: "8", value: 8}, {name: "9", value: 9}, {name: "10", value: 10}, {name: "T", value: 11}];

    return (
        <div className={styles.board}>
            <Button fit={true} to={"/"} icon={<Back />}>Назад</Button>

            <h1 className={styles.title}>Правила игры</h1>
            <p className={styles.text}>Добро пожаловать в игру! Ваша главная задача — обыграть дилера.</p>
            <h4 className={styles.subtitle}>Цель игры</h4>
            <p className={styles.text}>Вам необходимо набрать 21 очко или количество очков, максимально близкое к этому значению, но не превышающее его. Если вы наберете больше 21 очка — это «перебор» (проигрыш).</p>
            <h4 className={styles.subtitle}>Ход игры</h4>
            <p className={styles.text}>Вам необходимо набрать 21 очко или количество очков, максимально близкое к этому значению, но не превышающее его. Если вы наберете больше 21 очка — это «перебор» (проигрыш).</p>
            <ol className={styles.list}>
                <li className={styles.li}>Раздача: В начале раунда вы и дилер получаете по 1 карте. Вы видите только свои карты. Карты соперника скрыты рубашкой вверх.</li>
                <li className={styles.li}>Дуэль по очереди: Игроки делают ходы строго по очереди. В свой ход вы можете:</li>
                <ul className={styles.list}>
                    <li className={styles.li}>«Взять карту»: Вы тайно берете карту из колоды. Соперник видит только сам факт добора, но не знает номинал карты.</li>
                    <li className={styles.li}>Вы фиксируете свои очки и завершаете набор.</li>
                </ul>
                <li className={styles.li}>Ожидание финала: После того как вы нажали «Пас», вы больше не можете брать карты. Дилер продолжает делать свои ходы (брать карты или пасовать), пока тоже не остановится.</li>
                <li className={styles.li}>Вскрытие (Шоудаун): Как только оба участника сказали «Пас», карты переворачиваются, и происходит подсчет очков.</li>
            </ol>
            <h4 className={styles.subtitle}>Определение победителя</h4>
            <ul className={styles.list}>
                <li className={styles.li}>Победа:</li>
                <ul className={styles.list}>
                    <li className={styles.li}>Вы набрали очков больше, чем дилер, не превысив 21.</li>
                    <li className={styles.li}>Дилер набрал больше 21 очка (перебор), а вы остановились вовремя.</li>
                </ul>
                <li className={styles.li}>Поражение:</li>
                <ul className={styles.list}>
                    <li className={styles.li}>Сумма очков дилера ближе к 21, чем ваша.</li>
                    <li className={styles.li}>Вы набрали больше 21 очка.</li>
                </ul>
                <li className={styles.li}>Ничья: У вас и у дилера абсолютно одинаковое количество очков.</li>
            </ul>
            <h4 className={styles.subtitle}>Номинал карт</h4>

            <div className={styles.grid}>
                {arr.map((card) => <div key={card.value} className={styles["card-wrapper"]}><Card nominal={card.name} scale='1' /><p className={styles.text}>{card.value}</p></div>)}
            </div>
        </div>
    )
}