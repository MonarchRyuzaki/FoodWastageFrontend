import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/slices/auth";

export default function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLogout = () => {
      dispatch(logout());
      navigate("/");
    };
    handleLogout();
  }, [navigate, dispatch]);
  return <></>;
}
