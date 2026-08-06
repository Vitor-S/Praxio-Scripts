// ==UserScript==
// @name         Vitor Praxio Scripts
// @namespace    https://portaldocliente.praxio.com.br
// @version      2.0
// @description  Script para o portal do cliente praxio
// @author       Vitor
// @match        https://portaldocliente.praxio.com.br/Ticket*
// @require      https://unpkg.com/mammoth/mammoth.browser.min.js
// @require      https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendElements.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/documents.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendStyles.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/functions.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/slaFunctions.js
// @updateURL    https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @downloadURL  https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

function createElements() {
    createLoadingScreen()
    createToast()
}

(async function () {
    'use strict'

    if (window.location.pathname.startsWith("/Ticket/TicketPrincipal/")) {
        createImagesView()
        setShortcuts()
        return
    }
    addStyles()
    createElements()
})();



