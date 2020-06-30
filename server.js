const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const ServerOverview = 'http://localhost:3001';
const ServerReview = 'http://localhost:3000';


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));





app.all('/biz/:business_id/reviews', (req, res) => {
  console.log('redirecting to ServerReview - review');
  apiProxy.web(req, res, {target: ServerReview});
});

app.get('/biz/:business_id/reviews/:review_id/photos', (req, res) => {
  console.log('redirecting to ServerReview - review photos');
  apiProxy.web(req, res, {target: ServerReview});
});

app.put('/biz/:business_id/reviews/:review_id/:count/:action/:type/:active', (req, res) => {
  console.log('redirecting to ServerReview - update reviews');
  apiProxy.web(req, res, {target: ServerReview});
});


app.get('/search/:biz_id', (req, res) => {
  console.log('redirecting to ServerOverview - fetch Biz-info');
  apiProxy.web(req, res, {target: ServerOverview});
});




app.listen(port, () => {
  console.log(`http://localhost:${port} is ready.`);
})