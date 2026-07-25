import { CSSProperties, StyleHTMLAttributes } from "react";
import styles from "./Button.module.css"
import { Link } from "react-router";

interface Props {
    onClick?: () => void
    children?: React.ReactNode
    to?: string
    icon?: React.ReactNode
    fit?: boolean
    afterIcon?: React.ReactNode
    color?: string
    style?: CSSProperties
}

export default function Button ({onClick, children, to, icon, fit, afterIcon, color="default", style}: Props) {
    if (to) {
        return (<Link to={to} className={styles.button + ' ' + (fit == true ? styles.fit : " ") + ' ' + (color !== "default" ? styles[`${color}-background`] : " ")}>{icon}{children}{afterIcon}</Link>)
    } else {
        return <button style={style} onClick={onClick} className={styles.button + ' ' + (fit == true ? styles.fit : " ") + ' ' + (color !== "default" ? styles[`${color}-background`] : " ")}>{icon}{children}{afterIcon}</button>
    }
}