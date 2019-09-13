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

function ram(){
  let ramElement =  document.getElementById("ram");
  let ramSize = navigator.deviceMemory;

  ramElement.innerHTML = ramSize || 'unknown';
}
function detectDevice(){
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
}
function osAndBrowser(){

  var module = {
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
      var agent = this.header.join(' '),
          os = this.matchItem(agent, this.dataos),
          browser = this.matchItem(agent, this.databrowser);
      
      return { os: os, browser: browser };
    },
    matchItem: function (string, data) {
      var i = 0,
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
    
    var data = module.init();
    var osEl = document.getElementById("SO");
    
    osEl.innerHTML = `${data.os.name} ${data.os.version}`;

    
    // document.getElementById("test").innerHTML = navigator.userAgent;
    // alert(`${data.os.name} ${data.os.version}, ${data.browser.name} ${data.browser.version}`);
    // navigator.userAgent;
    // navigator.appVersion;
    // navigator.platform;
    // navigator.vendor;
}

function battery(){
  var bateryLevelEl  = document.getElementById("bateryLevel");
  var bateryStatusEl = document.getElementById("bateryStatus");
  
  navigator.getBattery().then(function(battery) {
    function updateAllBatteryInfo(){
      updateChargeInfo();
      updateLevelInfo();
    }
    updateAllBatteryInfo();
  
    battery.addEventListener('chargingchange', function(){
      updateChargeInfo();
    });
    function updateChargeInfo(){
      bateryStatusEl.textContent = (battery.charging ? "Yes" : "No");
      console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
    }
    battery.addEventListener('levelchange', function(){
      updateLevelInfo();
    });
    function updateLevelInfo(){
      bateryLevelEl.innerHTML = parseInt(battery.level * 100) + "%";
      console.log("Battery level: " + (battery.level * 100) + "%");
    }
  });
}
battery();
osAndBrowser();
detectDevice();
ram();

