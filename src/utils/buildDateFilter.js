function buildDateFilter(query, dateField = 'date') {
    const { fromDate, toDate } = query;
    if (!fromDate && !toDate) return {};

    const filter = {};
    if (fromDate && toDate) {
        filter[dateField] = { $gte: fromDate, $lte: toDate };
    } else if (fromDate) {
        filter[dateField] = { $gte: fromDate };
    } else if (toDate) {
        filter[dateField] = { $lte: toDate };
    }

    return filter;
}

module.exports = { buildDateFilter };