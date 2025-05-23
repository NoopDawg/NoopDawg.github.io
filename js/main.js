function isCardComingSoon(card) {
    label = card.getElementsByClassName("card-label")[0].innerText.toLowerCase().replace("\n", " ")
    return COMING_SOON_PAGES.includes(label)
}



CARDS = [
    { label: "myself", link: "about-me", isComplete: true },
    { label: "software engineering", link: "software-engineering", isComplete: false },
    { label: "music", link: "music", isComplete: false },
    { label: "writing", link: "writing", isComplete: false },
    { label: "projects", link: "projects", isComplete: false },
]

COMING_SOON_PAGES = [
    "software engineering",
    "music",
    "writing",
]
//Coming soon for cards
const cards = document.getElementsByClassName("item-card")
for (const card of cards) {
    card.onmouseover = () => {
        //get card-label div inside card
        card.dataset.defaultText = card.getElementsByClassName("card-label")[0].innerText
        label = card.dataset.defaultText.toLowerCase().replace("\n", " ")
        if (COMING_SOON_PAGES.includes(label)) {
            card.getElementsByClassName("card-label")[0].innerText = "Coming Soon"
        } else {
            // apply card-hover class  
            console.log("hovering")
            card.classList.add("card-hover");
        };
    }
    card.onmouseout = () => {
        //get card-label div inside card
        card.getElementsByClassName("card-label")[0].innerText = card.dataset.defaultText
        card.classList.remove("card-hover");
    }
}

const track_page = document.getElementById("content-track-page")
const track = document.getElementById("content-track")

track_page.onmousedown = e => {
    console.log(e.pageX)
    track.dataset.mouseDownAt = `${e.clientX}`;
}

track_page.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

track_page.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return; //mouse is up

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const movementPercentage = (mouseDelta / maxDelta) * -100;

    let trackPercentage = Math.max(Math.min(
        parseFloat(track.dataset.prevPercentage || 0) + movementPercentage,
        0), -100);

    if (!isNaN(trackPercentage)) {
        track.animate({
            transform: `translate(${trackPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        //update percentage to communicate to onmouseup
        track.dataset.percentage = `${trackPercentage}`;
    }
}

const cardObjects = document.querySelectorAll(".item-card");
console.log(cardObjects)

cardObjects.forEach(card => {
    const card_data = CARDS.find(c => c.label === card.innerText.toLowerCase().replace("\n", " "))
    console.log(card_data)
    console.log(card_data.isComplete)
    if (card_data.isComplete) {
        console.log(`card: ${card_data.label} is complete`)
        card.onclick = () => {
            console.log(card_data)
            const card_section_id = card_data.link;
            const cardSection = document.getElementById(card_section_id);
            console.log("Completed Card is Clicked") 
            if (cardSection) {
                cardSection.style.display = "block";
                cardSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
})

document.addEventListener('DOMContentLoaded', function() {
    const aboutMeSection = document.getElementById('about-me');
    const earOfAnupSection = document.getElementById('ear-of-anup');
    const myselfCard = document.querySelector('.item-card:nth-child(1)');
    const musicCard = document.querySelector('.item-card:nth-child(3)');

    myselfCard.addEventListener('click', function() {
        aboutMeSection.style.display = 'flex';
        earOfAnupSection.style.display = 'none';
        // Ensure the drag functionality remains active
        track.dataset.mouseDownAt = track.dataset.mouseDownAt || "0";
    });

    musicCard.addEventListener('click', function() {
        aboutMeSection.style.display = 'none';
        earOfAnupSection.style.display = 'flex';
    });
});

// if (myselfCard && myselfCard.innerText === "Myself") {
//     myselfCard.parentElement.onclick = () => {
//         const aboutMeSection = document.getElementById("about-me");
//         if (aboutMeSection) {
//             aboutMeSection.style.display = "block";
//             aboutMeSection.scrollIntoView({ behavior: "smooth" });
            


//         }
//     };
// }