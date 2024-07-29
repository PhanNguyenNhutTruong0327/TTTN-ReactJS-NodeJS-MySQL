const updateProductSchema = {
    description: 'Update new product',
    tags: ['product'],
    summary: 'Update new product',
    headers: {
        type: 'object',
        properties: {
            Authorization: {type: 'string'}
        },
        required: ['Authorization']
    },

    body: {
        type: 'object',
        // required: ['name', 'chip' ,'image', 'detail_1', 'status'],
        properties: {
            product: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    category_id: { type: 'number' },
                    brand_id: { type: 'number' },
                    price: { type: 'number' },
                    image: { type: 'string' },
                    image_detail: { type: 'string' },
                    detail_1: { type: 'string' },
                    detail_2: { type: 'string' },
                    status: { type: 'number' },
                    updated_by: { type: 'number' },

                }
            },
            description: {
                type: 'object',
                properties: {
                    chip: { type: 'string' },
                    screen: { type: 'string' },
                    rear_camera: { type: 'string' },
                    front_camera: { type: 'string' },
                    operating_system: { type: 'string' },
                    ram: { type: 'string' },
                    rom: { type: 'string' },
                    pin: { type: 'string' },
                    size: { type: 'string' },
                    connect: { type: 'string' },

                }
            },
            qty: {type: 'number'}
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                image: { type: 'string' },
                status: { type: 'number' },
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


module.exports = updateProductSchema;