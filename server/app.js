const { sequelize } = require('./config/db');
const apiRoutes = require('./routes/api');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRoutes);

sequelize.sync({ force: false })
    .then(() => {
        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));
