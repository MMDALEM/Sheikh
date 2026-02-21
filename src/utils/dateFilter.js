/**
 * Build a date filter for the Customer `date` field.
 * Expects query params `fromDate` and `toDate` as strings (e.g. "1403/01/01").
 * Returns a MongoDB filter object.
 */
function buildDateFilter(query, dateField = "date") {
  const filter = {};
  if (query.fromDate || query.toDate) {
    filter[dateField] = {};
    if (query.fromDate) filter[dateField].$gte = query.fromDate;
    if (query.toDate) filter[dateField].$lte = query.toDate;
  }
  return filter;
}

module.exports = { buildDateFilter };
