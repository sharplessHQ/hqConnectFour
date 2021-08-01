const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

const compression = require('compression');
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./client/dist'))

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})
