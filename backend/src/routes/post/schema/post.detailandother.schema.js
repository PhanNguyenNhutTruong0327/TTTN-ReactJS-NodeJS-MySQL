const getDetailPostAndOrtherSchema = {
    description: 'Get detail post by slug and post other',
    tags: ['post'],
    summary: 'Get detail post by slug and post other',

    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name_topic: { type: 'string' },
                        title: { type: 'string' },
                        image_1: { type: 'string' },
                        image_2: { type: 'string' },
                        image_3: { type: 'string' },
                        topic_id: { type: 'number' },
                        slug: { type: 'string' },
                        description_1: { type: 'string' },
                        description_2: { type: 'string' },
                        description_3: { type: 'string' },
                        status: { type: 'number' },

                    }
                },
                postOther: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            title: { type: 'string' },
                            image_1: { type: 'string' },
                            slug: { type: 'string' },
                        }

                    }
                },

            },

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


module.exports = getDetailPostAndOrtherSchema;