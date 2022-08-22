import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  Input,
  Logo,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { formSetValue } from "../services/reducers/form-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css";
import { fetchRegister } from "../services/reducers/register-slice";

const Register = () => {
  const dispatch = useDispatch();
  const { name, email, password } = useSelector((state) => state.form);
  const { success } = useSelector((state) => state.register);
  const history = useHistory();

  useEffect(() => {
    if (success) {
      history.push("/profile");
    }
  }, [success, history]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchRegister({ name, email, password }));
  };

  const onChange = (evt) => {
    dispatch(formSetValue({ input: evt.target.name, value: evt.target.value }));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className="text_type_main-medium mt-10 pt-10 mb-6">Регистрация</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={`${styles.input_wrapper} mb-6`}>
            <Input
              onChange={onChange}
              placeholder="Имя"
              name="name"
              value={name}
            />
          </div>
          <div className={`${styles.input_wrapper} mb-6`}>
            <EmailInput onChange={onChange} name="email" value={email} />
          </div>
          <div className={`${styles.input_wrapper} mb-6`}>
            <PasswordInput
              onChange={onChange}
              value={password}
              name="password"
            />
          </div>
          <Button primary>Зарегистрироваться</Button>
        </form>
        <p className="text_type_main-default text_color_inactive pt-10 mt-10">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
