export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO date
  time: string;
  location: string;
  description: string;
};

export const EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "Varalakshmi Vratham",
    date: "2026-08-08",
    time: "9:00 AM",
    location: "Main hall",
    description: "A special pooja seeking the blessings of Goddess Lakshmi for prosperity.",
  },
  {
    id: "e2",
    title: "Sri Krishna Janmashtami",
    date: "2026-08-26",
    time: "7:00 PM",
    location: "Temple hall",
    description: "Celebrating the birth of Lord Krishna with bhajans and a midnight aarti.",
  },
  {
    id: "e3",
    title: "Navaratri Golu",
    date: "2026-10-12",
    time: "6:00 PM",
    location: "Main hall",
    description: "Nine nights of doll displays, music and cultural performances.",
  },
  {
    id: "e4",
    title: "Diwali Celebration",
    date: "2026-11-08",
    time: "5:30 PM",
    location: "Temple grounds",
    description: "Festival of lights with lamp lighting, food stalls and community gathering.",
  },
];
