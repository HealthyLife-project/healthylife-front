import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotificationWithIcon = (
  type: NotificationType,
  text: string
) => {
  const notifi = notification;
  const message = text;

  notifi[type]({
    message,
  });
};
