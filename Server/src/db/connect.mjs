import mongoose from 'mongoose';

 const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/imdb';

 console.log("dbUrl", dbUrl)

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});



