import { useState } from "react";
import { View, Text, Pressable, Alert, Linking, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TextField } from "../ui/TextField";
import { DateField } from "../ui/DateField";
import { SuccessOverlay } from "../ui/SuccessOverlay";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { Service } from "../../data/services";
import { TEMPLE } from "../../data/temple";
import { sendNotification } from "../../lib/notify";

export function BookingForm({ service }: { service: Service }) {
  const router = useRouter();
  const fields = service.formFields ?? [];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState<{ title: string; message: string } | null>(null);

  const onSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Missing details", "Please fill in your name and contact number.");
      return;
    }
    if (fields.includes("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Missing details", "Please enter a valid email address.");
      return;
    }
    if (fields.includes("time") && !time.trim()) {
      Alert.alert("Missing details", "Please enter a preferred time.");
      return;
    }

    const formattedDate = date
      ? date.toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })
      : undefined;

    setSending(true);
    try {
      const bookingId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      await sendNotification({
        type: "booking",
        serviceId: service.id,
        serviceTitle: service.title,
        bookingId,
        name: name.trim(),
        phone: phone.trim(),
        email: fields.includes("email") ? email.trim() : undefined,
        date: fields.includes("date") ? formattedDate : undefined,
        time: fields.includes("time") ? time.trim() : undefined,
        message: fields.includes("message") ? message.trim() || undefined : undefined,
      });
      setConfirmation({
        title: "Request sent",
        message: fields.includes("email")
          ? "Your booking request has been emailed to the temple, and a confirmation is on its way to your inbox."
          : "Your booking request has been emailed to the temple. We'll be in touch soon.",
      });
    } catch {
      // Automatic send failed (backend not deployed yet, or no network) — fall
      // back to opening the device's own mail app with the details pre-filled.
      const lines = [`Service: ${service.title}`, `Name: ${name.trim()}`, `Contact number: ${phone.trim()}`];
      if (fields.includes("email") && email.trim()) lines.push(`Email: ${email.trim()}`);
      if (fields.includes("date") && formattedDate) lines.push(`Preferred date: ${formattedDate}`);
      if (fields.includes("time")) lines.push(`Preferred time: ${time.trim()}`);
      if (fields.includes("message") && message.trim()) lines.push("", "Notes:", message.trim());

      const subject = encodeURIComponent(`Booking request: ${service.title}`);
      const body = encodeURIComponent(lines.join("\n"));
      const url = `mailto:${TEMPLE.bookingEmail}?subject=${subject}&body=${body}`;

      Linking.openURL(url).catch(() => {
        Alert.alert(
          "Couldn't send automatically",
          "Please email your request manually to " + TEMPLE.bookingEmail
        );
      });

      setConfirmation({
        title: "Request on its way",
        message: "We've opened your mail app with these details filled in — just tap send there to finish.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.form}>
      {fields.includes("name") && (
        <TextField label="Name" placeholder="Your full name" value={name} onChangeText={setName} />
      )}
      {fields.includes("phone") && (
        <TextField
          label="Contact number"
          placeholder="e.g. 021 234 5678"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      )}
      {fields.includes("email") && (
        <TextField
          label="Email address"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      )}
      {fields.includes("date") && (
        <DateField label="Preferred date" value={date} onChange={setDate} minimumDate={new Date()} />
      )}
      {fields.includes("time") && (
        <TextField label="Preferred time" placeholder="e.g. 6:00 PM" value={time} onChangeText={setTime} />
      )}
      {fields.includes("message") && (
        <TextField
          label="Additional details"
          placeholder={service.messagePlaceholder}
          multiline
          numberOfLines={3}
          style={styles.message}
          value={message}
          onChangeText={setMessage}
        />
      )}

      <Pressable
        onPress={onSubmit}
        disabled={sending}
        style={({ pressed }) => [styles.submit, (pressed || sending) && styles.submitPressed]}
        accessibilityRole="button"
        accessibilityLabel="Send booking request"
      >
        {sending ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.submitText}>Send booking request</Text>
        )}
      </Pressable>

      <SuccessOverlay
        visible={confirmation !== null}
        title={confirmation?.title ?? ""}
        message={confirmation?.message ?? ""}
        onDismiss={() => {
          setConfirmation(null);
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md },
  message: { minHeight: 80, textAlignVertical: "top" },
  submit: {
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  submitPressed: { opacity: 0.9 },
  submitText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.white },
});
