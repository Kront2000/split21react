import { useEffect } from 'react'
import styles from './Background.module.css'

export default function Background({speed, opacity}) {
    useEffect(() => {
        let div = document.getElementById("background");
        if(speed){
            div.style.setProperty('--move-speed', speed)
        }
        if(opacity){
            div.style.setProperty('--opacity', opacity)
        }
    }, [speed, opacity])
    return (
        <div id='background' className={styles.wallpaper}>
        </div>
    )
}