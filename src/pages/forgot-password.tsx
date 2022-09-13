import React, { useEffect } from "react";
import styles from "./form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { formSetValue } from "../services/reducers/form-slice";
import { fetchForgotPassword } from "../services/reducers/forgot-password-slice";
import { useAppDispatch, useAppSelector } from "../services/hook";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.form);
  const { success } = useAppSelector((state) => state.forgotPassword);
  const history = useHistory();
  const location = useLocation();
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(formSetValue({ input: evt.target.name, value: evt.target.value }));
  };

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(fetchForgotPassword({ email }));
  };

  useEffect(() => {
    if (success) {
      location.state = history.push("/reset-password");
    }
  }, [success, history]);

  return (
    <div className={styles.wrapper}>
      <h1 className="text_type_main-medium mt-10 pt-10 mb-6">
        Восстановление пароля
      </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={`${styles.input_wrapper} mb-5`}>
          <Input
            onChange={onChange}
            value={email}
            name="email"
            placeholder="Укажите e-mail"
          />
        </div>
        <Button type={"primary"}>Восстановить</Button>
      </form>
      <p className="text_type_main-default text_color_inactive pt-10 mt-10">
        Вспомнили пароль?&nbsp;
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
