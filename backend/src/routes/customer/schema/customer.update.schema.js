const updateCustomerSchema = {
    description: 'Update customer',
    tags: ['customer'],
    summary: 'Update customer',
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {type: 'string'}
        }
    },
    body: {
        type: 'object',
        required: ['name', 'phone','email', 'status'],
        properties: {
            name: { type: 'string' },
            user_name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            password: { type: 'string' },
            address: { type: 'string' },
            status: { type: 'number' },
            
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                status: { type: 'number' },
                updated_at: { type: 'number' },
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


module.exports = updateCustomerSchema;