const getProductByCategorySchema = {
    description: 'Get product by category',
    tags: ['product'],
    summary: 'Get product by category',
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
                            nameCat: { type: 'string' },
                            nameBrand: { type: 'string' },
                            name: { type: 'string' },
                            image: { type: 'string' },
                            category_id: { type: 'number' },
                            brand_id: { type: 'number' },
                            slug: { type: 'string' },
                            price: { type: 'number' },
                            detail_1: { type: 'string' },
                            detail_2: { type: 'string' },
                        }

                    }

                },
                tag: { type: 'string' },
                short_description: { type: 'string' },
                nameCat: { type: 'string' },
                slugCat: { type: 'string' },
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


module.exports = getProductByCategorySchema;