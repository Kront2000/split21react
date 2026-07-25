import { useEffect, useRef, useState } from 'react'
import Warning from '../../icons/Warning'
import styles from './ToastNotice.module.css'
import useToast from '@/src/stores/toast'
import Success from '../../icons/Success'
import Info from '../../icons/Info'

interface Props {
    id: number
    description: string
    type?: "success" | "error" | "info"
}

export default function ToastNotice({ id, description, type = "info" }: Props) {

    const [isHidden, setIsHidden] = useState(true)
    const deleteNotice = useToast().delete
    const [translateX, setTranslateX] = useState(0)
    const isDragging = useRef(false)
    const initialX = useRef(0)
    const x = useRef(0)

    const notice = useRef(null)

    function handleMouseDown(e: React.MouseEvent) {
        isDragging.current = true
        initialX.current = e.clientX
    }

    function handleMouseMove(e: MouseEvent) {
        if (!isDragging.current) return;
        x.current = e.clientX
        if (isDragging.current) {
            setTranslateX(0 - (initialX.current - x.current))
            console.log("translate - " + translateX)
            console.log("initial - " + initialX.current)
            console.log("x - " + x.current)
        }
    }

    function handleMouseUp() {
        if (!isDragging.current) return;
        if(initialX.current - x.current < 80 && initialX.current - x.current > -80){
            setTranslateX(0)
        } else if (initialX.current - x.current > 80){
            setTranslateX(-300)
            setIsHidden(true)
        } else if(initialX.current - x.current < -80){
            setTranslateX(300)
            setIsHidden(true)
        }
        isDragging.current = false
    }


    useEffect(() => {
        setIsHidden(false)
        setTimeout(() => { setIsHidden(true) }, 4700)
        setTimeout(() => { deleteNotice(id) }, 5000)

        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)

        return (() => {
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleMouseMove)
        })
    }, [])

    return (
        <div draggable="false" style={{ transform: `translateX(${translateX}px)` }} onMouseDown={handleMouseDown} ref={notice} className={styles.notice + " " + (isHidden ? styles["notice--hidden"] : " ")}>
            <span className={styles[`notice__line--${type}`]}></span>
            
            {type == "error" && <Warning />}
            {type == "success" && <Success />}
            {type == "info" && <Info />}

            <div className={styles["notice__text-block"]}>
                {type === "error" && <p className={styles.notice__title}>Ошибка</p>}
                {type === "success" && <p className={styles.notice__title}>Успешно</p>}
                <p className={styles.notice__description}>{description}</p>
            </div>
        </div>
    )
}