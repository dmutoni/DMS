const express = require('express');
const locationsRoute = require('./routes/locations');
const victimRoute = require('./routes/victims')
const usersRoute = require('./routes/users');
const levelsRoute = require('./routes/levels');
const highRiskZonesRoute = require('./routes/high-risk-zone');
const donationsRoute = require('./routes/donations');
const reportsRoute = require('./routes/reports');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const path = require('path')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 4008;

const { protect, authorize } = require('./middleware/auth')

let app = express();
// configure cors

app.use(morgan('dev'));
// app.use(cors());-
const bodyparser = require('body-parser');
dotenv.config({ path: './config/config.env' });

app.use(bodyparser.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads/levelSignatures')))
app.use('/uploads', express.static(path.join(__dirname, '/uploads/userSignatures')))

app.use(bodyparser.urlencoded({ extended: true }));


const swaggerOptions = {
  swaggerDefinition: {
    // openapi: '3.0.1',
    info: {
      title: "DMS API",
      description: "Disaster management system to help Rwanda manage its disasters",
      version: '1.0.0',
      contact: {
        email: "mdenyse15@gmail.com",
        name: "e-squadrons"
      },
    },
    servers: [
      {
        url: "https://disaster-management-squadrons.herokuapp.com",
        description: "Production server"
      },
      {
        url: "http://localhost:4008/api-docs",
        description: "Development server"
      }
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'bearerFormat',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
  },
  apis: ["routes/*.js"]
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));


// app.get("/customers",(req,res) => {
//     console.log("request");
//     res.status(200).send("Customer results")
// })
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS')
    return res.sendStatus(200)
  next();
});

// app.get("/api-docs",swaggerUi.setup(specs,{explorer: true}))
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/victims", victimRoute);
app.use("/api/v1/levels", levelsRoute);
app.use("/api/v1/locations", locationsRoute);
app.use('/api/v1/h_zones', highRiskZonesRoute);
app.use('/api/v1/donations', donationsRoute);
app.use('/api/v1/reports', reportsRoute);

// let storage  = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null, 'images')
//     },
//     filename: (req,file,cb) => {
//         console.log(file);
//         cb(null,file.originalname )
//     }
// })
// let upload = multer({ storage: storage })

// app.post('/api/v1/uploadHigh',upload.array('files',5),(req,res,next) => {
//     try {
//         console.log(req.files);
//         console.log(req.body.name);
//         return res.status(200).send({message: "successfully done"})
//     } catch (e) {
//         console.log(e);
// fs.unlink('images'+req.file.filename, () => {
//     return res.status(404).send({message: "error occurred"})
// })
// return res.status(500).send({message: "error occurred"});
//     }      
// })
app.get("/", (req, res) => {
  res.json({ message: "Welcome to dms application. " });
})
app.listen(PORT, () => console.log(`Express server running on port ${PORT} .`));
