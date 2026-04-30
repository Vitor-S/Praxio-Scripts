// ==UserScript==
// @name         Vitor Praxio Scripts
// @namespace    https://portaldocliente.praxio.com.br
// @version      1.3.2
// @description  Script para o portal do cliente praxio
// @author       Vitor
// @match        https://portaldocliente.praxio.com.br/Ticket*
// @require      https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendElements.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/appendStyles.js
// @require      https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/functions.js
// @updateURL    https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @downloadURL  https://raw.githubusercontent.com/Vitor-S/Praxio-Scripts/main/sla/sla.user.js
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

(async function () {
    'use strict'

    addStyles()
    createElements()
    getSlaColumnIndex()

    const button = document.createElement("button")
    button.innerText = "teste"
    button.addEventListener('click', () => {
        invokeToast("A merda do seu time resolveu ganhar hoje. Parabéns!", "check")
    })

    document.querySelector(".page-header").appendChild(button)
})();