import React, { useEffect } from "react";
import styles from "./form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { formSetValue } from "../services/reducers/form-slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchForgotPassword } from "../services/reducers/forgot-password-slice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.form);
  const { success } = useSelector((state) => state.forgotPassword);
  const history = useHistory();

  const onChange = (evt) => {
    dispatch(formSetValue({ input: evt.target.name, value: evt.target.value }));
  };

  const onSubmit = (evt) => {
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
        <Button primary>Восстановить</Button>
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
