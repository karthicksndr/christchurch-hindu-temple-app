import { TEMPLE } from "./temple";

export type MenuIcon = "calendar-days" | "hand" | "sun" | "image";

export type MenuItem = {
  id: string;
  title: string;
  description: string;
  icon: MenuIcon;
  route?: string;
  externalUrl?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "temple-calendar",
    title: "Temple Calendar",
    description: "Upcoming events and dates",
    icon: "calendar-days",
    route: "/calendar",
  },
  {
    id: "book",
    title: "Book a service",
    description: "Reserve a pooja",
    icon: "hand",
    route: "/book",
  },
  {
    id: "panchang",
    title: "Drik Panchang",
    description: "Daily panchang",
    icon: "sun",
    externalUrl: TEMPLE.drikPanchangUrl,
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Photos and moments",
    icon: "image",
    route: "/gallery",
  },
];
