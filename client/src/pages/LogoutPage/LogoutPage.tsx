import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { logout } from "@/entities/user";
import "./Logout.css";

const LogoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="container">
        <p className="text" style={{ textAlign: "center" }}>Вы действительно хотите выйти?</p>
        <div className="buttonContainer">
          <Button
            type="default"
            className="cancelButton"
            size="large"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Да
          </Button>
          <Button
            type="primary"
            onClick={() => navigate("/")}
            size="large"
          >
            Нет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
