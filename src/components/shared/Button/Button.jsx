import styles from "./Button.module.css"
import { Link } from "react-router";

export default function Button ({onClick, children, to, icon, fit, afterIcon, color="default"}) {
    if (to) {
        return (<Link to={to} className={styles.button + ' ' + (fit == true ? styles.fit : " ") + ' ' + (color !== "default" ? styles[`${color}-background`] : " ")}>{icon}{children}{afterIcon}</Link>)
    } else {
        return <button onClick={onClick} className={styles.button + ' ' + (fit == true ? styles.fit : " ") + ' ' + (color !== "default" ? styles[`${color}-background`] : " ")}>{icon}{children}{afterIcon}</button>
    }
}