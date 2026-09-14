/* =========================================================
   UFMB — DATABASE ENGINE
   Loads player data from data/players.json
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("databaseGrid");
    const resultCount = document.getElementById("resultCount");

    const searchInput = document.getElementById("searchInput");
    const ovrFilter = document.getElementById("ovrFilter");
    const positionFilter = document.getElementById("positionFilter");
    const versionFilter = document.getElementById("versionFilter");

    let players = [];


    /* =====================================================
       LOAD DATABASE
       ===================================================== */

    async function loadDatabase() {

        try {

            const response = await fetch("data/players.json");

            if (!response.ok) {
                throw new Error(
                    `Database request failed: ${response.status}`
                );
            }

            players = await response.json();

            renderPlayers(players);

        } catch (error) {

            console.error(
                "UFMB database error:",
                error
            );

            showDatabaseError();

        }

    }


    /* =====================================================
       RENDER PLAYERS
       ===================================================== */

    function renderPlayers(list) {

        grid.innerHTML = "";

        resultCount.textContent =
            `${list.length} ${
                list.length === 1
                    ? "RESULT"
                    : "RESULTS"
            }`;


        if (list.length === 0) {

            grid.innerHTML = `
                <div class="empty-state">

                    <strong>
                        NO PLAYERS FOUND
                    </strong>

                    <span>
                        Try changing your search or filters.
                    </span>

                </div>
            `;

            return;
        }


        list.forEach(player => {

            grid.appendChild(
                createPlayerCard(player)
            );

        });

    }


    /* =====================================================
       PLAYER CARD
       ===================================================== */

    function createPlayerCard(player) {

        const card =
            document.createElement("article");

        card.className = "player-card";


        card.innerHTML = `

            <div class="card-top">

                <div>

                    <div class="card-version">
                        ${escapeHTML(player.version)}
                    </div>

                    <div class="card-position">
                        ${escapeHTML(player.position)}
                    </div>

                </div>

                <div class="card-rating">
                    ${player.ovr}
                </div>

            </div>


            <div class="card-name">
                ${escapeHTML(player.name)}
            </div>


            <div class="card-nation">
                ${escapeHTML(player.nation)}
            </div>


            <div class="card-stats">

                ${createStat("PAC", player.pac)}
                ${createStat("SHO", player.sho)}
                ${createStat("PAS", player.pas)}
                ${createStat("DRI", player.dri)}
                ${createStat("DEF", player.def)}
                ${createStat("PHY", player.phy)}

            </div>

        `;


        card.addEventListener(
            "click",
            () => showPlayerDetails(player)
        );


        return card;

    }


    /* =====================================================
       STAT
       ===================================================== */

    function createStat(label, value) {

        return `

            <div class="card-stat">

                <strong>
                    ${value}
                </strong>

                <small>
                    ${label}
                </small>

            </div>

        `;

    }


    /* =====================================================
       SEARCH + FILTERS
       ===================================================== */

    function filterPlayers() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const selectedOvr =
            ovrFilter.value;


        const selectedPosition =
            positionFilter.value;


        const selectedVersion =
            versionFilter.value;


        const filtered =
            players.filter(player => {


                /* Search */

                const searchableText = [

                    player.name,
                    player.nation,
                    player.position,
                    player.perk,
                    player.version

                ]
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchableText.includes(search);


                /* OVR */

                let matchesOvr = true;


                if (selectedOvr) {

                    matchesOvr =
                        player.ovr >=
                        Number(selectedOvr);

                }


                /* Position */

                const matchesPosition =
                    !selectedPosition ||
                    player.position ===
                    selectedPosition;


                /* Card version */

                const matchesVersion =
                    !selectedVersion ||
                    player.version ===
                    selectedVersion;


                return (
                    matchesSearch &&
                    matchesOvr &&
                    matchesPosition &&
                    matchesVersion
                );

            });


        renderPlayers(filtered);

    }


    /* =====================================================
       PLAYER DETAILS
       ===================================================== */

    function showPlayerDetails(player) {

        alert(

            `${player.name}\n\n` +

            `OVR: ${player.ovr}\n` +
            `Position: ${player.position}\n` +
            `Nation: ${player.nation}\n` +
            `Card: ${player.version}\n\n` +

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
       DATABASE ERROR
       ===================================================== */

    function showDatabaseError() {

        resultCount.textContent =
            "DATABASE ERROR";


        grid.innerHTML = `

            <div class="empty-state">

                <strong>
                    DATABASE UNAVAILABLE
                </strong>

                <span>
                    Please try again later.
                </span>

            </div>

        `;

    }


    /* =====================================================
       HTML SAFETY
       ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       EVENT LISTENERS
       ===================================================== */

    searchInput.addEventListener(
        "input",
        filterPlayers
    );


    ovrFilter.addEventListener(
        "change",
        filterPlayers
    );


    positionFilter.addEventListener(
        "change",
        filterPlayers
    );


    versionFilter.addEventListener(
        "change",
        filterPlayers
    );


    /* =====================================================
       START
       ===================================================== */

    loadDatabase();

});
