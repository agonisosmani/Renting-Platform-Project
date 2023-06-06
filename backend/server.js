const express = require('express');
const config = require('./config');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const contactRoute = require('./routes/contactRoutes');
const shpalljaRoute = require('./routes/shpalljaRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const komunaRoute = require('./routes/komunaRoutes');
const shpalljaNotFoundRoutes = require('./routes/shpalljaNotFoundRoutes');
const memerRoutes = require('./routes/memberRoutes');
dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}).catch(err => console.log(err.reason));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use("/api/users", userRoute);
app.use('/api/contacts', contactRoute);
app.use('/api/regjistroShpalljen', shpalljaRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/komunat', komunaRoute);
app.use('/api/shpalljaNotFound', shpalljaNotFoundRoutes);
app.use('/api/members', memerRoutes);

const PORT = process.env.PORT || 8080;

app.use("/images", express.static("images")); //per me mujt images me i shfaq ne home page

app.listen(PORT, () => {
    console.log('Server is running on port 8080')
})