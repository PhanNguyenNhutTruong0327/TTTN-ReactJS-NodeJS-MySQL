const getOneProductSchema = {
    description: 'Get one product',
    tags: ['product'],
    summary: 'Get one product',
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        product_id: { type: 'number' },
                        nameCat: { type: 'string' },
                        nameBrand: { type: 'string' },
                        name: { type: 'string' },
                        category_id: { type: 'number' },
                        brand_id: { type: 'number' },
                        slug: { type: 'string' },
                        image: { type: 'string' },
                        image_detail: { type: 'string' },
                        price: { type: 'number' },
                        detail_1: { type: 'string' },
                        detail_2: { type: 'string' },
                        createPro: { type: 'string' },
                        updatePro: { type: 'string' },
                        status: { type: 'number' },
                        qty: { type: 'number' },
                        qty_sold: { type: 'number' },

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
                        created_at: { type: 'string' },
                        updated_at: { type: 'string' },
                    }
                }
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


module.exports = getOneProductSchema;