import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref([]);
    const unreadCount = ref(0);

    const fetchNotifications = async () => {
        try {
            // Introduce a delay of 1.5 seconds (1500 milliseconds)
            await new Promise(resolve => setTimeout(resolve, 1200));

            const { data } = await axios.get('/api/notifications/fetch-notification');
            notifications.value = data.notifications;
            unreadCount.value = data.notifications.filter(notification => !notification.is_read).length; // Ensure correct property
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    // Mark a notification as read
    const markAsRead = async (notificationId) => {
        const notificationIndex = notifications.value.findIndex(notification => notification.notification_id === notificationId);
        if (notificationIndex !== -1) {
            notifications.value[notificationIndex].is_read = 1; // Optimistic update
        }

        try {
            await axios.post('/api/notifications/mark-as-read', { id: notificationId });
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            // Rollback the optimistic update if the request fails
            notifications.value[notificationIndex].is_read = 0; // Rollback
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            await axios.post('/api/notifications/mark-all-as-read'); // Call the new API endpoint
            notifications.value.forEach(notification => {
                notification.is_read = 1; // Mark all notifications as read
            });
            unreadCount.value = 0; // Reset unread count
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };

    // Delete a notification
    const deleteNotification = async (notificationId) => {
        try {
            const response = await axios.post('/api/notifications/delete-notification-inbox', { id: notificationId });
            if (response.data.status === 200) {
                const notificationIndex = notifications.value.findIndex(notification => notification.notification_id === notificationId);
                if (notificationIndex !== -1) {
                    notifications.value.splice(notificationIndex, 1); // Remove the notification from the list
                }
            } else {
                console.error("Failed to delete notification:", response.data.body.message);
            }
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    // Mark as unread a notification
    const markAsUnread = async (notificationId) => {
        const notificationIndex = notifications.value.findIndex(notification => notification.notification_id === notificationId);
        if (notificationIndex !== -1) {
            notifications.value[notificationIndex].is_read = 0; // Optimistic update
        }

        try {
            await axios.post('/api/notifications/mark-as-unread', { id: notificationId });
        } catch (error) {
            console.error("Failed to mark notification as unread:", error);
            // Rollback the optimistic update if the request fails
            notifications.value[notificationIndex].is_read = 1; // Rollback
        }
    };


    return { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead, deleteNotification, markAsUnread };
});
