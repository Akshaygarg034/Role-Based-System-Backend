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
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Main Backend listening on port ${port}`)
})


// Auth tokens

          // Student 1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmFlN2ViNTI5ZjcwZWI5Mjg5MmI0IiwibmFtZSI6IkFrc2hheSIsInJvbGUiOiJzdHVkZW50In0sImlhdCI6MTY4ODY1Njc3NH0.H658eesKhzWzSettd_Sr0gxHBpdtsZyJ3pKQCt6HnoU

          // Student2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmFlMmUyZTIzYjBmNTg1NDIzNTliIiwibmFtZSI6IkFiaGF5Iiwicm9sZSI6InN0dWRlbnQifSwiaWF0IjoxNjg4NjU3NTQ2fQ.w78ZphNW8W9LnAidWBiSW7SRrRpp3YFnG8pvhtX-4hs

          // Admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmFmMWNiNTI5ZjcwZWI5Mjg5MmI3IiwibmFtZSI6ImFkbWluMSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2ODg2NTY3NTF9.Wd0cDpk5HORkz9xL5r_WNnUmpasOAxL5W1xad_0hptE

          // SuperAdmin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmMxYmEzYjliMmMxMTk4ODhiZDVhIiwibmFtZSI6IlN1cGVyX2FkbWluIiwicm9sZSI6InN1cGVyYWRtaW4ifSwiaWF0IjoxNjg4NjU2Nzk1fQ.pnvrzK_6vc1fpHr9jduGTK2enQBBQNQiL8xZgwHUf5w
