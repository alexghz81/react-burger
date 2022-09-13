import React, { useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from "./form.module.css";
import { formSetValue } from "../services/reducers/form-slice";
import { fetchResetPassword } from "../services/reducers/reset-password-slice";
import { useAppDispatch, useAppSelector } from "../services/hook";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { password, token } = useAppSelector((state) => state.form);
  const { success } = useAppSelector((state) => state.resetPassword);
  const { isForgotPassword } = useAppSelector((state) => state.forgotPassword);
  const history = useHistory();

  useEffect(() => {
    if (success) {
      history.push("/profile");
    }
  }, [success, history]);

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(fetchResetPassword({ password, token }));
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(formSetValue({ input: evt.target.name, value: evt.target.value }));
  };

  return isForgotPassword ? (
    <div className={styles.wrapper}>
      <h1 className="text_type_main-medium mt-10 pt-10 mb-6">
        Восстановление пароля
      </h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={`${styles.input_wrapper} mb-5`}>
          <PasswordInput onChange={onChange} value={password} name="password" />
        </div>
        <div className={`${styles.input_wrapper} mb-5`}>
          <Input
            placeholder="Введите код из письма"
            onChange={onChange}
            value={token}
            name="token"
          />
        </div>
        <Button type={"primary"}>Сохранить</Button>
      </form>
      <p className="text_type_main-default text_color_inactive pt-10 mt-10">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  ) : (
    <Redirect to="/forgot-password" />
  );
};

export default ResetPassword;
