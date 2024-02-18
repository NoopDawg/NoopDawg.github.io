
const track = document.getElementById("content-track")

window.onmousedown = e => {
    console.log(e.pageX)
    track.dataset.mouseDownAt = `${e.clientX}`;
    console.log("Mouse Down at:", track.dataset.mouseDownAt);
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    console.log("Mouse up at:", e.clientX);
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return; //mouse is up

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const movementPercentage = (mouseDelta/maxDelta) * -100;

    let trackPercentage = Math.max(Math.min(
        parseFloat(track.dataset.prevPercentage) + movementPercentage,
        0), -100)

    // track.style.transform = `translate(-${trackPercentage}%, -50%)`
    track.animate({
        transform: `translate(${trackPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    //update percentage to communicate to onmouseup (is there not a on mouse drag???)
    track.dataset.percentage = `${trackPercentage}`;
}