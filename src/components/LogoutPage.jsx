import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../app/features/authSlice"; // if using redux

const LogoutPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    // Clear localStorage
    localStorage.clear();

    // Optional: Clear cookies or sessionStorage if used
    sessionStorage.clear();

    // Optional: Clear Redux store
    // dispatch(logoutUser());

    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return null;
};

export default LogoutPage;
