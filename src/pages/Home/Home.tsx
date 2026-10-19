import useToast from '@/src/stores/toast';
import styles from './Home.module.css'
import Button from '@/src/components/shared/Button/Button';
import * as cookie from '@/src/utils/cookie';
import { useEffect, useState } from 'react';

export default function Home() {

    const add = useToast().add
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if(cookie.getCookie("accessToken")){
            setIsLogin(true)
        }
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.menu}>
                <p className={styles.menu__title}>Split21</p>
                <Button to="/game/ai">Играть с ИИ</Button>
                <Button to="/game/pvp">Играть онлайн</Button>
                <Button to="/leader-board">Зал славы</Button>
                <Button to="/rules">Правила</Button>
                {!isLogin && <Button to="/register">Войти</Button>}
            </div>
        </div>



    )
}