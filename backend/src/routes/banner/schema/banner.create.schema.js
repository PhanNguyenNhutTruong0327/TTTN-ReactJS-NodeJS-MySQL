const createBannerSchema = {
    description: 'Create new banner',
    tags: ['banner'],
    summary: 'Create new banner',
    headers: {
        type: 'object',
        properties: {
            Authorization: {type: 'string'}
        },
        required: ['Authorization']
    },
    body: {
        type: 'object',
        required: ['name', 'image','description', 'status'],
        properties: {
            name: { type: 'string' },
            image: { type: 'string' },
            description: { type: 'string' },
            link: { type: 'string' },
            position: { type: 'string' },
            status: { type: 'number' },
            created_by: { type: 'number' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                image: { type: 'string' },
                position: { type: 'string' },
                link: { type: 'string' },
                status: { type: 'number' },
                created_at: { type: 'string' },
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
                message: 'Something went wrong'
            }
        }



    }
};


module.exports = createBannerSchema;