const express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');
const dotenv = require('dotenv');
dotenv.config();
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
  res.status(300).send("Akshay's Main Backend is running properly");
});

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Main Backend listening on port ${port}`)
})


// Auth tokens

          // Student
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmFlN2ViNTI5ZjcwZWI5Mjg5MmI0In0sImlhdCI6MTY4ODY0NjI1NX0._pcvdld0AerVFKbGgTsRl1JKLn1kHiKrtvPx7_hC2Q0

          // Admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmFmMWNiNTI5ZjcwZWI5Mjg5MmI3In0sImlhdCI6MTY4ODY0NjM4NX0.-uHuvAHAKmqdz6ZqFuqE6OI9jsCbpf_iQRSyl4gNlc8

          // SuperAdmin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmFmNDliNTI5ZjcwZWI5Mjg5MmJkIn0sImlhdCI6MTY4ODY0NjQxM30.NWPy_MZSTIEHI1k0Ee2C4i0F7pX1mMlwCSMAU2m1YqU
