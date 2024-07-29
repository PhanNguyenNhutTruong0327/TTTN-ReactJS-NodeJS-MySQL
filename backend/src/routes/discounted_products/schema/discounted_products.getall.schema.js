const getAllDiscountedProductsSchema = {
    description: 'Get all discounted_products',
    tags: ['discounted_products'],
    summary: 'Get all discounted_products',
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'string', default: '1', description: 'Page number of the pagination' },
            limit: { type: 'string', default: '10', description: 'Number of items per page' }
        }
    },

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
                            sale_id: { type: 'number' },
                            start_time: { type: 'string' },
                            end_time: { type: 'string' },
                            status: { type: 'number' },
                            price: { type: 'number' },
                            price_sale: { type: 'number' },
                            title_sale: { type: 'string' },
                            name_pro: { type: 'string' },
                            image: { type: 'string' },
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


module.exports = getAllDiscountedProductsSchema;