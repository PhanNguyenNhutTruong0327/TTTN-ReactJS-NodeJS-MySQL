const getOneOrderSchema = {
    description: 'Get detail order',
    tags: ['order'],
    summary: 'Get detail order',
    response: {
        200: {
            type: 'object',
            properties: {
                order: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        status: { type: 'number' },
                        name: { type: 'string' },
                        created_at: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string' },
                        address: { type: 'string' },
                        note: { type: 'string' },
                        shipping_methods: { type: 'string' },
                    },
                },
                order_detail: {
                    type: 'array',
                    properties: {
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                name: { type: 'string' },
                                image: { type: 'string' },
                                qty: { type: 'number' },
                                price: { type: 'number' },

                            }
                        }
                    }

                }
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


module.exports = getOneOrderSchema;