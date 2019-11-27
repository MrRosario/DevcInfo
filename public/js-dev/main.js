function openTab(e, n) {
    let t, o, i;
    for (o = document.getElementsByClassName("tabcontent"), t = 0; t < o.length; t++)
        o[t].style.display = "none";
    for (i = document.getElementsByClassName("tablinks"), t = 0; t < i.length; t++)
        i[t].className = i[t].className.replace(" active", "");
    document.getElementById(n).style.display = "block",
    e.currentTarget.className += " active"
}

// document.getElementById("defaultOpen").click();

document.addEventListener("DOMContentLoaded", () =>{
    Hardware.init()
})

var i, acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++){
    acc[i].addEventListener("click", function() {
        var e = this.nextElementSibling;
        "block" === e.style.display ? e.style.display = "none" : e.style.display = "block"
    });
}
let Hardware = {
    init: function() {
        this.ram(),
        this.battery(),
        this.detectDevice(),
        this.osAndBrowser(),
        this.osAndBrowser(),
        this.screen(),
        this.getVideoCardInfo(),
        this.cpu(),
        this.connectionType()
    },
    ram: ()=>{
        let e = document.getElementById("ram")
          , n = navigator.deviceMemory;
        e.innerHTML = n || "unknown"
    }
    ,
    battery: ()=>{
        let e = document.getElementById("bateryLevel")
          , n = document.getElementById("bateryStatus");
        navigator.getBattery().then(t=>{
            function o() {
                n.textContent = t.charging ? "Yes" : "No",
                console.log("Battery charging? " + (t.charging ? "Yes" : "No"))
            }
            function i() {
                e.innerHTML = parseInt(100 * t.level) + "%",
                console.log("Battery level: " + 100 * t.level + "%")
            }
            o(),
            i(),
            t.addEventListener("chargingchange", ()=>{
                o()
            }
            ),
            t.addEventListener("levelchange", ()=>{
                i()
            }
            )
        }
        )
    },
    detectDevice: ()=>{
        let e = document.getElementById("dvctype");
        if (window.innerWidth > 768) {
            var n = "Desktop";
            e.innerHTML = n,
            console.log("=======device======", n)
        } else
            window.innerWidth > 481 && window.innerWidth < 767 ? (n = "Tablet",
            e.innerHTML = n) : window.innerWidth < 480 && (n = "Mobile",
            e.innerHTML = n)
    },
    osAndBrowser: ()=>{
        let e = {
            options: [],
            header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
            dataos: [{
                name: "Windows Phone",
                value: "Windows Phone",
                version: "OS"
            }, {
                name: "Windows",
                value: "Win",
                version: "NT"
            }, {
                name: "iPhone",
                value: "iPhone",
                version: "OS"
            }, {
                name: "iPad",
                value: "iPad",
                version: "OS"
            }, {
                name: "Kindle",
                value: "Silk",
                version: "Silk"
            }, {
                name: "Android",
                value: "Android",
                version: "Android"
            }, {
                name: "PlayBook",
                value: "PlayBook",
                version: "OS"
            }, {
                name: "BlackBerry",
                value: "BlackBerry",
                version: "/"
            }, {
                name: "Macintosh",
                value: "Mac",
                version: "OS X"
            }, {
                name: "Linux",
                value: "Linux",
                version: "rv"
            }, {
                name: "Palm",
                value: "Palm",
                version: "PalmOS"
            }],
            databrowser: [{
                name: "Chrome",
                value: "Chrome",
                version: "Chrome"
            }, {
                name: "Firefox",
                value: "Firefox",
                version: "Firefox"
            }, {
                name: "Safari",
                value: "Safari",
                version: "Version"
            }, {
                name: "Internet Explorer",
                value: "MSIE",
                version: "MSIE"
            }, {
                name: "Opera",
                value: "Opera",
                version: "Opera"
            }, {
                name: "BlackBerry",
                value: "CLDC",
                version: "CLDC"
            }, {
                name: "Mozilla",
                value: "Mozilla",
                version: "Mozilla"
            }],
            init: function() {
                let e = this.header.join(" ");
                return {
                    os: this.matchItem(e, this.dataos),
                    browser: this.matchItem(e, this.databrowser)
                }
            },
            matchItem: (e,n)=>{
                let t, o, i, r, a, l = 0, s = 0;
                for (l = 0; l < n.length; l += 1)
                    if (i = (t = new RegExp(n[l].value,"i")).test(e)) {
                        if (o = new RegExp(n[l].version + "[- /:;]([\\d._]+)","i"),
                        a = "",
                        (r = e.match(o)) && r[1] && (r = r[1]),
                        r)
                            for (r = r.split(/[._]+/),
                            s = 0; s < r.length; s += 1)
                                a += 0 === s ? r[s] + "." : r[s];
                        else
                            a = "";
                        return {
                            name: n[l].name,
                            version: a
                        }
                    }
                return {
                    name: "unknown",
                    version: 0
                }
            }
        }.init();
        document.getElementById("SO").innerHTML = `${e.os.name} ${e.os.version}`,
        console.log(`${e.os.name} ${e.os.version}, ${e.browser.name} ${e.browser.version}`)
    },
    screen: ()=>{
        let e = document.getElementById("screenSize");
        const n = window.screen.height
          , t = window.screen.width;
        e.innerHTML = `${n} x ${t} pixels`
    },
    getVideoCardInfo: ()=>{
        const e = document.createElement("canvas").getContext("webgl")
          , n = document.getElementById("vendor")
          , t = document.getElementById("renderer");
        if (!e)
            return {
                error: "no webgl"
            };
        const o = e.getExtension("WEBGL_debug_renderer_info")
          , i = o ? {
            vendor: e.getParameter(o.UNMASKED_VENDOR_WEBGL),
            renderer: e.getParameter(o.UNMASKED_RENDERER_WEBGL)
        } : {
            error: "no WEBGL_debug_renderer_info"
        };
        n.innerHTML = i.vendor || "unknown",
        t.innerHTML = i.renderer || "unknown"
    },
    cpu: ()=>{
        document.getElementById("coreNum").innerHTML = window.navigator.hardwareConcurrency
    },
    connectionType: ()=>{
        let e = navigator.connection || navigator.mozConnection || navigator.webkitConnection
          , n = document.getElementById("connectionType")
          , t = document.getElementById("downlink")
          , o = document.getElementById("rtt")
          , i = document.getElementById("downlinkMax")
          , r = document.getElementById("effectiveType")
          , a = document.getElementById("saveData")
          , l = document.getElementById("intAcc");
        function s() {
            console.log("Connection changed to " + e.downlink + "Mb/s"),
            n.innerHTML = e.type ? e.type : "unknown",
            t.innerHTML = e.downlink + "Mb/s",
            o.innerHTML = e.rtt + "ms",
            i.innerHTML = e.downlinkMax + "Mb/s",
            r.innerHTML = e.effectiveType,
            a.innerHTML = e.saveData
        }
        function d(e) {
            console.log(e),
            "offline" == e.type && (l.innerHTML = "offline",
            console.log("You lost connection.")),
            "online" == e.type && (l.innerHTML = "online",
            console.log("You are now back online."))
        }
        navigator.onLine ? l.innerHTML = "online" : l.innerHTML = "offline",
        e.addEventListener("change", s),
        window.addEventListener("online", d),
        window.addEventListener("offline", d),
        s()
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
};

