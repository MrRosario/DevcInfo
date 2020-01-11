const express     = require("express");
const bodyParser  = require("body-parser");
const axios       = require('axios');
const path        = require('path');
const helmet      = require('helmet');
const app         = express();
const port        = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', true);
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
app.use(helmet());

app.all("*", function(req, res, next){
    if(req.get('X-Forwarded-Proto') == 'https' || req.hostname == 'localhost'){
      next();
    }
    else if(req.get('X-Forwarded-Proto') != 'https' && req.get('X-Forwarded-Port') != '443') {
      res.redirect('https://' + req.hostname + req.url);
    }
    else if(!req.headers.host.match(/^www\..*/i)) {
      res.redirect('https://' + req.headers.host + req.url);
    }
});
  
app.get('/', async(req, res) => {

    let Tags = {
        titulo: `Device info - Devcinfo`,
        meta_description: `My device information on the web, findout more about your device info, device type, ram, SO, Screen Size, Battery, Graphic card`,
        meta_keywords: `Device,Info,browser,security,privacy,testing,troubleshooting,fingerprinting,information,online, my device info`,
        og_title: `DevcInfo - Devcinfo`,
        meta_URL: `https://www.devcinfo.com`
    };

    res.render('pages/index',{
        pageTitle: "Home",
        meta: Tags
    });

});
app.get('/network', (req, res) => {

    let Tags = {
        titulo: `Find out more about my network - Devcinfo`,
        meta_description: `Find out more about your network status`,
        meta_keywords: `Public IP address, Connection type, Network status`,
        og_title: `Find out more about my network - Devcinfo`,
        meta_URL: `https://www.devcinfo.com/network`
    };

    let publicIpv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    res.render('pages/network',{
        pageTitle: "Network",
        ipv4: publicIpv4,
        meta: Tags
    }); 
});
app.get('/location', async(req, res, next) => {
    try {

        let Tags = {
            titulo: `My Location - Devcinfo`,
            meta_description: `Your location as seen from the Internet using your IP address.`,
            meta_keywords: `my location, my current location, my location now, what is my location. My Current Location. We detect Your Coordinate and Location Name.`,
            og_title: `My Location - Devcinfo`,
            meta_URL: `https://www.devcinfo.com/location`
        };

        const _publicIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const baseUrl  = `http://api.ipstack.com/${_publicIp}?access_key=b8a3261cc4b4d85e9f509e776d3d5228`;
        const response = await axios.get(baseUrl);

        res.render('pages/location',{
            pageTitle: "Location",
            location: response.data,
            meta: Tags
        });
    } 
    catch (e) {
        next(e);
    }
});
// app.get('/browser', (req, res) => {
//     res.render('pages/browser',{
//         pageTitle: "Browser"
//     });
// });
app.get("/sw.js", function(req, res){
    res.header("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname,"./sw.js"));
});
app.get("/sitemap.xml", function(req, res){
    res.type('text/xml');
    res.sendFile(path.join(__dirname,"./sitemap.xml"));
});
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.sendFile(path.join(__dirname,"./robots.txt"));
});

app.listen(port, () => {
    console.log(`DevcInfo running on port ${port}`);
});