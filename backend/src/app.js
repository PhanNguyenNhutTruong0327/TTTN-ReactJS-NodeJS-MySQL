// Require the framework and instantiate it

// ESM
// import Fastify from 'fastify'
// const fastify = Fastify({
//   logger: true
// })

// CommonJs
const fastify = require('fastify')({
    logger: true
})

const cors = require('@fastify/cors');



/************* connection sql *******************/
const mysqlConnection = require('./configs/connection');
mysqlConnection(fastify);


require('dotenv').config();
/****************************************/
var path = require('path');
global.appRoot = path.resolve(__dirname);


///////// Đăng kí swagger ////////////
fastify.register(require('@fastify/swagger'), {
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        hosts: ['localhost:3000'],
        basePath: '/',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [],
        definitions: {},
        securityDefinitions: {}
    }
})

/*********************upload file****************************/
fastify.register(require('@fastify/multipart'));


/**********************authentication**************************************/
const jwt = require('jsonwebtoken');

fastify.decorate("authenticate", async function (request, reply) {
    const authorization = request.headers.authorization;
    if (!authorization) {
        reply.code(401).send("Unauthorized");
        return;
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        reply.code(401).send("Unauthorized");
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        request.user = jwt.verify(token, secretKey);
    } catch (e) {
        reply.code(401).send("Unauthorized");
        return;
    }
});

/************************************************************/
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'uploads'),
    prefix: '/public/'
})

///////// Đăng kí swagger-ui ////////////
fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
})


/*************** cors (cho phep ung dung react lay dl) ***************************/
fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
})

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'worldddd' })
})




/************** import categories router ********************/
fastify.register(require('./routes/categories/categories'));

fastify.register(require('./routes/brand/brand'));

fastify.register(require('./routes/topic/topic'));

fastify.register(require('./routes/sale/sale'));

fastify.register(require('./routes/user/user'));

fastify.register(require('./routes/product/product'));

fastify.register(require('./routes/tag/tag'));

fastify.register(require('./routes/upload/upload'));

fastify.register(require('./routes/banner/banner'));

fastify.register(require('./routes/discounted_products/discounted_products'));

fastify.register(require('./routes/order/order'));

fastify.register(require('./routes/post/post'));

fastify.register(require('./routes/config/config'));

fastify.register(require('./routes/store/store'));

fastify.register(require('./routes/customer/customer'));

fastify.register(require('./routes/role/role'));

fastify.register(require('./routes/page/page'));








// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})