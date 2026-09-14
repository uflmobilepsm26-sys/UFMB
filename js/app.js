document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.querySelector(".mobile-menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-open");
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       DEMO DATABASE
       ===================================================== */

    const players = [
        {
            name: "Beckenbauer",
            ovr: 95,
            position: "CB",
            nation: "Germany",
            pac: 84,
            sho: 67,
            pas: 91,
            dri: 87,
            def: 94,
            phy: 82,
            perk: "Leadership",
            version: "Icon"
        },
        {
            name: "Kahn",
            ovr: 99,
            position: "GK",
            nation: "Germany",
            pac: 72,
            sho: 45,
            pas: 76,
            dri: 55,
            def: 96,
            phy: 91,
            perk: "Wall",
            version: "Icon"
        },
        {
            name: "Hakimi",
            ovr: 94,
            position: "RB",
            nation: "Morocco",
            pac: 96,
            sho: 76,
            pas: 84,
            dri: 88,
            def: 79,
            phy: 82,
            perk: "Rapid",
            version: "Night Palm Tree"
        },
        {
            name: "Martínez",
            ovr: 96,
            position: "CB",
            nation: "Argentina",
            pac: 82,
            sho: 51,
            pas: 72,
            dri: 68,
            def: 95,
            phy: 94,
            perk: "Interceptor",
            version: "Night Palm Tree"
        },
        {
            name: "Cucurella",
            ovr: 93,
            position: "LB",
            nation: "Spain",
            pac: 87,
            sho: 55,
            pas: 81,
            dri: 84,
            def: 82,
            phy: 78,
            perk: "Pressing",
            version: "Night Palm Tree"
        },
        {
            name: "Olise",
            ovr: 94,
            position: "RM",
            nation: "France",
            pac: 88,
            sho: 86,
            pas: 91,
            dri: 94,
            def: 52,
            phy: 70,
            perk: "Playmaker",
            version: "Night Palm Tree"
        }
    ];


    /* =====================================================
       LATEST CARDS
       ===================================================== */

    const latestCards = document.getElementById("latestCards");

    if (latestCards) {

        latestCards.innerHTML = "";

        players.slice(0, 4).forEach(player => {

            latestCards.appendChild(
                createPlayerCard(player)
            );

        });

    }


    /* =====================================================
       PLAYER CARD BUILDER
       ===================================================== */

    function createPlayerCard(player) {

        const card = document.createElement("article");

        card.className = "player-card";

        card.innerHTML = `
            <div class="card-top">
                <div>
                    <div class="card-version">
                        ${player.version}
                    </div>

                    <div class="card-position">
                        ${player.position}
                    </div>
                </div>

                <div class="card-rating">
                    ${player.ovr}
                </div>
            </div>

            <div class="card-name">
                ${player.name}
            </div>

            <div class="card-nation">
                ${player.nation}
            </div>

            <div class="card-stats">

                ${stat("PAC", player.pac)}
                ${stat("SHO", player.sho)}
                ${stat("PAS", player.pas)}
                ${stat("DRI", player.dri)}
                ${stat("DEF", player.def)}
                ${stat("PHY", player.phy)}

            </div>
        `;

        card.addEventListener("click", () => {
            showPlayerDetails(player);
        });

        return card;
    }


    /* =====================================================
       STAT BUILDER
       ===================================================== */

    function stat(label, value) {

        return `
            <div class="card-stat">
                <strong>${value}</strong>
                <small>${label}</small>
            </div>
        `;

    }


    /* =====================================================
       PLAYER DETAILS
       ===================================================== */

    function showPlayerDetails(player) {

        alert(
            `${player.name}\n\n` +
            `OVR: ${player.ovr}\n` +
            `Position: ${player.position}\n` +
            `Nation: ${player.nation}\n\n` +
            `PAC: ${player.pac}\n` +
            `SHO: ${player.sho}\n` +
            `PAS: ${player.pas}\n` +
            `DRI: ${player.dri}\n` +
            `DEF: ${player.def}\n` +
            `PHY: ${player.phy}\n\n` +
            `Perk: ${player.perk}`
        );

    }


    /* =====================================================
       MOBILE NAVIGATION STYLE
       ===================================================== */

    const mobileStyle = document.createElement("style");

    mobileStyle.textContent = `
        @media (max-width: 720px) {

            .nav-links.mobile-open {
                display: flex;

                position: absolute;

                top: 66px;
                left: 0;
                right: 0;

                flex-direction: column;

                gap: 0;

                padding: 10px 6% 20px;

                background: rgba(7, 9, 13, 0.97);

                border-bottom:
                    1px solid #202934;

                backdrop-filter: blur(20px);
            }

            .nav-links.mobile-open a {
                width: 100%;

                padding: 16px 0;

                border-bottom:
                    1px solid #171e26;
            }

            .nav-links.mobile-open a:last-child {
                border-bottom: 0;
            }

            .nav-links.mobile-open a.active::after {
                display: none;
            }
        }
    `;

    document.head.appendChild(mobileStyle);


});
