import styles from "./Field.module.css"

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string,
    name: string,
    label?: string,
    value: string
}

export default function Field({handleChange, error, name, label, value} : Props) {
    return (
        <>
            {label && <label className={styles.form__label} htmlFor={name}>{label}</label>}
            <input value={value} onChange={handleChange} type="text" name={name} className={styles.form__input + " " + {}} />
            {error.length > 0 && <p className={styles["form__input-error-message"]}>{error}</p>}
        </>
    )
}