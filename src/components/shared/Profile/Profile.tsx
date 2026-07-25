import Button from '@/src/components/shared/Button/Button'
import styles from './Profile.module.css'
import { useEffect, useState } from 'react'
import * as cookie from '@/src/utils/cookie'
import useToast from '@/src/stores/toast'


interface UserData {
    login: string
    score: number
}

export default function Profile() {

    const toast = useToast().add

    const [isLogin, setIsLogin] = useState(false)
    const [playerData, setPlayerData] = useState<UserData>()

    async function checkSession(){
        if (cookie.getCookie("accessToken")) {
            setIsLogin(true)
            const response = await fetch(import.meta.env.VITE_SERVER_URL + "/user", {
                credentials: "include"
            })
            if(response.ok){
                const body = JSON.parse(await response.text()) as UserData
                setPlayerData(body)
            } else {
                toast(await response.text(), "error")
            }
        }
    }

    useEffect(() => {
        checkSession()
    }, [])

    const [isOpen, setIsOpen] = useState(false)

    function handleClick() {
        console.log(isOpen);
        setIsOpen((prev) => !prev);
    }

    function logOut(){
        cookie.deleteCoockie("accessToken")
        setIsLogin(false)
    }

    return (
        <div className={styles.wrapper + " " + (!isLogin ? styles.hidden : " ")}>
            <div className={styles["avatar-and-name"]}>
                <div onClick={handleClick} className={styles.avatar}>
                    <img src="src/assets/image/avatar.png" className={styles.avatar__image} alt="" />
                </div>

                <p className={styles.name + " " + (isOpen ? " " : styles["name--hidden"])}>{playerData?.login}</p>
            </div>

            <div className={styles["main-block"] + " " + (isOpen ? " " : styles['main-block--hidden'])}>
                <div className={styles["main-block__info"]}>
                    <p className={styles["main-block__text"]}>Кол-во побед</p>
                    <div className={styles["main-block__row"]}>
                        <p className={styles["main-block__text"]}>Против ИИ:</p>
                        <p className={styles["main-block__text"]}>{playerData?.score}</p>
                    </div>
                </div>
                <Button onClick={logOut} style={{ padding: "2px 5px" }}>Выйти</Button>
            </div>


        </div>
    )

}