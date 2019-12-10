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

app.get('/', async(req, res) => {
    
    let privateIpv4 = await internalIp.v4();
    let privateIpv6 = await internalIp.v6();
    console.log(`Private ip4 ${privateIpv4}, Private ip6 ${privateIpv6}`);
    
    res.render('pages/index',{
        pageTitle: "Home"
    });

});

app.get('/network', async (req, res) => {

    try{
        const Network = {
            publicIpv4: await publicIp.v4(),
            publicIpv6: await publicIp.v6(),
            privateIpv4: await internalIp.v4(),
            privateIpv6: await internalIp.v6(),
        }
        console.log(Network);
    
        res.render('pages/network',{
            NetworkData: Network,
            pageTitle: "Network"
        });
    }catch (error) {
        console.error(error);
    }
});

app.get('/location', async (req, res) => {
    try {

        // let ip = await publicIp.v4();
        const _publicIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log("Public IP", _publicIp);

        const baseUrl =  `http://api.ipstack.com/${_publicIp}?access_key=b8a3261cc4b4d85e9f509e776d3d5228`;
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