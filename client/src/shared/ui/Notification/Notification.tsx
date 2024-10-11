import React from "react";

type NotificationProps = {
  message: string | undefined; // Сообщение уведомления
  type: "success" | "error" | "info"; // Тип уведомления
};

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
}) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500"; // Цвет фона в зависимости от типа уведомления

  return (
    <div
      className={`fixed top-0 right-0 mt-4 mr-4 p-4 rounded ${bgColor} text-white`}
    >
      {message}
    </div>
  );
};

export default Notification;
