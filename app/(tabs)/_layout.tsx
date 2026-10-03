import { Tabs } from "expo-router";
import { Home, CalendarCheck, CalendarDays, Phone } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/theme";
import { fonts } from "../../src/theme/typography";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  // Fixed height/padding here would ignore the home-indicator inset on
  // notched iPhones, leaving the tab bar flush against the very bottom edge.
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.maroon,
        tabBarInactiveTintColor: colors.brownSecondary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 54 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontFamily: fonts.bodyMedium, fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => <CalendarCheck color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => <CalendarDays color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => <Phone color={color} size={26} />,
        }}
      />
    </Tabs>
  );
}
