const getParentCategoriesSchema = {
    description: 'Get categories by parent',
    tags: ['category'],
    summary: 'Get categories by parent',
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    category_name: { type: 'string' },
                    slug: { type: 'string' },
                    sort_order: { type: 'number' },
                    parent: { type: 'number' },
                    status: { type: 'number' },
                    created_at: { type: 'number' },
                }

            }
        },
        400: { // status 400 la bad request, vi du: bi loi parameter
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string'},
                message: { type: 'string'}
            },
            example:{
                statusCode: 400,
                error: 'Bad request',
                message: 'Invalid query parameters'
            }
        },
        403: { // status 403 la Forbidden, vi du: bi loi parameter
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string'},
                message: { type: 'string'}
            },
            example:{
                statusCode: 403,
                error: 'Forbidden',
                message: 'Bạn không có quyền truy cập vào tài nguyên này'
            }
        },
        404: { 
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string'},
                message: { type: 'string'}
            },
            example:{
                statusCode: 404,
                error: 'Not Found',
                message: 'Not Found'
            }
        },
        500: { 
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string'},
                message: { type: 'string'}
            },
            example:{
                statusCode: 400,
                error: 'Internal Server Error',
                message: 'Internal Server Error'
            }
        }



    }
};


module.exports = getParentCategoriesSchema;