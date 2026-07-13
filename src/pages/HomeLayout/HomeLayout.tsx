import Background from '@/src/components/shared/Background/Background'
import styles from './HomeLayout.module.css'
import { Outlet } from "react-router";


export default function Home() {
    return (
        <div className={styles.screen}>
            <Background />

            <Outlet />
        </div>
    )
}