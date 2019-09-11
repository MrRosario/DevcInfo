document.getElementById("defaultOpen").click();

function openCity(evt, categoryName) {
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

function deviceModel(){
  
}

ram();

