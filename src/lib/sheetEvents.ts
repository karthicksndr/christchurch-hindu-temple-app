import { EventItem } from "../data/events";

// Converts a normal Google Sheets share URL into the sheet's CSV export URL,
// using the "gviz" endpoint so no publish-to-web step or API key is needed —
// the sheet just needs to be shared as "anyone with the link can view".
function toCsvUrl(shareUrl: string): string | null {
  const idMatch = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!idMatch) return null;
  const gidMatch = shareUrl.match(/[?#&]gid=(\d+)/);
  const gid = gidMatch ? gidMatch[1] : "0";
  return `https://docs.google.com/spreadsheets/d/${idMatch[1]}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  }
  return rows;
}

// Accepts "YYYY-MM-DD" as-is, converts "DD/MM/YYYY" to ISO, otherwise
// returns the original string so a visibly wrong date fails loudly later
// rather than being silently misinterpreted.
function normalizeDate(raw: string): string {
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return raw;
  const dmy = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return raw;
}

export async function fetchEventsFromSheet(shareUrl: string): Promise<EventItem[]> {
  const csvUrl = toCsvUrl(shareUrl);
  if (!csvUrl) throw new Error("Invalid Google Sheet URL");

  const response = await fetch(csvUrl);
  if (!response.ok) throw new Error("Failed to fetch events sheet");

  const text = await response.text();
  const [, ...dataRows] = parseCsv(text);

  const events = dataRows
    .map((cells, i) => ({
      id: `sheet-${i}`,
      title: (cells[0] ?? "").trim(),
      date: normalizeDate((cells[1] ?? "").trim()),
      time: (cells[2] ?? "").trim(),
      location: (cells[3] ?? "").trim(),
      description: (cells[4] ?? "").trim(),
    }))
    .filter((event) => event.title && /^\d{4}-\d{2}-\d{2}$/.test(event.date));

  events.sort((a, b) => a.date.localeCompare(b.date));
  return events;
}
