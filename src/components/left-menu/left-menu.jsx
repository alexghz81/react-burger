import React from "react";
import styles from "./left-menu.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/utils";
import { fetchLogout } from "../../services/reducers/auth-slice";

const LeftMenu = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <ul className={`${styles.items} pl-5`}>
        <li>
          <NavLink
            to="/profile"
            className={`${styles.link} text_type_main-medium pl-6 pr-6 pb-5 pt-4`}
            activeClassName={styles.active}
            exact
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/orders"
            className={`${styles.link} text_type_main-medium pl-6 pr-6 pb-4 pt-4`}
            activeClassName={styles.active}
            exact
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={`${styles.link} text_type_main-medium pl-6 pr-6 pb-5 pt-4`}
            activeClassName={styles.active}
            exact
            onClick={() => {
              dispatch(fetchLogout(getCookie("refreshToken")));
            }}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p
        className={`${styles.text} text_type_main-default text_color_inactive pl-5 pt-20`}
      >
        В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные данные
      </p>
    </div>
  );
};

export default LeftMenu;
