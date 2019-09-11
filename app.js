const express    = require("express");
const bodyParser = require("body-parser");
const geoip      = require('geoip-lite');
const app        = express();
const port      = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', true);

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // // const _ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // var ip = "189.40.91.152";
    // var geo = geoip.lookup(ip);
    // res.send(geo);
    res.render('pages/index');
});

app.listen(port, () => {
    console.log(`DevcInfo running on port ${port}`);
});