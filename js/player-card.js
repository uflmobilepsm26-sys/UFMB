/* =========================================================
   UFMB — SHARED PLAYER CARD
   One card system for Home, Database & Latest
   ========================================================= */

function createUFMBPlayerCard(player) {

    const card = document.createElement("article");

    card.className = "player-card";

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
                ${player.ovr}
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

    return card;
}


/* =========================================================
   STAT
   ========================================================= */

function createUFMBStat(label, value) {

    return `
        <div class="card-stat">
            <strong>${value}</strong>
            <small>${label}</small>
        </div>
    `;
}


/* =========================================================
   PLAYER DETAILS
   ========================================================= */

function showUFMBPlayerDetails(player) {

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


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeUFMBHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

                             }
