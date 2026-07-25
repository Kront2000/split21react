import { useState } from 'react';
import styles from './Login.module.css'
import { useNavigate } from "react-router";
import useToast from '@/src/stores/toast';
import Field from '@/src/components/form/Field/Field';
import { Link } from "react-router";

export default function Register() {
    let navigate = useNavigate();
    const [loginError, setLoginError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const toast = useToast().add

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (!login) {
            setLoginError("Введите логин")
            return
        }
        if (!password) {
            setPasswordError("Введите пароль")
            return
        }

        let response = await fetch(import.meta.env.VITE_SERVER_URL + "/auth/login", {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({ login: login, password: password })
        })
        const text = await response.text()
        if (response.ok) {
            toast("Успешно вошли", "success")
            navigate("/")
        } else if (text === "Invalid username or password") {
            toast("Неверный логин или пароль", "error")
            setLogin("")
            setPassword("")
        }
        else {
            toast(await response.text(), "error")
        }
    }

    async function handleChangeLogin(e: React.ChangeEvent<HTMLInputElement>) {
        setLogin(e.target.value)
        if (e.target.value.length < 1) {
            setLoginError("Введите логин")
        } else {
            setLoginError("")
        }
    }

    async function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
        if (e.target.value.length < 1) {
            setPasswordError("Введите Пароль")
        } else {
            setPasswordError("")
        }
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className={styles.form__title}>Войти</p>
                <div className={styles.form__body}>
                    <Field value={login} error={loginError} handleChange={handleChangeLogin} name='login' label='Логин' />
                    <Field value={password} error={passwordError} handleChange={handleChangePassword} name='password' label='Пароль' />
                </div>
                <button className={styles.form__submit} type='submit'>Войти</button>
            </form>

            <div className={styles['bottom-block']}>
                <p className={styles.text}>Ещё нет аккаунта?</p>
                <Link to='/register' className={styles.link}>Зарегестрироваться</Link>
            </div>
        </div>

    )
}