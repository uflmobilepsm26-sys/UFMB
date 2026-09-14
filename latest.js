/* =========================================================
   UFMB — LATEST CARDS
   V1
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    if (document.body.dataset.page !== "latest") {
        return;
    }

    initLatest();

});


/* =========================================================
   INIT
   ========================================================= */

async function initLatest() {

    const grid =
        document.getElementById("latestGrid");

    const count =
        document.getElementById("latestCount");


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


        const players =
            await response.json();


        if (!Array.isArray(players)) {
            throw new Error(
                "Invalid players.json format."
            );
        }


        if (count) {

            count.textContent =
                `${players.length.toLocaleString()} cards in database`;

        }


        grid.innerHTML = "";


        if (players.length === 0) {

            grid.innerHTML = `
                <div class="loading-box">
                    No cards available yet.
                </div>
            `;

            return;
        }


        players.forEach((player) => {

            grid.appendChild(
                createUFMBPlayerCard(player)
            );

        });

    } catch (error) {

        console.error(
            "UFMB Latest error:",
            error
        );


        if (count) {
            count.textContent =
                "Unable to load cards";
        }


        grid.innerHTML = `
            <div class="error-box">
                Unable to load latest cards.
            </div>
        `;

    }

}
