/* =========================================================
   UFMB — GLOBAL APP
   V1
   ========================================================= */


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initYear();

    const page = document.body.dataset.page;

    if (page === "home") {
        initHome();
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const button = document.getElementById("mobileMenuButton");
    const nav = document.getElementById("navLinks");

    if (!button || !nav) {
        return;
    }


    button.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    nav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   YEAR
   ========================================================= */

function initYear() {

    const yearElements = document.querySelectorAll("#currentYear");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

}


/* =========================================================
   HOME
   ========================================================= */

async function initHome() {

    const featuredContainer =
        document.getElementById("featuredCard");

    const latestContainer =
        document.getElementById("latestCards");


    try {

        const response =
            await fetch("data/players.json", {
                cache: "no-cache"
            });


        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const players = await response.json();


        if (!Array.isArray(players)) {
            throw new Error(
                "Invalid players.json format."
            );
        }


        updateHomeStats(players);


        /* FEATURED */

        if (featuredContainer && players.length > 0) {

            const featured =
                [...players]
                    .sort((a, b) => Number(b.ovr) - Number(a.ovr))[0];


            featuredContainer.innerHTML = "";

            const card =
                createUFMBPlayerCard(featured);

            featuredContainer.appendChild(card);
        }


        /* LATEST */

        if (latestContainer) {

            latestContainer.innerHTML = "";

            const latestPlayers =
                players.slice(0, 6);


            if (latestPlayers.length === 0) {

                latestContainer.innerHTML = `
                    <div class="loading-box">
                        No players available yet.
                    </div>
                `;

                return;
            }


            latestPlayers.forEach((player) => {

                latestContainer.appendChild(
                    createUFMBPlayerCard(player)
                );

            });

        }

    } catch (error) {

        console.error(
            "UFMB Home error:",
            error
        );


        if (featuredContainer) {

            featuredContainer.innerHTML = `
                <div class="error-box">
                    Unable to load featured player.
                </div>
            `;

        }


        if (latestContainer) {

            latestContainer.innerHTML = `
                <div class="error-box">
                    Unable to load database.
                </div>
            `;

        }

    }

}


/* =========================================================
   HOME STATS
   ========================================================= */

function updateHomeStats(players) {

    const playerStat =
        document.getElementById("statPlayers");

    const cardStat =
        document.getElementById("statCards");

    const nationStat =
        document.getElementById("statNations");


    if (playerStat) {
        playerStat.textContent =
            players.length.toLocaleString();
    }


    if (cardStat) {

        const cards =
            new Set(
                players.map(
                    player => player.version
                )
            );

        cardStat.textContent =
            cards.size.toLocaleString();
    }


    if (nationStat) {

        const nations =
            new Set(
                players.map(
                    player => player.nation
                )
            );

        nationStat.textContent =
            nations.size.toLocaleString();
    }

}
