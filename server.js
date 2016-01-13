import express from 'express';
import {MongoClient} from 'mongodb';

let app = express();
let db;
MongoClient.connect(process.env.MONGO_URL, (err, database) => {
  if (err)
    throw err;

  db = database;

  console.log('db OK');
});

app.use(express.static('public'));
app.get('/data/links', (req, res)=>{
  db.collection('links').find({}).toArray((err, links) => {
    if (err)
      throw err;

    res.json(links);
  });
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port' + port));
