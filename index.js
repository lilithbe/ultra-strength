import express from 'express'
import route from './route'
import cors from 'cors'
import env from 'dotenv'
import http from 'http'
import { connectDB } from './db'
import path from 'path'
import { AuthCheck } from './lib/auth'

env.config()

connectDB()



const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://ultra-strength-test.herokuapp.com',
    'http://ultra.lilith.co.kr'
  ],
  credentials: true,   
  methods:["GET","POST"], 
};



const port = process.env.PORT || 5000;


app.use(AuthCheck)
app.use(cors(corsOptions));

app.use(express.json({limit: '500mb'})); 
app.use(express.urlencoded({limit: '500mb', extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api',route)

app.get('/rotate/:filename', (req, res) => {
  console.log(__dirname+`/client/build/rotate/${req.params.filename}/index.html`)
  res.sendFile(path.join(__dirname+`/client/build/rotate/${req.params.filename}/index.html`));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

server.listen(port, () => {
  console.log(`url : ${process.env.DEV_PROTOCOL}://${process.env.DEV_DOMEIN}:${port}`
  );
  console.log(corsOptions.origin)
})


