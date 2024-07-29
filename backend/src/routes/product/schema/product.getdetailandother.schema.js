const getProductByCategoryAndOrtherSchema = {
    description: 'Get detail product with product other',
    tags: ['product'],
    summary: 'Get detail product with product other',
    // params: {
    //     type: 'object',
    //     required: ['id'],
    //     properties: {
    //         id: { type: 'string' }
    //     }
    // },

    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nameCat: { type: 'string' },
                        slugCat: { type: 'string' },
                        nameBrand: { type: 'string' },
                        name: { type: 'string' },
                        image: { type: 'string' },
                        image_detail: { type: 'string' },
                        category_id: { type: 'number' },
                        brand_id: { type: 'number' },
                        slug: { type: 'string' },
                        price_initial: { type: 'number' },
                        price: { type: 'number' }, // gia hien tai (gia sale hoac gia ban dau)
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
                },
                productOther: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            slug: { type: 'string' },
                            nameCat: { type: 'string' },
                            nameBrand: { type: 'string' },
                            image: { type: 'string' },
                            detail: { type: 'string' },
                            price: { type: 'number' },
                            price_sale: { type: 'number' },
                            status: { type: 'number' },
                            created_at: { type: 'string' },
                        }

                    }
                },
                related_accessories: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            slug: { type: 'string' },
                            image: { type: 'string' },
                            price: { type: 'number' },
                            price_sale: { type: 'number' },
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


module.exports = getProductByCategoryAndOrtherSchema;