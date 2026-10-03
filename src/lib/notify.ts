import { NOTIFY_API_URL, APP_SHARED_SECRET } from "../config";

export type NotifyPayload = {
  type: "booking" | "enquiry";
  serviceId?: string;
  serviceTitle?: string;
  bookingId?: string;
  name: string;
  phone: string;
  email?: string;
  date?: string;
  time?: string;
  message?: string;
};

export async function sendNotification(payload: NotifyPayload): Promise<void> {
  const response = await fetch(NOTIFY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(APP_SHARED_SECRET ? { "x-api-key": APP_SHARED_SECRET } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to send notification");
  }
}
