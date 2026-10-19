import { use, useEffect, useState } from 'react';
import styles from './Enemy.module.css'
import { useRef } from 'react';

interface Props {
    message: string
    name?: string
    rating?: string
}

export default function Enemy({ message, name, rating }: Props) {

    const field = useRef<HTMLParagraphElement>(null)

    const timerRef = useRef(0)

    const [isShowing, setIsShowing] = useState(false);

    function writeText(message: string) {
        setIsShowing(true)
        let timerIndex = timerRef.current
        if (timerIndex !== 0) {
            clearInterval(timerIndex)
        }
        let length = message.length;
        let i = 0;
        if (field.current) {
            field.current.innerText = ''
            timerIndex = setInterval(() => {
                if (i !== length) {
                    if (field.current) {
                        field.current.innerHTML += message[i]
                    }
                    i += 1
                } else {
                    clearInterval(timerIndex)
                }
            }, 100)
            timerRef.current = timerIndex
        }


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
                {name &&
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_295_282)">
                            <path d="M51.0163 40.8666C48.3383 37.965 45.0883 35.6493 41.4712 34.0655C37.8542 32.4817 33.9483 31.6641 29.9997 31.6641C26.051 31.6641 22.1452 32.4817 18.5281 34.0655C14.911 35.6493 11.6611 37.965 8.98301 40.8666C8.56818 41.323 8.33668 41.9166 8.33301 42.5333V52.5333C8.34177 53.1906 8.60903 53.8179 9.07692 54.2796C9.54482 54.7412 10.1757 55 10.833 55H49.1663C49.8294 55 50.4653 54.7366 50.9341 54.2677C51.4029 53.7989 51.6663 53.163 51.6663 52.5V42.5C51.6545 41.8948 51.4236 41.3145 51.0163 40.8666Z" fill="white" fillOpacity="0.89" />
                            <path d="M30.0007 28.3333C36.444 28.3333 41.6673 23.11 41.6673 16.6667C41.6673 10.2233 36.444 5 30.0007 5C23.5573 5 18.334 10.2233 18.334 16.6667C18.334 23.11 23.5573 28.3333 30.0007 28.3333Z" fill="white" fillOpacity="0.89" />
                        </g>
                        <defs>
                            <clipPath id="clip0_295_282">
                                <rect width="60" height="60" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                }
                {!name &&
                    <svg className={styles['avatar-icon']} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.25 18.3333V13.75H36.6667V9.16667C36.663 7.95221 36.179 6.78852 35.3202 5.92977C34.4615 5.07101 33.2978 4.58696 32.0833 4.58333H27.5V0H22.9167V4.58333H18.3333V0H13.75V4.58333H9.16667C7.95221 4.58696 6.78852 5.07101 5.92977 5.92977C5.07101 6.78852 4.58696 7.95221 4.58333 9.16667V13.75H0V18.3333H4.58333V22.9167H0V27.5H4.58333V32.0833C4.58696 33.2978 5.07101 34.4615 5.92977 35.3202C6.78852 36.179 7.95221 36.663 9.16667 36.6667H13.75V41.25H18.3333V36.6667H22.9167V41.25H27.5V36.6667H32.0833C33.2978 36.663 34.4615 36.179 35.3202 35.3202C36.179 34.4615 36.663 33.2978 36.6667 32.0833V27.5H41.25V22.9167H36.6667V18.3333H41.25ZM32.0833 32.0833H9.16667V9.16667H32.0833V32.0833Z" fill="#D9D9D9" />
                    </svg>}
            </div>

            {name &&
                <div className={styles['enemy-info']}>
                    <p className={styles.text}>{name}</p>
                    {rating && <p className={styles.text}>рейтинг: {rating} очков</p>}
                </div>
            }


            {!name &&
                <div className={styles.message + " " + (isShowing ? styles['message--show'] : " ")}>
                    <p ref={field} onClick={() => writeText('Salam')} className={styles.text}></p>
                </div>}

        </div>
    )
}