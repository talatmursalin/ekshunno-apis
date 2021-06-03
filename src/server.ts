import app from './index';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION!, {
     useNewUrlParser: true,
     useUnifiedTopology: true
    },
    ()=>{
        console.log('connected to database');
    }
);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT);

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('Listening on ' + PORT);
});
