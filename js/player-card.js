/* =========================================================
   UFMB — SHARED PLAYER CARD SYSTEM
   V1
   ========================================================= */


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeUFMBHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   STAT
   ========================================================= */

function createUFMBStat(label, value) {
    return `
        <div class="card-stat">
            <strong>${escapeUFMBHTML(value)}</strong>
            <small>${escapeUFMBHTML(label)}</small>
        </div>
    `;
}


/* =========================================================
   PLAYER CARD
   ========================================================= */

function createUFMBPlayerCard(player) {

    const card = document.createElement("article");

    card.className = "player-card";

    card.tabIndex = 0;

    card.setAttribute(
        "aria-label",
        `${player.name}, ${player.ovr} OVR`
    );

    card.innerHTML = `
        <div class="card-top">

            <div>
                <div class="card-version">
                    ${escapeUFMBHTML(player.version)}
                </div>

                <div class="card-position">
                    ${escapeUFMBHTML(player.position)}
                </div>
            </div>

            <div class="card-rating">
                ${escapeUFMBHTML(player.ovr)}
            </div>

        </div>


        <div class="card-name">
            ${escapeUFMBHTML(player.name)}
        </div>


        <div class="card-nation">
            ${escapeUFMBHTML(player.nation)}
        </div>


        <div class="card-stats">

            ${createUFMBStat("PAC", player.pac)}
            ${createUFMBStat("SHO", player.sho)}
            ${createUFMBStat("PAS", player.pas)}
            ${createUFMBStat("DRI", player.dri)}
            ${createUFMBStat("DEF", player.def)}
            ${createUFMBStat("PHY", player.phy)}

        </div>
    `;


    card.addEventListener("click", () => {
        showUFMBPlayerDetails(player);
    });


    card.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();

            showUFMBPlayerDetails(player);
        }

    });


    return card;
}


/* =========================================================
   PLAYER MODAL
   ========================================================= */

function showUFMBPlayerDetails(player) {

    const modal = document.getElementById("playerModal");

    if (!modal) {
        return;
    }


    modal.innerHTML = `
        <div class="modal-content" role="dialog" aria-modal="true">

            <button
                class="modal-close"
                type="button"
                aria-label="Close"
                onclick="closeUFMBPlayerDetails()"
            >
                ×
            </button>


            <div class="modal-header">

                <div class="modal-version">
                    ${escapeUFMBHTML(player.version)}
                </div>

                <div class="modal-name">
                    ${escapeUFMBHTML(player.name)}
                </div>

                <div class="modal-meta">
                    ${escapeUFMBHTML(player.position)}
                    ·
                    ${escapeUFMBHTML(player.nation)}
                    ·
                    ${escapeUFMBHTML(player.ovr)} OVR
                </div>

            </div>


            <div class="modal-stats">

                <div class="modal-stat">
                    <strong>${escapeUFMBHTML(player.pac)}</strong>
                    <span>PAC</span>
                </div>

                <div class="modal-stat">
                    <strong>${escapeUFMBHTML(player.sho)}</strong>
                    <span>SHO</span>
                </div>

                <div class="modal-stat">
                    <strong>${escapeUFMBHTML(player.pas)}</strong>
                    <span>PAS</span>
                </div>

                <div class="modal-stat">
                    <strong>${escapeUFMBHTML(player.dri)}</strong>
                    <span>DRI</span>
                </div>

                <div class="modal-stat">
                    <strong>${escapeUFMBHTML(player.def)}</strong>
                    <span>DEF</span>
                </div>

                <div class="modal-stat">
                    <strong>${escapeUFMBHTML(player.phy)}</strong>
                    <span>PHY</span>
                </div>

            </div>


            <div class="modal-perk">

                <span>PERK</span>

                <strong>
                    ${escapeUFMBHTML(player.perk || "—")}
                </strong>

            </div>

        </div>
    `;


    modal.hidden = false;

    document.body.style.overflow = "hidden";


    modal.onclick = (event) => {

        if (event.target === modal) {
            closeUFMBPlayerDetails();
        }

    };
}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeUFMBPlayerDetails() {

    const modal = document.getElementById("playerModal");

    if (!modal) {
        return;
    }

    modal.hidden = true;

    modal.innerHTML = "";

    document.body.style.overflow = "";
}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeUFMBPlayerDetails();
    }

});
