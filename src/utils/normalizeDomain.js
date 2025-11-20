export default function normalizeDomain(input) {
  if (typeof input !== "string" || input.trim().length === 0) return "";
  let d = input.trim().toLowerCase();
  if (d.startsWith("http://") || d.startsWith("https://")) {
    try {
      d = new URL(d).hostname;
    } catch (_) {
      // ignore
    }
  }
  if (d.startsWith("www.")) d = d.slice(4);
  // remove port if any
  d = d.split(":")[0];
  // remove path if mistakenly included
  d = d.split("/")[0];
  // take only first label (remove TLDs)
  if (d.includes(".")) d = d.split(".")[0];
  return d;
}


