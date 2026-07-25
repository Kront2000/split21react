import useToast from '@/src/stores/toast'
import ToastNotice from '../ToastNotise/ToastNotice'
import styles from './Toast.module.css'
import { useEffect } from 'react'

export default function Toast(){

    const list = useToast().list

    return (
        <div className={styles.wrapper}>
            {list.map((notice, index) => <ToastNotice id={notice.id} key={notice.id} type={notice.type} description={notice.description}/>) }
        </div>
    )
}