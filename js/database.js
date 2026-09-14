/* =========================================================
   UFMB — DATABASE ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("databaseGrid");
    const resultCount = document.getElementById("resultCount");

    const searchInput = document.getElementById("searchInput");
    const ovrFilter = document.getElementById("ovrFilter");
    const positionFilter = document.getElementById("positionFilter");
    const versionFilter = document.getElementById("versionFilter");


    /* =====================================================
       DATABASE
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
       RENDER DATABASE
       ===================================================== */

    function renderPlayers(list) {

        grid.innerHTML = "";

        resultCount.textContent =
            `${list.length} ${list.length === 1 ? "RESULT" : "RESULTS"}`;


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

            const card = createPlayerCard(player);

            grid.appendChild(card);

        });

    }


    /* =====================================================
       CREATE PLAYER CARD
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

                ${createStat("PAC", player.pac)}
                ${createStat("SHO", player.sho)}
                ${createStat("PAS", player.pas)}
                ${createStat("DRI", player.dri)}
                ${createStat("DEF", player.def)}
                ${createStat("PHY", player.phy)}

            </div>

        `;


        card.addEventListener("click", () => {

            showPlayerDetails(player);

        });


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
       SEARCH + FILTER
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

                const matchesSearch =
                    !search ||

                    player.name
                        .toLowerCase()
                        .includes(search) ||

                    player.nation
                        .toLowerCase()
                        .includes(search) ||

                    player.position
                        .toLowerCase()
                        .includes(search) ||

                    player.perk
                        .toLowerCase()
                        .includes(search);


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


                /* Card Version */

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
       INITIAL LOAD
       ===================================================== */

    renderPlayers(players);

});
