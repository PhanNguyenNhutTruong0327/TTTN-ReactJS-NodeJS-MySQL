const getOnePostSchema = {
    description: 'Get one post',
    tags: ['post'],
    summary: 'Get one post',
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                topic_id: { type: 'number' },
                title: { type: 'string' },
                slug: { type: 'string' },
                image_1: { type: 'string' },
                image_2: { type: 'string' },
                image_3: { type: 'string' },
                description_1: { type: 'string' },
                description_2: { type: 'string' },
                description_3: { type: 'string' },
                name_topic: { type: 'string' },
                type: { type: 'string' },
                status: { type: 'number' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                created_name: { type: 'string' },
                updated_name: { type: 'string' },
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


module.exports = getOnePostSchema;