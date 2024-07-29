const getDiscountedProWithLimitSchema = {
    description: 'Get discounted products with limit and on sale day ',
    tags: ['discounted_products'],
    summary: 'Get discounted products with limit and on sale day',

    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            product_id: { type: 'number' },
                            slug: { type: 'string' },
                            sale_id: { type: 'number' },
                            start_time: { type: 'string' },
                            end_time: { type: 'string' },
                            status: { type: 'number' },
                            title_sale: { type: 'string' },
                            name_pro: { type: 'string' },
                            image: { type: 'string' },
                            price:{'type': 'number'},
                            price_sale: { type: 'number'},
                            percent_sale:{ type: 'string'}
                        }

                    }

                },
                
                meta: {
                    type: 'object',
                    properties: {
                        pagination: {
                            type: 'object',
                            properties: {
                                page: { type: 'number' },
                                pageSize: { type: 'number' },
                                pageCount: { type: 'number' },
                                total: { type: 'number' },
                                qty_trash: { type: 'number' }
                            }
                        }
                    }
                },

                qty_trash: { type: 'number' },
                qty_pro: { type: 'number' }

            }

        },
        400: { // status 400 la bad request, vi du: bi loi parameter
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 400,
                error: 'Bad request',
                message: 'Invalid query parameters'
            }
        },
        403: { // status 403 la Forbidden, vi du: bi loi parameter
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 403,
                error: 'Forbidden',
                message: 'Bạn không có quyền truy cập vào tài nguyên này'
            }
        },
        404: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found'
            }
        },
        500: {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            },
            example: {
                statusCode: 400,
                error: 'Internal Server Error',
                message: 'Internal Server Error'
            }
        }



    }
};


module.exports = getDiscountedProWithLimitSchema;