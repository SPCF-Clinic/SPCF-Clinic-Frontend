import { type NotificationData, notifications } from "@mantine/notifications";

export const toast = {
	success: (notification: NotificationData) =>
		notifications.show({
			title: "Success",
			color: "teal",
			...notification,
		}),

	error: (notification: NotificationData) =>
		notifications.show({
			title: "Error",
			color: "red",
			...notification,
		}),

	info: (notification: NotificationData) =>
		notifications.show({
			title: "Info",
			color: "blue",
			...notification,
		}),

	warning: (notification: NotificationData) =>
		notifications.show({
			title: "Warning",
			color: "yellow",
			...notification,
		}),
};
