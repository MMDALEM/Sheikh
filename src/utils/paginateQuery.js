async function paginateQuery(Model, filter = {}, req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const options = {
        page,
        limit,
        sort: { createdAt: -1 },
    };

    const result = await Model.paginate(filter, options);

    return {
        data: result.docs,
        total: result.totalDocs,
        page: result.page,
        totalPages: result.totalPages,
        hasNext: result.hasNextPage,
    };
}

module.exports = { paginateQuery };