const express    = require("express");
const bodyParser = require("body-parser");
const publicIp   = require('public-ip');
const internalIp = require('internal-ip');
const axios      = require('axios');
const app        = express();
const port       = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', true);

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    // // const _ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const Network = {
        publicIpv4: await publicIp.v4(),
        publicIpv6: await publicIp.v6(),
        privateIpv4: await internalIp.v4(),
        privateIpv6: await internalIp.v6(),
    }

    res.render('pages/index',{
        NetworkData: Network,
        pageTitle: "Home"
    });
});

app.get('/network', async (req, res) => {

    const Network = {
        publicIpv4: await publicIp.v4(),
        publicIpv6: await publicIp.v6(),
        privateIpv4: await internalIp.v4(),
        privateIpv6: await internalIp.v6(),
    }

    res.render('pages/network',{
        NetworkData: Network,
        pageTitle: "Network"
    });
});

app.get('/location', async (req, res) => {
    try {
        let ip = await publicIp.v4();

        const baseUrl =  `http://api.ipstack.com/${ip}?access_key=b8a3261cc4b4d85e9f509e776d3d5228`;
        const response = await axios.get(baseUrl);

        res.render('pages/location',{
            pageTitle: "Location",
            location: response.data
        });
    } 
    catch (error) {
        console.error(error);
    }
});

// app.get('/browser', (req, res) => {
//     res.render('pages/browser',{
//         pageTitle: "Browser"
//     });
// });

app.listen(port, () => {
    console.log(`DevcInfo running on port ${port}`);
});