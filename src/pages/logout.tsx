import { useEffect } from "react";
import { Redirect } from "react-router";
import { fetchLogout } from "../services/reducers/auth-slice";
import { useAppDispatch, useAppSelector } from "../services/hook";

const Logout = () => {
  const { isAuthChecked } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLogout());
  }, [dispatch]);

  return (
    <>
      {!isAuthChecked ? <Redirect to="/login" /> : <Redirect to="/profile" />}
    </>
  );
};

export default Logout;
