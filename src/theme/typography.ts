export const fonts = {
  displaySemiBold: "CormorantGaramond_600SemiBold",
  displayBold: "CormorantGaramond_700Bold",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
} as const;

export const type = {
  display: { fontFamily: fonts.displayBold, fontSize: 28 },
  title: { fontFamily: fonts.displaySemiBold, fontSize: 20 },
  body: { fontFamily: fonts.bodyRegular, fontSize: 15 },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 12 },
  overline: { fontFamily: fonts.bodySemiBold, fontSize: 11, letterSpacing: 1.5 },
} as const;
