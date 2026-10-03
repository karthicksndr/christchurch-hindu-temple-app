import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet, useWindowDimensions } from "react-native";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { RefreshCw } from "lucide-react-native";
import { colors, spacing, radius } from "../../theme";
import { fonts } from "../../theme/typography";
import { TEMPLE } from "../../data/temple";

// Simulators in particular can take a long time to load a WebView with no
// cache yet — keep this generous so a merely-slow load isn't mistaken for a
// stuck one.
const LOAD_TIMEOUT_MS = 30000;

type Status = "loading" | "ready" | "error";

export function VideoFooter() {
  const { width } = useWindowDimensions();
  const playerWidth = width - spacing.lg * 2;
  const playerHeight = (playerWidth * 9) / 16;
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Some failures (no network, WebView never finishes loading) never fire
    // onReady or onError at all — this timeout catches that silently-stuck case.
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => {
        if (current !== "loading") return current;
        console.warn(`[VideoFooter] No ready/error signal within ${LOAD_TIMEOUT_MS}ms — showing retry.`);
        return "error";
      });
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [attempt]);

  const onReady = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus("ready");
  };

  const onError = (error: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    console.warn("[VideoFooter] YouTube player error:", error);
    setStatus("error");
  };

  const retry = () => {
    setPlaying(false);
    setStatus("loading");
    setAttempt((n) => n + 1); // changes the player's key, forcing a fresh WebView
  };

  return (
    <View>
      <Text style={styles.label}>Watch the 3D Artistic Impression of the Temple Project</Text>
      <View style={[styles.playerWrap, { height: playerHeight }]}>
        {/* Kept mounted even in the "error" state — if it was just slow rather
            than truly stuck, onReady can still fire late and self-heal without
            the user needing to tap retry at all. */}
        <YoutubePlayer
          key={attempt}
          height={playerHeight}
          width={playerWidth}
          videoId={TEMPLE.videoYoutubeId}
          play={playing}
          onReady={onReady}
          onError={onError}
          onChangeState={(state: PLAYER_STATES) => {
            if (state === PLAYER_STATES.ENDED) setPlaying(false);
            if (state === PLAYER_STATES.PLAYING) setPlaying(true);
          }}
        />
        {status === "loading" && (
          <View style={styles.overlay} pointerEvents="none">
            <ActivityIndicator color={colors.gold} />
          </View>
        )}
        {status === "error" && (
          <Pressable
            onPress={retry}
            style={styles.retryOverlay}
            accessibilityRole="button"
            accessibilityLabel="Retry loading video"
          >
            <RefreshCw color={colors.white} size={22} />
            <Text style={styles.retryText}>Couldn't load the video — tap to retry</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.brown, marginBottom: spacing.sm },
  playerWrap: { borderRadius: radius.md, overflow: "hidden", backgroundColor: colors.brown },
  overlay: { ...StyleSheet.absoluteFill, alignItems: "center", justifyContent: "center" },
  retryOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.brown,
  },
  retryText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.white,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
});
