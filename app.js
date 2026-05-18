/* AOS */

if (window.AOS) {
    AOS.init({
        duration: 1200,
        once: true,
        easing: "ease-in-out"
    });
} else {
    document.querySelectorAll("[data-aos]").forEach((element) => {
        element.removeAttribute("data-aos");
    });
}


/* THEME TOGGLE */

const toggle = document.querySelector(".theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}


/* ACTIVE NAVIGATION */

function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href").split("?")[0];

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}

setActiveNav();


/* LIVE CLOCKS */

function updateClocks() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const time = `${hours}:${minutes}:${seconds}`;

    const introClock = document.getElementById("intro-clock");

    if (introClock) {
        introClock.textContent = time;
    }

    const navbarClock = document.getElementById("clock");

    if (navbarClock) {
        navbarClock.textContent = time;
    }
}

updateClocks();
setInterval(updateClocks, 1000);


/* HOMEPAGE CINEMATIC REVEAL */

const intro = document.querySelector(".intro-screen");

function showHomeStage(stage) {
    const website = document.querySelector(".main-website");
    const navbar = document.querySelector("nav");
    const nameReveal = document.querySelector(".reveal-name");
    const imageReveal = document.querySelector(".reveal-image");
    const contentReveal = document.querySelectorAll(".reveal-content");

    if (stage >= 1) {
        if (intro) intro.classList.add("hide");
        if (website) website.classList.add("show");
        if (nameReveal) nameReveal.classList.add("show");
    }

    if (stage >= 2) {
        if (imageReveal) imageReveal.classList.add("show");
    }

    if (stage >= 3) {
        contentReveal.forEach((element) => {
            element.classList.add("show");
        });

        if (navbar) {
            navbar.classList.add("show");
        }
    }
}

if (intro) {
    const params = new URLSearchParams(window.location.search);
    const directHome = params.get("home");
    let stage = 0;

    if (directHome) {
        showHomeStage(3);
    }

    window.addEventListener("wheel", () => {
        if (directHome) return;

        stage = Math.min(stage + 1, 3);
        showHomeStage(stage);
    });

    window.addEventListener("touchstart", () => {
        if (directHome) return;

        stage = Math.min(stage + 1, 3);
        showHomeStage(stage);
    }, { passive: true });

    window.addEventListener("keydown", (event) => {
        if (directHome) return;

        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
            stage = Math.min(stage + 1, 3);
            showHomeStage(stage);
        }
    });
} else {
    const navbar = document.querySelector("nav");

    if (navbar) {
        navbar.classList.add("show");
    }
}


/* HOME PORTRAIT INTERACTION */

const portraitSystem = document.getElementById("portraitSystem");

if (portraitSystem) {
    portraitSystem.addEventListener("mousemove", (event) => {
        const rect = portraitSystem.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        portraitSystem.style.setProperty("--portrait-x", `${x}px`);
        portraitSystem.style.setProperty("--portrait-y", `${y}px`);
    });

    portraitSystem.addEventListener("mouseleave", () => {
        portraitSystem.style.setProperty("--portrait-x", "50%");
        portraitSystem.style.setProperty("--portrait-y", "50%");
    });
}


/* ABOUT INTEREST POPUP */

const interestDetails = {
    construction: {
        title: "Construction",
        accent: "#607466",
        text: "Construction is where my technical thinking started. It taught me to read systems through drawings, quantities, costs, materials, and real-world constraints.",
        signal: "Drawings, quantities, site logic",
        points: [
            "Quantity takeoffs and estimation",
            "Reading drawings as working systems",
            "Connecting cost, material, and execution"
        ]
    },

    technology: {
        title: "Technology",
        accent: "#3E6F8E",
        text: "Technology feels like another kind of construction site: structure, logic, tools, experiments, and better ways to build things people can actually use.",
        signal: "Automation, AI, useful tools",
        points: [
            "AI tools and workflow automation",
            "Digital systems that improve work",
            "Learning by building small experiments"
        ]
    },

    photography: {
        title: "Photography",
        accent: "#8A6F4D",
        text: "Photography sharpens how I observe. It trains me to notice light, texture, silence, contrast, and the small details most people walk past.",
        signal: "Light, texture, atmosphere",
        points: [
            "Framing and visual storytelling",
            "Capturing overlooked details",
            "Training the eye to slow down"
        ]
    },

    gaming: {
        title: "Gaming",
        accent: "#7356A8",
        text: "Gaming interests me because it combines systems, design, mechanics, emotion, and immersion. A good game is architecture you can move through.",
        signal: "Worlds, mechanics, immersion",
        points: [
            "Interactive environments",
            "Feedback loops and player behavior",
            "Atmosphere, story, and motion"
        ]
    },

    design: {
        title: "Design",
        accent: "#9A594A",
        text: "Design is where structure becomes feeling. I like interfaces that are clean, cinematic, useful, and a little unexpected.",
        signal: "Cinematic but functional interfaces",
        points: [
            "Visual hierarchy and rhythm",
            "Motion that adds meaning",
            "Interfaces with personality"
        ]
    },

    software: {
        title: "Software",
        accent: "#2F7D6D",
        text: "Software gives me a way to turn observations into tools. I enjoy building practical systems and watching ideas become working products.",
        signal: "Code as a building material",
        points: [
            "Web development",
            "Problem-solving through code",
            "Useful tools and digital experiments"
        ]
    }
};

const modal = document.getElementById("interestModal");

if (modal) {
    const interestOrder = Object.keys(interestDetails);
    let currentInterestIndex = 0;

    const modalWindow = document.getElementById("interestWindow");
    const modalTitle = document.getElementById("interestModalTitle");
    const modalText = document.getElementById("interestModalText");
    const modalList = document.getElementById("interestModalList");
    const modalSignal = document.getElementById("interestModalSignal");
    const modalCount = document.getElementById("interestModalCount");
    const modalNumber = document.getElementById("interestModalNumber");
    const modalProgress = document.getElementById("interestModalProgress");
    const interestButtons = document.querySelectorAll(".interest-card");
    const previousButton = document.querySelector("[data-interest-prev]");
    const nextButton = document.querySelector("[data-interest-next]");

    function openInterestModal(interestKey) {
        const detail = interestDetails[interestKey];

        if (!detail) return;

        currentInterestIndex = interestOrder.indexOf(interestKey);

        modal.style.setProperty("--interest-accent", detail.accent);

        if (modalTitle) modalTitle.textContent = detail.title;
        if (modalText) modalText.textContent = detail.text;
        if (modalSignal) modalSignal.textContent = detail.signal;

        const count = String(currentInterestIndex + 1).padStart(2, "0");
        const total = String(interestOrder.length).padStart(2, "0");

        if (modalNumber) modalNumber.textContent = count;
        if (modalCount) modalCount.textContent = `${count} / ${total}`;
        if (modalProgress) modalProgress.style.width = `${((currentInterestIndex + 1) / interestOrder.length) * 100}%`;

        if (modalList) {
            modalList.innerHTML = "";

            detail.points.forEach((point, index) => {
                const card = document.createElement("div");
                card.className = "interest-detail-card";

                const number = document.createElement("span");
                number.textContent = String(index + 1).padStart(2, "0");

                const text = document.createElement("p");
                text.textContent = point;

                card.appendChild(number);
                card.appendChild(text);
                modalList.appendChild(card);
            });
        }

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("interest-modal-open");
    }

    function closeInterestModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("interest-modal-open");
    }

    function moveInterest(direction) {
        currentInterestIndex = (currentInterestIndex + direction + interestOrder.length) % interestOrder.length;
        openInterestModal(interestOrder[currentInterestIndex]);
    }

    interestButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openInterestModal(button.dataset.interest);
        });
    });

    document.querySelectorAll("[data-close-interest]").forEach((button) => {
        button.addEventListener("click", closeInterestModal);
    });

    if (previousButton) {
        previousButton.addEventListener("click", () => moveInterest(-1));
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => moveInterest(1));
    }

    if (modalWindow) {
        modalWindow.addEventListener("mousemove", (event) => {
            const rect = modalWindow.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            modalWindow.style.setProperty("--mouse-x", `${x}px`);
            modalWindow.style.setProperty("--mouse-y", `${y}px`);
            modalWindow.style.setProperty("--tilt-x", `${((y / rect.height) - 0.5) * -6}deg`);
            modalWindow.style.setProperty("--tilt-y", `${((x / rect.width) - 0.5) * 6}deg`);
        });

        modalWindow.addEventListener("mouseleave", () => {
            modalWindow.style.setProperty("--tilt-x", "0deg");
            modalWindow.style.setProperty("--tilt-y", "0deg");
        });
    }

    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("show")) return;

        if (event.key === "Escape") {
            closeInterestModal();
        }

        if (event.key === "ArrowLeft") {
            moveInterest(-1);
        }

        if (event.key === "ArrowRight") {
            moveInterest(1);
        }
    });
}


/* EXPERIENCE FIELD NOTES */

const experienceToggles = document.querySelectorAll("[data-experience-toggle]");

function syncExperienceToggle(card) {
    const button = card.querySelector("[data-experience-toggle]");
    const label = button ? button.querySelector("span") : null;
    const icon = button ? button.querySelector("i") : null;
    const isOpen = card.classList.contains("is-open");

    if (label) {
        label.textContent = isOpen ? "Collapse field note" : "Open field note";
    }

    if (icon) {
        icon.className = isOpen ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down";
    }
}

experienceToggles.forEach((button) => {
    const card = button.closest(".experience-node");

    if (card) {
        syncExperienceToggle(card);

        button.addEventListener("click", () => {
            card.classList.toggle("is-open");
            syncExperienceToggle(card);
        });
    }
});


/* PROJECT FILTERS AND MODAL */

const projectDetails = {
    portfolio: {
        title: "Portfolio Website",
        accent: "#607466",
        text: "A personal identity system built as a website: part portfolio, part interactive field note, part digital space.",
        points: [
            "Responsive HTML, CSS, and JavaScript structure",
            "Dark mode, staged reveal, and interactive sections",
            "Designed around engineering, systems, and personal identity"
        ]
    },

    research: {
        title: "Engineering Research Projects",
        accent: "#8A6F4D",
        text: "Academic engineering work focused on material behavior, filtration systems, and practical performance evaluation.",
        points: [
            "Water filtration systems using AFM",
            "Concrete performance with recycled plastic materials",
            "Research-led thinking connected to real construction questions"
        ]
    },

    interface: {
        title: "Personal Interface System",
        accent: "#3E6F8E",
        text: "The evolving design language behind this portfolio, built around cinematic surfaces, signals, field notes, and system-inspired motion.",
        points: [
            "Reusable visual rhythm across pages",
            "Interactive cards, modals, and hover states",
            "A less orthodox portfolio direction with stronger personality"
        ]
    }
};

const projectFilters = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");
const projectModal = document.getElementById("projectModal");

projectFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
        const selected = filter.dataset.projectFilter;

        projectFilters.forEach((button) => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        projectCards.forEach((card) => {
            const categories = card.dataset.projectCategory.split(" ");
            const shouldShow = selected === "all" || categories.includes(selected);

            card.classList.toggle("is-hidden", !shouldShow);
        });
    });
});

if (projectModal) {
    const projectTitle = document.getElementById("projectModalTitle");
    const projectText = document.getElementById("projectModalText");
    const projectPoints = document.getElementById("projectModalPoints");

    function openProjectModal(projectKey) {
        const detail = projectDetails[projectKey];

        if (!detail) return;

        projectModal.style.setProperty("--project-accent", detail.accent);

        if (projectTitle) projectTitle.textContent = detail.title;
        if (projectText) projectText.textContent = detail.text;

        if (projectPoints) {
            projectPoints.innerHTML = "";

            detail.points.forEach((point) => {
                const item = document.createElement("span");
                item.textContent = point;
                projectPoints.appendChild(item);
            });
        }

        projectModal.classList.add("show");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("interest-modal-open");
    }

    function closeProjectModal() {
        projectModal.classList.remove("show");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("interest-modal-open");
    }

    document.querySelectorAll("[data-project]").forEach((card) => {
        const button = card.querySelector(".project-open");

        if (button) {
            button.addEventListener("click", () => {
                openProjectModal(card.dataset.project);
            });
        }
    });

    document.querySelectorAll("[data-project-close]").forEach((button) => {
        button.addEventListener("click", closeProjectModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && projectModal.classList.contains("show")) {
            closeProjectModal();
        }
    });
}


/* CONTACT ACTIONS */

const contactPage = document.getElementById("contactPage");

if (contactPage) {
    contactPage.addEventListener("mousemove", (event) => {
        const rect = contactPage.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        contactPage.style.setProperty("--contact-mouse-x", `${x}%`);
        contactPage.style.setProperty("--contact-mouse-y", `${y}%`);
    });

    contactPage.addEventListener("mouseleave", () => {
        contactPage.style.setProperty("--contact-mouse-x", "50%");
        contactPage.style.setProperty("--contact-mouse-y", "35%");
    });
}

const copyEmailButton = document.querySelector("[data-copy-email]");
const copyFeedback = document.getElementById("copyFeedback");

function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        const email = copyEmailButton.dataset.copyEmail;

        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(email);
            } else {
                fallbackCopyText(email);
            }

            if (copyFeedback) {
                copyFeedback.textContent = "Email copied. Signal ready.";
            }
        } catch (error) {
            fallbackCopyText(email);

            if (copyFeedback) {
                copyFeedback.textContent = "Email copied. Signal ready.";
            }
        }
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href = `mailto:solankidhruvmarch@gmail.com?subject=${subject}&body=${body}`;
    });
}
