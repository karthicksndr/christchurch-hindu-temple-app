export const TEMPLE = {
  name: "Christchurch Hindu Temple",
  fullName: "Christchurch Hindu Temple & Culture Centre",
  slogan: "Om Gam Ganapataye Namah",
  address: {
    line1: "14 Hasketts Road",
    line2: "Templeton",
    line3: "Christchurch 7678",
  },
  hours: {
    weekday: {
      label: "Monday – Friday",
      morning: "10:00 AM – 12:00 PM",
      evening: "6:00 PM – 8:00 PM",
    },
    weekend: {
      label: "Saturday – Sunday",
      morning: "10:00 AM – 1:00 PM",
      evening: "6:00 PM – 9:00 PM",
    },
  },
  contactHours: {
    label: "Monday – Saturday",
    value: "9:00 AM – 9:00 PM",
  },
  contacts: [
    { name: "Sandheep Kumar", phone: "+64 21 085 44270", initials: "SK" },
    { name: "Meenu Solai", phone: "+64 21 111 6507", initials: "MS" },
  ],
  email: "info@hindutemple.org.nz",
  bookingEmail: "karthicksndr@gmail.com",
  websiteUrl: "https://www.hindutemple.org.nz/",
  whatsappGroupUrl: "https://chat.whatsapp.com/IRhQfiLtTGzJ0XicJGKSIo?mode=gi_t",
  facebookGroupUrl: "https://www.facebook.com/ChristchurchHinduTemple",
  donateUrl: "https://www.hindutemple.org.nz/donate-now/",
  drikPanchangUrl:
    "https://www.drikpanchang.com/panchang/month-panchang.html?geoname-id=2193733",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=14+Hasketts+Road+Templeton+Christchurch+7678",
  videoYoutubeId: "K6ox-WdAQfk",
} as const;
