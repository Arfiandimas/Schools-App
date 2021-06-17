const express = require('express')
const cors = require('cors')
const Router = require('./../router/router.js')

const app = express();

app.use(express.json());
app.use(cors());
app.use(Router);

app.listen(8282, () => console.log(`Server running in port http://localhost:8282`))