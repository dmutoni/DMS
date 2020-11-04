const express = require('express');
const locationsRoute = require('./controllers/locations.controller');
const victimRoute = require('./routes/victims')
const usersRoute = require('./routes/users');
const levelsRoute = require('./routes/levels');
const highRiskZonesRoute = require('./routes/high-risk-zone');
const donationsRoute = require('./routes/donations');
const reportsRoute = require('./routes/reports');
const dbConnection = require('./config/db.config');
// const cors = require("cors");
// const { Validator } = require('node-input-validator');

let app = express();

// app.use(cors(corsOptions));
// app.use(Validator);
const bodyparser = require('body-parser');
// const { validator } = require('payload-validator');
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));


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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT} .`));