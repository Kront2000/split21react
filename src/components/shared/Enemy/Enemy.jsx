import { use, useEffect, useState } from 'react';
import styles from './Enemy.module.css'
import { useRef } from 'react';

export default function Enemy({ message }) {

    const field = useRef(null)

    const timerRef = useRef(0)

    const [isShowing, setIsShowing] = useState(false);

    function writeText(message) {
        setIsShowing(true)
        let timerIndex = timerRef.current
        if (timerIndex !== 0) {
            clearInterval(timerIndex)
        }
        let length = message.length;
        let i = 0;
        field.current.innerText = ''
        timerIndex = setInterval(() => {
            if (i !== length) {
                field.current.innerHTML += message[i]
                i += 1
            }else{
                clearInterval(timerIndex)
            }
        }, 100)
        timerRef.current = timerIndex

    }

    useEffect(() => {
        if (message.length > 0) {
            writeText(message);
        }
        return () => {
            setIsShowing(false)
        }
    }, [message])

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <svg className={styles['avatar-icon']} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.25 18.3333V13.75H36.6667V9.16667C36.663 7.95221 36.179 6.78852 35.3202 5.92977C34.4615 5.07101 33.2978 4.58696 32.0833 4.58333H27.5V0H22.9167V4.58333H18.3333V0H13.75V4.58333H9.16667C7.95221 4.58696 6.78852 5.07101 5.92977 5.92977C5.07101 6.78852 4.58696 7.95221 4.58333 9.16667V13.75H0V18.3333H4.58333V22.9167H0V27.5H4.58333V32.0833C4.58696 33.2978 5.07101 34.4615 5.92977 35.3202C6.78852 36.179 7.95221 36.663 9.16667 36.6667H13.75V41.25H18.3333V36.6667H22.9167V41.25H27.5V36.6667H32.0833C33.2978 36.663 34.4615 36.179 35.3202 35.3202C36.179 34.4615 36.663 33.2978 36.6667 32.0833V27.5H41.25V22.9167H36.6667V18.3333H41.25ZM32.0833 32.0833H9.16667V9.16667H32.0833V32.0833Z" fill="#D9D9D9" />
                </svg>
            </div>

            <div className={styles.message + " " + (isShowing ? styles['message--show'] : " ")}>
                <p ref={field} onClick={() => writeText('Salam')} className={styles.text}></p>
            </div>
        </div>
    )
}