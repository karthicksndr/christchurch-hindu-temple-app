import { useState } from "react";
import { View, Text, Pressable, Alert, Linking, ActivityIndicator, StyleSheet } from "react-native";
import { TextField } from "../ui/TextField";
import { SuccessOverlay } from "../ui/SuccessOverlay";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";
import { sendNotification } from "../../lib/notify";

export function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState<{ title: string; message: string } | null>(null);

  const onSubmit = async () => {
    if (!name.trim() || !phone.trim() || !message.trim()) {
      Alert.alert("Missing details", "Please fill in your name, contact number and message.");
      return;
    }

    setSending(true);
    try {
      await sendNotification({
        type: "enquiry",
        name: name.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      setConfirmation({
        title: "Enquiry sent",
        message: "Your message has been emailed to the temple. We'll be in touch soon.",
      });
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      // Automatic send failed (backend not deployed yet, or no network) — fall
      // back to opening the device's own mail app with the details pre-filled.
      const subject = encodeURIComponent("New enquiry from the temple app");
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nContact number: ${phone.trim()}\n\nMessage:\n${message.trim()}`
      );
      const url = `mailto:${TEMPLE.bookingEmail}?subject=${subject}&body=${body}`;

      Linking.openURL(url).catch(() => {
        Alert.alert(
          "Couldn't send automatically",
          "Please email your enquiry manually to " + TEMPLE.bookingEmail
        );
      });

      setConfirmation({
        title: "Enquiry on its way",
        message: "We've opened your mail app with this enquiry filled in — just tap send there to finish.",
      });
      setName("");
      setPhone("");
      setMessage("");
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.form}>
      <TextField label="Name" placeholder="Your full name" value={name} onChangeText={setName} />
      <TextField
        label="Contact number"
        placeholder="e.g. 021 234 5678"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextField
        label="Message"
        placeholder="How can we help?"
        multiline
        numberOfLines={4}
        style={styles.message}
        value={message}
        onChangeText={setMessage}
      />
      <Pressable
        onPress={onSubmit}
        disabled={sending}
        style={({ pressed }) => [styles.submit, (pressed || sending) && styles.submitPressed]}
        accessibilityRole="button"
        accessibilityLabel="Send enquiry"
      >
        {sending ? <ActivityIndicator color={colors.white} /> : <Text style={styles.submitText}>Send enquiry</Text>}
      </Pressable>

      <SuccessOverlay
        visible={confirmation !== null}
        title={confirmation?.title ?? ""}
        message={confirmation?.message ?? ""}
        onDismiss={() => setConfirmation(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.md },
  message: { minHeight: 100, textAlignVertical: "top" },
  submit: {
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitPressed: { opacity: 0.9 },
  submitText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.white },
});
