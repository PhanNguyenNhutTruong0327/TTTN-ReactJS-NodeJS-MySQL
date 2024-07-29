const getConfigSchema = {
    description: 'Get config',
    tags: ['config'],
    summary: 'Get config',
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                author: { type: 'string' },
                email: { type: 'string' },
                logo: { type: 'string' },
                phone: { type: 'string' },
                zalo: { type: 'string' },
                youtobe: { type: 'string' },
                facebook: { type: 'string' },
                address: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
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


module.exports = getConfigSchema;