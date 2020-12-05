const express = require('express');
const locationsRoute = require('./routes/locations');
const victimRoute = require('./routes/victims')
const usersRoute = require('./routes/users');
const levelsRoute = require('./routes/levels');
const highRiskZonesRoute = require('./routes/high-risk-zone');
const donationsRoute = require('./routes/donations');
const reportsRoute = require('./routes/reports');
const dbConnection = require('./config/db.config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;


let app = express();
// configure cors

// app.use(cors());
const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

const swaggerOptions = {
    swaggerDefinition : {
        info: {
            title: "DMS API",
            description:  "https://disaster-management-squadrons.herokuapp.com",
            version: '1.0.0',
            contact: {
                email: "mdenyse15@gmail.com" ,
                name : "e-squadrons"
            },
            servers: ["https://disaster-management-squadrons.herokuapp.com"],
        }
    },
    apis: ["routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/victims", victimRoute);
app.use("/api/v1/levels", levelsRoute);
app.use("/api/v1/locations", locationsRoute);
app.use('/api/v1/h_zones', highRiskZonesRoute);
app.use('/api/v1/donations', donationsRoute);
app.use('/api/v1/reports', reportsRoute);

// app.get("/",(req,res) => {
//     res.json({message: "Welcome to dms application. "});
// })
app.listen(PORT, () => console.log(`Express server running on port ${PORT} .`));