function mostrarVideo() {
    const video = document.getElementById("video");
    video.style.display = "block";
    video.play();
}
function mostrarVideo() {
    const video = document.getElementById("video");

    if (video.style.display === "none") {
        video.style.display = "block";
        video.play();
    } else {
        video.style.display = "none";
        video.pause();
        video.currentTime = 0;
    }
}
