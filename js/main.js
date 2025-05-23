function isCardComingSoon(card) {
    card_data = CARDS.find(c => c.label === card.innerText.toLowerCase().replace("\n", " "))
    return !card_data.isComplete
}

CARDS = [
    { label: "myself", link: "about-me", isComplete: true },
    { label: "software engineering", link: "software-engineering", isComplete: false },
    { label: "music", link: "music", isComplete: true },
    { label: "writing", link: "writing", isComplete: false },
    { label: "projects", link: "projects", isComplete: false },
]

COMING_SOON_PAGES = [
    "software engineering",
    "music",
    "writing",
]

const track_page = document.getElementById("content-track-page")
const track = document.getElementById("content-track")

track_page.onmousedown = e => {
    track.dataset.mouseDownAt = `${e.clientX}`;
}

track_page.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    console.log("track.dataset.prevPercentage", track.dataset.prevPercentage)
}

track_page.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return; //mouse is up

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const movementPercentage = (mouseDelta / maxDelta) * -100;

    // constrain track percentage to -100 to 0
    let trackPercentage = Math.max(
            Math.min(
                parseFloat(track.dataset.prevPercentage) + movementPercentage, 0
            ), -100
        );

    if (!isNaN(trackPercentage)) {
        console.log("trackPercentage", trackPercentage)
        console.log("animating at line: 45")
        track.animate({
            transform: `translate(${trackPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        //update percentage to communicate to onmouseup
        track.dataset.percentage = `${trackPercentage}`;
    }
}

const cardObjects = document.querySelectorAll(".item-card");

cardObjects.forEach(card => {
    const card_data = CARDS.find(c => c.label === card.innerText.toLowerCase().replace("\n", " "))
    
    // Set up hover effects
    card.onmouseover = () => {
        if (!card.classList.contains('card-active')) {
            card.dataset.defaultText = card.getElementsByClassName("card-label")[0].innerText
            if (!card_data.isComplete) {
                card.getElementsByClassName("card-label")[0].innerText = "Coming Soon"
            } else {
                card.classList.add("card-hover");
            }
        }
    }
    
    card.onmouseout = () => {
        if (!card.classList.contains('card-active')) {
            card.getElementsByClassName("card-label")[0].innerText = card.dataset.defaultText
            card.classList.remove("card-hover");
        }
    }

    // Set up click and drag behavior
    if (card_data.isComplete) {
        let startX = 0;
        let isDragging = false;
        
        card.onmousedown = (e) => {
            startX = e.clientX;
            isDragging = false;
        };
        
        card.onmousemove = (e) => {
            if (Math.abs(e.clientX - startX) > 30) {
                isDragging = true;
            }
        };

        card.onmouseup = (e) => {
            if (isDragging) {
                track_page.dispatchEvent(new MouseEvent('mouseup', {
                    clientX: e.clientX,
                    bubbles: true
                }));
            }
        };
        
        card.onclick = (e) => {
            // Only proceed if we're not dragging
            if (isDragging) {
                return;
            }
            
            // Remove active class from all cards
            cardObjects.forEach(c => c.classList.remove('card-active'));
            cardObjects.forEach(c => c.classList.remove('card-hover'));
            // Add active class to clicked card
            card.classList.add('card-active');
            
            const percentage = -50
            console.log("animating at line 115")
            const currentAnimation = track.animate({
                transform: `translate(${percentage}%, -50%)`
            }, { duration: 500, fill: "forwards" });
           
            currentAnimation.onfinish = () => {
                track.dataset.percentage = `${percentage}`;
                track.dataset.prevPercentage = `${percentage}`;
            }

            // Handle content display
            const aboutMeSection = document.getElementById('about-me');
            const earOfAnupSection = document.getElementById('ear-of-anup');
            
            if (card_data.label === 'myself') {
                aboutMeSection.style.display = 'flex';
                aboutMeSection.classList.add('active');
                earOfAnupSection.style.display = 'none';
                earOfAnupSection.classList.remove('active');
                // Add a small delay to ensure the display change has taken effect
                setTimeout(() => {
                    aboutMeSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            } else if (card_data.label === 'music') {
                aboutMeSection.style.display = 'none';
                aboutMeSection.classList.remove('active');
                earOfAnupSection.style.display = 'flex';
                earOfAnupSection.classList.add('active');
                // Add a small delay to ensure the display change has taken effect
                setTimeout(() => {
                    earOfAnupSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
            
            // Ensure the drag functionality remains active
            track.dataset.mouseDownAt = track.dataset.mouseDownAt || "0";
        };
    }
});