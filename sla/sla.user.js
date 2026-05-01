// ==UserScript==
// @name         Vitor Praxio Scripts
// @namespace    https://portaldocliente.praxio.com.br
// @version      2.0
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
    // Adiciona estilos à página  // Adciona os elementos necessários à página
    addStyles()
    createElements()

    // coloca na tabela os dados do local storage
    const hasData = updateSlaFromLocalStorage()

    // se passados 10 minutos desde a última atualização, busca os dados novamente
    if(verifyLastUpdate(minutes) || hasData == false){
        await updateSLA()
    }
})();


// atualizar tabela quando houver chamadas de rede para os endpoints de pesquisa de tickets
(function interceptNetwork() {

    const TARGET_URLS = [
        "/Ticket/PesquisaPartial"
    ]

    function matchUrl(url) {
        return typeof url === "string" &&
            TARGET_URLS.some(endpoint => url.includes(endpoint))
    }

    function onMatch() {
        // setTimeout(() => {
            updateSlaFromLocalStorage()
        // }, 1500)
    }

    /* ================= FETCH ================= */
    const originalFetch = window.fetch

    window.fetch = async function (...args) {
        const url = args[0]

        if (matchUrl(url)) {
            onMatch()
        }

        return originalFetch.apply(this, args)
    }

    /* ================= XHR ================= */
    const originalOpen = XMLHttpRequest.prototype.open

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        if (matchUrl(url)) {
            onMatch()
        }

        return originalOpen.call(this, method, url, ...rest)
    }

})();