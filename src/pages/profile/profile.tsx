import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import LeftMenu from "../../components/left-menu/left-menu";
import formStyles from "../form.module.css";
import { formSetValue } from "../../services/reducers/form-slice";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchUpdateUser } from "../../services/reducers/auth-slice";
import { useAppDispatch, useAppSelector } from "../../services/hook";

const Profile = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const form = useAppSelector((state) => state.form);

  const setInitialForm = () => {
    dispatch(formSetValue({ input: "name", value: auth.name }));
    dispatch(formSetValue({ input: "email", value: auth.email }));
    dispatch(formSetValue({ input: "password", value: auth.password }));
  };

  useEffect(() => {
    setInitialForm();
  }, []);

  const onSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    dispatch(
      fetchUpdateUser({
        name: form.name,
        email: form.email,
        password: form.password,
      })
    );
    setButtonsVisible(false);
  };

  const handleCancel = (evt: React.FormEvent): void => {
    evt.preventDefault();
    setInitialForm();
    setButtonsVisible(false);
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      formSetValue({
        input: evt.target.name,
        value: evt.target.value,
      })
    );
    setButtonsVisible(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_wrapper}>
        <LeftMenu />
        <form className={formStyles.form} onSubmit={onSubmit}>
          <div className={`${formStyles.input_wrapper} mb-6`}>
            <Input
              onChange={onChange}
              placeholder="Имя"
              name="name"
              value={form.name}
            />
          </div>
          <div className={`${formStyles.input_wrapper} mb-6`}>
            <EmailInput onChange={onChange} name="email" value={form.email} />
          </div>
          <div className={`${formStyles.input_wrapper} mb-6`}>
            <PasswordInput
              onChange={onChange}
              name="password"
              value={form.password}
            />
          </div>
          {buttonsVisible && (
            <div className={styles.profile_buttons}>
              <Button type="secondary" size="medium" onClick={handleCancel}>
                Отмена
              </Button>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
