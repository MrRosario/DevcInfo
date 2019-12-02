document.addEventListener("DOMContentLoaded", () =>{
    App.init()
});

let App = {
    init: function(){
        this.hideContent();
        this.hideNavbar();
    },
    hideContent: function(){
        let arrow = document.getElementsByClassName("arrow");
        let panel = document.getElementsByClassName("panel");
        
        for(let i = 0; i < arrow.length; i++){
            arrow[i].addEventListener("click", function(){
                console.log(i);

                if(this.classList.contains("arrow--down")){
                    console.log("tem");
                    this.classList.remove("arrow--down");
                    this.classList.add("arrow--up");
                    panel[i].style.display = "none";
                }else{
                    console.log("nao tem");
                    this.classList.remove("arrow--up");
                    this.classList.add("arrow--down");
                    panel[i].style.display = "block";
                }
            });
        }
    },
    hideNavbar: function(){
        let btn__more = document.getElementById("btn__more");

        btn__more.addEventListener("click", function(){
            alert("ola mundo")
        });
    }
}