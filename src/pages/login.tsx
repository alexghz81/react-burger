import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import styles from "./form.module.css";
import { formSetValue } from "../services/reducers/form-slice";
import { fetchLogin, setAuthPassword } from "../services/reducers/auth-slice";
import { useAppDispatch, useAppSelector } from "../services/hook";

const Login = () => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.form);
  const { isAuthChecked } = useAppSelector((state) => state.auth);
  const history = useHistory();

  const onSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    dispatch(setAuthPassword(password));
    dispatch(fetchLogin({ email, password }));
  };

  useEffect(() => {
    if (isAuthChecked) {
      history.push("/profile");
    }
  }, [isAuthChecked, history]);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
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
        <Button type={"primary"}>Войти</Button>
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
