import styles from './Home.module.css'
import Button from '@/src/components/shared/Button/Button';


export default function Home() {
    return (
        <div className={styles.menu}>
            <p className={styles.menu__title}>Split21</p>
            <Button to="/game">Играть с ИИ</Button>
            <Button to="/rules">Правила</Button>
        </div>


    )
}