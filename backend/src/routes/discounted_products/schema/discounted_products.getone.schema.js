const getOneDiscountedProductSchema = {
    description: 'Get one discounted product schema',
    tags: ['discounted_products'],
    summary: 'Get one discounted product',
    response: {
        200: {
            type: 'object',
            properties: {
                product_id: { type: 'number' },
                name: { type: 'string' },
                title_sale: { type: 'string' },
                image: { type: 'string' },
                nameCat: { type: 'string' },
                nameBrand: { type: 'string' },
                start_time: { type: 'string' },
                end_time: { type: 'string' },
                price: { type: 'number' },
                price_sale: { type: 'number' },
                percent_sale: { type: 'number' },
                status: { type: 'number' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                created_by: { type: 'string' },
                updated_by: { type: 'string' },
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


module.exports = getOneDiscountedProductSchema;