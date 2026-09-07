import { type NotificationData, notifications } from "@mantine/notifications";
import {
	IconAlertCircle,
	IconCheck,
	IconInfoCircle,
	IconX,
} from "@tabler/icons-react";

export const toast = {
	success: (notification: NotificationData) =>
		notifications.show({
			icon: <IconCheck />,
			title: "Success",
			color: "teal",
			...notification,
		}),

	error: (notification: NotificationData) =>
		notifications.show({
			icon: <IconX />,
			title: "Error",
			color: "red",
			...notification,
		}),

	info: (notification: NotificationData) =>
		notifications.show({
			icon: <IconInfoCircle />,
			title: "Info",
			color: "blue",
			...notification,
		}),

	warning: (notification: NotificationData) =>
		notifications.show({
			icon: <IconAlertCircle />,
			title: "Warning",
			color: "yellow",
			...notification,
		}),

	loading: (notification: NotificationData) =>
		notifications.show({
			loading: true,
			title: "Loading",
			color: "gray",
			...notification,
		}),
};
