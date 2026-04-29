// ==UserScript==
// @name         Vitor Praxio Scripts
// @namespace    https://portaldocliente.praxio.com.br
// @version      1.0
// @description  Script para o portal do cliente praxio
// @author       Vitor
// @match        https://portaldocliente.praxio.com.br/Ticket*
// @require      https://github.com/Vitor-S/Praxio-Scripts/raw/refs/heads/main/sla/appendElements.js
// @updateURL    https://github.com/Vitor-S/Praxio-Scripts/raw/refs/heads/main/sla/sla.user.js
// @downloadURL  https://github.com/Vitor-S/Praxio-Scripts/raw/refs/heads/main/sla/sla.user.js
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

(async function () {
    'use strict'

    createLoadingScreen()
})();