// ==UserScript==
// @name         Vitor Praxio Scripts
// @namespace    https://portaldocliente.praxio.com.br
// @version      1.2
// @description  Script para o portal do cliente praxio
// @author       Vitor
// @match        https://portaldocliente.praxio.com.br/Ticket*
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendElements.js
// @updateURL    https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @downloadURL  https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

(async function () {
    'use strict'

    createLoadingScreen()
})();