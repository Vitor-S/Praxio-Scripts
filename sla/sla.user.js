// ==UserScript==
// @name         Vitor Praxio Scripts
// @namespace    https://portaldocliente.praxio.com.br
// @version      1.3.2
// @description  Script para o portal do cliente praxio
// @author       Vitor
// @match        https://portaldocliente.praxio.com.br/Ticket*
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendElements.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendStyles.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/functions.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/slaFunctions.js
// @updateURL    https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @downloadURL  https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

(async function () {
    'use strict'

    // Adiciona estilos à página
    addStyles()

    // Adciona os elementos necessários à página
    createElements()
    invokeToast("Buscando dados de SLA, por favor aguarde...", "warning", 1000)
    await handleSLA()
})();