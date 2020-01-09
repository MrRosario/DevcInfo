document.addEventListener("DOMContentLoaded",e=>{App.init()});let App={init:function(){this.functionalities(),this.searchDefinitions()},searchDefinitions:function(){let e=document.getElementById("search-bar"),t=document.getElementById("lista-res");e.value?fetch(`https://www.dicionaberto.com/pesquisar/${e.value}`).then(e=>{e.json().then(e=>{let n="";e.forEach(function(e,t){let o=e.dados,i=o.slug,s=o.definicao.substring(0,70)+"...";return n+=`\n              <li class="resultado">\n                <a href='/${i}'>\n                  <span class="titulo"> ${o.titulo} - </span>  \n                  <span class="definicaoRes"> ${s} </span>\n                </a>\n              </li>`,!0}),t.innerHTML=n}).catch(e=>null)}):t.innerHTML=""},functionalities:function(){let e=this,t=document.getElementById("search-bar"),n=document.getElementById("lista-res"),o=document.getElementById("popover-content"),i=document.getElementById("more-btn");window.addEventListener("beforeunload",function(e){document.body.className="page-loading"}),document.addEventListener("click",e=>{"img-more"!==e.target.id&&(o.style.display="none")}),i.addEventListener("click",()=>{o.style.display="block"}),t.addEventListener("input",e=>{""==t.value&&(n.innerHTML="")}),t.addEventListener("keyup",()=>{e.searchDefinitions()}),t.addEventListener("focus",()=>{e.searchDefinitions()}),t.addEventListener("blur",()=>{setTimeout(()=>{n.innerHTML=""},200)})}};function removerUnlike(e){let t=document.getElementById(`naogosto-${e}`);fetch("https://www.dicionaberto.com/enviar/removerunlike",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:e})}).then(e=>e.json()).then(e=>{t.innerHTML=e.data.naoGosto}).catch(e=>{console.log("Request failure: ",e)})}function removerlike(e){let t=document.getElementById(`gosto-${e}`);fetch("https://www.dicionaberto.com/enviar/removerlike",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:e})}).then(e=>e.json()).then(e=>{t.innerHTML=e.data.gosto}).catch(e=>{console.log("Request failure: ",e)})}function gostar(e){let t=document.getElementById(`gosto-${e}`),n=navigator.userAgent,o=document.getElementById(`btnLike-${e}`),i=document.getElementById(`btnUnLike-${e}`);fetch("https://www.dicionaberto.com/enviar/like",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:e,user_agent:n,like:!0})}).then(e=>e.json()).then(n=>{t.innerHTML=n.doc.gosto,i.classList.contains("btn_clicado")?(i.classList.remove("btn_clicado"),removerUnlike(e),o.classList.add("btn_clicado")):o.classList.add("btn_clicado")}).catch(e=>{console.log("Request failure: ",e)})}function naoGostar(e){let t=document.getElementById(`naogosto-${e}`),n=navigator.userAgent,o=document.getElementById(`btnUnLike-${e}`),i=document.getElementById(`btnLike-${e}`);fetch("https://www.dicionaberto.com/enviar/unlike",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:e,user_agent:n,like:!1})}).then(e=>e.json()).then(n=>{t.innerHTML=n.doc.naoGosto,i.classList.contains("btn_clicado")?(i.classList.remove("btn_clicado"),removerlike(e),o.classList.add("btn_clicado")):o.classList.add("btn_clicado")}).catch(e=>{console.log("Request failure: ",e)})}function partilharTwitter(e,t){const n=`https://www.dicionaberto.com/${e}`;window.open(`https://twitter.com/intent/tweet?url=${n}&text=Significado%20de%20${t}`)}