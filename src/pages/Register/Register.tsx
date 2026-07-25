import { useState } from 'react';
import styles from './Register.module.css'
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

        if (login.length < 4) {
            setLoginError("Логин должен быть не меньше 4 символов")
            return
        }
        if (password.length < 8) {
            setPasswordError("Пароль не должен быть короче 8 символов")
            return
        }
        let response = await fetch(import.meta.env.VITE_SERVER_URL + "/auth/register", {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({ login: login, password: password })
        })
        const responseText = await response.text()
        if (response.ok) {
            toast("Аккаунт успешно создан", "success")
            navigate("/")
        } else if (responseText === "user already exist") {
            toast("Пользователь с таким именем уже существует", "error")
            setLoginError("Пользователь с таким именем уже существует")
        }
        else {
            toast(await response.text(), "error")
        }
    }

    async function handleChangeLogin(e: React.ChangeEvent<HTMLInputElement>) {
        setLogin(e.target.value)
        if (e.target.value.length < 4) {
            setLoginError("Логин должен быть не меньше четырёх символов")
        } else {
            setLoginError("")
        }
    }

    async function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
        if (e.target.value.length < 8) {
            setPasswordError("Пароль должен быть не менее восьми символов")
        } else {
            setPasswordError("")
        }
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p className={styles.form__title}>Регистрация</p>
                <div className={styles.form__body}>
                    <Field value={login} error={loginError} handleChange={handleChangeLogin} name='login' label='Логин' />
                    <Field value={password} error={passwordError} handleChange={handleChangePassword} name='password' label='Пароль' />
                </div>
                <button className={styles.form__submit} type='submit'>Зарегестрироваться</button>
            </form>

            <div className={styles['bottom-block']}>
                <p className={styles.text}>Уже есть Аккаунт?</p>
                <Link to='/login' className={styles.link}>Войти</Link>
            </div>
        </div>

    )
}