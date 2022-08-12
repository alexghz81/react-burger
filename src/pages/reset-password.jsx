import React from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  formSetValue,
  fetchResetPassword,
} from "../services/reducers/auth-slice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { password } = useSelector((state) => state.auth.form);
  const { token } = useSelector((state) => state.auth.form);

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchResetPassword({ password, token }));
  };

  const onChange = (evt) => {
    dispatch(formSetValue({ input: evt.target.name, value: evt.target.value }));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text_type_main-medium mt-10 pt-10 mb-6">
        Восстановление пароля
      </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={`${styles.input_wrapper} mb-5`}>
          <PasswordInput
            placeholder="Введите новый пароль"
            onChange={onChange}
            value={password}
            name="password"
            type="password"
          />
        </div>
        <div className={`${styles.input_wrapper} mb-5`}>
          <Input
            placeholder="Введите код из письма"
            onChange={onChange}
            value={token}
            name="token"
          />
        </div>
        <Button primary>Сохранить</Button>
      </form>
      <p className="text_type_main-default text_color_inactive pt-10 mt-10">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
