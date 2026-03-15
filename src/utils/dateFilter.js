/**
 * Build a date filter for the Customer `date` field.
 * Expects query params `fromDate` and `toDate` as strings (e.g. "1403/01/01").
 * Returns a MongoDB filter object.
 */
function normalizePersianDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${y}/${m.padStart(2, "0")}/${d.padStart(2, "0")}`;
}

function buildDateFilter(query, dateField = "date") {
  const filter = {};
  if (query.fromDate || query.toDate) {
    filter[dateField] = {};
    if (query.fromDate) filter[dateField].$gte = normalizePersianDate(query.fromDate);
    if (query.toDate) filter[dateField].$lte = normalizePersianDate(query.toDate);
  }
  return filter;
}

module.exports = { buildDateFilter };
