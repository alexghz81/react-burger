import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formSetValue } from "../services/reducers/auth-slice";

const Login = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth.form);

  const onSubmit = (evt) => {
    evt.preventDefault();
    // dispatch();
  };

  const onChange = (evt) => {
    dispatch(formSetValue({ input: evt.target.name, value: evt.target.value }));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text_type_main-medium mt-10 pt-10 mb-6">Вход</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={`${styles.input_wrapper} mb-6`}>
          <EmailInput onChange={onChange} value={email} name="email" />
        </div>
        <div className={`${styles.input_wrapper} mb-6`}>
          <PasswordInput onChange={onChange} value={password} name="password" />
        </div>
        <Button primary>Войти</Button>
      </form>
      <p className="text_type_main-default text_color_inactive pt-10 mt-10">
        Вы — новый пользователь?&nbsp;
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?&nbsp;
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
