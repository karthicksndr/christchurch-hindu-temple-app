import { TEMPLE } from "./temple";

export type ServiceIcon = "flower" | "car" | "lamp" | "droplet" | "moon" | "sunset" | "home" | "heart";
export type FormField = "name" | "phone" | "email" | "date" | "time" | "message";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  // NZD, display-only — the actual Stripe charge amount is always looked up
  // server-side by service id, never trusted from the app.
  price?: number;
  externalUrl?: string;
  formFields?: FormField[];
  messagePlaceholder?: string;
};

const STANDARD_FIELDS: FormField[] = ["name", "phone", "email", "date", "message"];
const STANDARD_PLACEHOLDER = "Gothram, Rasi, names of family members";

export const SERVICES: Service[] = [
  {
    id: "astothara-archana",
    title: "Astothara Archana",
    description: "108 names of the Lord chanted by the priest on behalf of the devotee. Comes with prasatham",
    icon: "flower",
    price: 15,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "upayam",
    title: "Upayam",
    description: "Thanksgiving pooja for a birthday, wedding anniversary or new job. Comes with prasatham",
    icon: "heart",
    price: 25,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "moksha-archana",
    title: "Moksha Archana",
    description: "Pooja for the Atma Shanti of departed paternal and maternal near and dear ones",
    icon: "moon",
    price: 25,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "vehicle-blessings",
    title: "Vehicle Blessings",
    description: "Fresh lemons placed beneath the tyres while praying for safe travels",
    icon: "car",
    price: 31,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "anna-prasanam",
    title: "Anna Prasanam",
    description: "Ceremony for a child's first feeding of cooked rice",
    icon: "home",
    price: 31,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "sahasranama-archana",
    title: "Sahasranama Archana",
    description: "1008 mantras chanted for success in educational pursuits. Comes with prasaadam",
    icon: "flower",
    price: 101,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "draviya-abishekam",
    title: "Draviya Abishekam to Lord Ganesha",
    description: "11-item abishekam to remove obstacles and bring good health. Comes with prasatham",
    icon: "droplet",
    price: 101,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "rudra-abishekam",
    title: "Rudra Abishekam to Lord Ekambareswar",
    description: "Honey, curd, panchamirtha and milk offered with chants from the Sri Rudram",
    icon: "droplet",
    price: 125,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "eka-kumbabishekam",
    title: "Eka Kumbabishekam for Lord Ganesha",
    description: "Brings success, abundance and peace, and removes obstacles on the path to success",
    icon: "droplet",
    price: 151,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "ayusha-homam",
    title: "Ayusha Homam",
    description: "Usually performed on a child's first birthday for good health and a long, happy life",
    icon: "sunset",
    price: 151,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "sathya-narayana-pooja",
    title: "Sathya Narayana Pooja",
    description: "Seeks the blessings of Lord Narayan, one of the forms of Lord Vishnu",
    icon: "lamp",
    price: 175,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "ganapathy-homam",
    title: "Ganapathy Homam",
    description: "Brings victory, harmony and success by removing all obstacles",
    icon: "sunset",
    price: 201,
    formFields: STANDARD_FIELDS,
    messagePlaceholder: STANDARD_PLACEHOLDER,
  },
  {
    id: "donations",
    title: "Donations",
    description: "Support the temple project",
    icon: "heart",
    externalUrl: TEMPLE.donateUrl,
  },
];
