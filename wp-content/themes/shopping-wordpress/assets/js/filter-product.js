var acc = document.getElementsByClassName("accordion");
var panel = document.getElementsByClassName("panel");
var i;
function openNav() {
    document.getElementById("myNav").style.width = "25%";
  
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

// --------


for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
       
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
