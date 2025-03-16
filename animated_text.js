const lines = document.querySelectorAll(".line");
let index = 0;
function showLines() {
    if (index < lines.length) {
        lines[index].style.display = "block";
        setTimeout(() => {
            lines[index].style.opacity = 1;
            index++;
            setTimeout(showLines, 600);
        }, 1000);
    }
}
showLines();