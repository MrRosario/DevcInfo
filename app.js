const express    = require("express");
const bodyParser = require("body-parser");
const geoip      = require('geoip-lite');
const publicIp   = require('public-ip');
const internalIp = require('internal-ip');
const app        = express();
const port       = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', true);

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    // // const _ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // var ip = await publicIp.v4();
    // var geo = geoip.lookup(ip);
    // console.log(geo);

    const Network = {
        publicIpv4: await publicIp.v4(),
        publicIpv6: await publicIp.v6(),
        privateIpv4: await internalIp.v4(),
        privateIpv6: await internalIp.v6(),
    }

    res.render('pages/index',{
        NetworkData: Network,
    });
});

app.listen(port, () => {
    console.log(`DevcInfo running on port ${port}`);
});