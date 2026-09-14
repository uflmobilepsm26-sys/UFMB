/* =========================================================
   UFMB — DATABASE
   V1
   ========================================================= */

let ufmbPlayers = [];


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (document.body.dataset.page !== "database") {
        return;
    }

    initDatabase();

});


/* =========================================================
   DATABASE INIT
   ========================================================= */

async function initDatabase() {

    const grid =
        document.getElementById("databaseGrid");

    const searchInput =
        document.getElementById("searchInput");

    const ovrFilter =
        document.getElementById("ovrFilter");

    const positionFilter =
        document.getElementById("positionFilter");

    const versionFilter =
        document.getElementById("versionFilter");


    if (!grid) {
        return;
    }


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


        ufmbPlayers = await response.json();


        if (!Array.isArray(ufmbPlayers)) {
            throw new Error(
                "Invalid database format."
            );
        }


        populateFilters();


        const render = () => {
            renderDatabase();
        };


        searchInput?.addEventListener(
            "input",
            render
        );


        ovrFilter?.addEventListener(
            "change",
            render
        );


        positionFilter?.addEventListener(
            "change",
            render
        );


        versionFilter?.addEventListener(
            "change",
            render
        );


        render();

    } catch (error) {

        console.error(
            "UFMB Database error:",
            error
        );


        grid.innerHTML = `
            <div class="error-box">
                Unable to load the database.
            </div>
        `;


        updateResultCount(0);

    }

}


/* =========================================================
   FILTER OPTIONS
   ========================================================= */

function populateFilters() {

    const positionFilter =
        document.getElementById("positionFilter");

    const versionFilter =
        document.getElementById("versionFilter");


    if (positionFilter) {

        const positions =
            [...new Set(
                ufmbPlayers
                    .map(player => player.position)
                    .filter(Boolean)
            )]
            .sort();


        positions.forEach((position) => {

            const option =
                document.createElement("option");

            option.value = position;
            option.textContent = position;

            positionFilter.appendChild(option);

        });

    }


    if (versionFilter) {

        const versions =
            [...new Set(
                ufmbPlayers
                    .map(player => player.version)
                    .filter(Boolean)
            )]
            .sort();


        versions.forEach((version) => {

            const option =
                document.createElement("option");

            option.value = version;
            option.textContent = version;

            versionFilter.appendChild(option);

        });

    }

}


/* =========================================================
   RENDER
   ========================================================= */

function renderDatabase() {

    const grid =
        document.getElementById("databaseGrid");

    const searchInput =
        document.getElementById("searchInput");

    const ovrFilter =
        document.getElementById("ovrFilter");

    const positionFilter =
        document.getElementById("positionFilter");

    const versionFilter =
        document.getElementById("versionFilter");


    if (!grid) {
        return;
    }


    const search =
        (searchInput?.value || "")
            .trim()
            .toLowerCase();


    const minimumOVR =
        Number(ovrFilter?.value || 0);


    const position =
        positionFilter?.value || "";


    const version =
        versionFilter?.value || "";


    const filtered =
        ufmbPlayers.filter((player) => {

            const searchableText = [
                player.name,
                player.nation,
                player.position,
                player.perk,
                player.version
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                !search ||
                searchableText.includes(search);


            const matchesOVR =
                !minimumOVR ||
                Number(player.ovr) >= minimumOVR;


            const matchesPosition =
                !position ||
                player.position === position;


            const matchesVersion =
                !version ||
                player.version === version;


            return (
                matchesSearch &&
                matchesOVR &&
                matchesPosition &&
                matchesVersion
            );

        });


    updateResultCount(filtered.length);


    grid.innerHTML = "";


    if (filtered.length === 0) {

        grid.innerHTML = `
            <div class="loading-box">
                No players match your filters.
            </div>
        `;

        return;
    }


    filtered.forEach((player) => {

        grid.appendChild(
            createUFMBPlayerCard(player)
        );

    });

}


/* =========================================================
   RESULT COUNT
   ========================================================= */

function updateResultCount(count) {

    const resultCount =
        document.getElementById("resultCount");

    if (!resultCount) {
        return;
    }


    resultCount.textContent =
        `${count.toLocaleString()} player${count === 1 ? "" : "s"} found`;

           }
