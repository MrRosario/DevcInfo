document.addEventListener("DOMContentLoaded", (evt) => {
  Hardware.init();
});

document.getElementById("defaultOpen").click();

function openTab(evt, categoryName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(categoryName).style.display = "block";
  evt.currentTarget.className += " active";
}

let Hardware = {
  init: function() {
    this.ram();
    this.battery();
    this.detectDevice();
    this.osAndBrowser();
    this.osAndBrowser();
    this.screen();
    this.getVideoCardInfo();
    this.cpu();
  },
  ram: () => {
    let ramElement =  document.getElementById("ram");
    let ramSize = navigator.deviceMemory;

    ramElement.innerHTML = ramSize || 'unknown';
  },
  battery: () => {
    let bateryLevelEl  = document.getElementById("bateryLevel");
    let bateryStatusEl = document.getElementById("bateryStatus");

    navigator.getBattery().then((battery) => {

      function updateAllBatteryInfo(){
        updateChargeInfo();
        updateLevelInfo();
      }

      updateAllBatteryInfo();

      battery.addEventListener('chargingchange', () => {
        updateChargeInfo();
      });
      battery.addEventListener('levelchange', () => {
        updateLevelInfo();
      });
      function updateChargeInfo(){
        bateryStatusEl.textContent = (battery.charging ? "Yes" : "No");
        console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
      }
      function updateLevelInfo(){
        bateryLevelEl.innerHTML = parseInt(battery.level * 100) + "%";
        console.log("Battery level: " + (battery.level * 100) + "%");
      }
    });
  },
  detectDevice: () => {
    let dvcTyeEl = document.getElementById("dvctype");

    if (window.innerWidth > 768) {
        var deviceType = "Desktop";
        dvcTyeEl.innerHTML = deviceType;
        console.log('=======device======', deviceType);
    }
    else if (window.innerWidth > 481 && window.innerWidth < 767) {
        var deviceType = "Tablet";
        dvcTyeEl.innerHTML = deviceType;
    } else if (window.innerWidth < 480) {
        var deviceType = "Mobile";
        dvcTyeEl.innerHTML = deviceType;
    }
  },
  osAndBrowser: () => {
    let module = {
      options: [],
      header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
      dataos: [
          { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
          { name: 'Windows', value: 'Win', version: 'NT' },
          { name: 'iPhone', value: 'iPhone', version: 'OS' },
          { name: 'iPad', value: 'iPad', version: 'OS' },
          { name: 'Kindle', value: 'Silk', version: 'Silk' },
          { name: 'Android', value: 'Android', version: 'Android' },
          { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
          { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
          { name: 'Macintosh', value: 'Mac', version: 'OS X' },
          { name: 'Linux', value: 'Linux', version: 'rv' },
          { name: 'Palm', value: 'Palm', version: 'PalmOS' }
      ],
      databrowser: [
        { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
        { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
        { name: 'Safari', value: 'Safari', version: 'Version' },
        { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
        { name: 'Opera', value: 'Opera', version: 'Opera' },
        { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
        { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
      ],
      init: function () {
        let agent = this.header.join(' '),
            os = this.matchItem(agent, this.dataos),
            browser = this.matchItem(agent, this.databrowser);

        return { os: os, browser: browser };
      },
      matchItem: (string, data) => {
        let i = 0,
            j = 0,
            html = '',
            regex,
            regexv,
            match,
            matches,
            version;

        for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, 'i');
            match = regex.test(string);
            if (match) {
                regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                matches = string.match(regexv);
                version = '';
                if (matches) { if (matches[1]) { matches = matches[1]; } }
                if (matches) {
                    matches = matches.split(/[._]+/);
                    for (j = 0; j < matches.length; j += 1) {
                        if (j === 0) {
                            version += matches[j] + '.';
                        } else {
                            version += matches[j];
                        }
                    }
                } else {
                    version = '';
                }
                return {
                    name: data[i].name,
                    version: version
                };
            }
        }
        return { name: 'unknown', version: 0 };
      }
    };

    let data = module.init();
    let osEl = document.getElementById("SO");

    osEl.innerHTML = `${data.os.name} ${data.os.version}`;

    console.log(`${data.os.name} ${data.os.version}, ${data.browser.name} ${data.browser.version}`);
  },
  screen: () => {
    let screen = document.getElementById('screenSize');
    const height = window.screen.height;
    const width = window.screen.width;

    screen.innerHTML = `${height} x ${width} pixels`;
  },
  getVideoCardInfo: () => {
    const gl = document.createElement('canvas').getContext('webgl');
    const vendorName = document.getElementById("vendor");
    const rendererName = document.getElementById("renderer");

    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const cardInfo = debugInfo ? {
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
      error: "no WEBGL_debug_renderer_info",
    };
    vendorName.innerHTML = cardInfo.vendor || 'unknown';
    rendererName.innerHTML = cardInfo.renderer || 'unknown';
  },
  cpu: () => {
    document.getElementById('coreNum').innerHTML = window.navigator.hardwareConcurrency;
  }
};
let Network = {
  init: function() {}
};
let Location = {
  init: function() {}
};
let Browser = {
  init: function() {}
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}



