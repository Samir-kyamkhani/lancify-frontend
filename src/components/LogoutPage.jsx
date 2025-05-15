import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    sessionStorage.clear();

    dispatch(logoutUser());

    navigate("/login");
  }, [dispatch, navigate]);

  return null;
};

export default LogoutPage;
