import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getCookie } from "../utils/utils";
import { fetchLogout } from "../services/reducers/auth-slice";

const Logout = () => {
  const { isAuthChecked } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogout(getCookie("refreshToken")));
  }, [dispatch]);

  return (
    <>
      {!isAuthChecked ? <Redirect to="/login" /> : <Redirect to="/profile" />}
    </>
  );
};

export default Logout;
