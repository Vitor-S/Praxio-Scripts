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

    addStyles()
    createElements()
    
    const slaColumnIndex = getSlaColumnIndex()

    const res = await getSlaTicketList(['911448', '853766'], 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWVzIjpbeyJrZXkiOiJBU1AuTkVUX1Nlc3Npb25JZCIsInZhbHVlIjoidTJlYWJsZm5kcm0xeHJzazRsbTBkemZqIiwiZG9tYWluIjoicG9ydGFsZG9jbGllbnRlLnByYXhpby5jb20uYnIiLCJwYXRoIjoiLyIsImh0dHBPbmx5Ijp0cnVlLCJob3N0T25seSI6dHJ1ZSwiY3JlYXRpb24iOiIyMDI2LTA0LTMwVDA0OjI5OjExLjY5M1oiLCJsYXN0QWNjZXNzZWQiOiIyMDI2LTA0LTMwVDA0OjI5OjE0LjAzM1oiLCJzYW1lU2l0ZSI6ImxheCJ9LHsia2V5IjoiLkFTUFhBVVRIIiwidmFsdWUiOiJFQTVDRTM5RjFBOTIzQzNEQzBCQkYzRjM1MEQ4QzYwOTlBMThDNjcxRTM5MTk3ODk4MTk5NjU5QTQxRjg0OERFNTBFQzdFRDIzQTZGOUE2RDdBMjQxNUFDNDNCMkM4NTFDMTQ1OEE2M0NDRTg5Q0IxMTczMTU5RTdFQzAyRDAyRDQwRjY0NkNDRTgyMkI2NjQ4M0FBQzREODg3RjA4M0Q4NEJFNDQ0MzJFNDhBMTUzREFDNDZDMzNEQkE0NDYyRkREMDY3MTVGNUM5RERGRkUyRTE2OTVEQ0RFQ0Q5QzVGQ0E4RTFGREIxMzgxNEQ0QTU3REE3QkQ3ODZGNTRDNzk3IiwiZG9tYWluIjoicG9ydGFsZG9jbGllbnRlLnByYXhpby5jb20uYnIiLCJwYXRoIjoiLyIsImh0dHBPbmx5Ijp0cnVlLCJob3N0T25seSI6dHJ1ZSwiY3JlYXRpb24iOiIyMDI2LTA0LTMwVDA0OjI5OjExLjY5M1oiLCJsYXN0QWNjZXNzZWQiOiIyMDI2LTA0LTMwVDA0OjI5OjE0LjAzM1oiLCJzYW1lU2l0ZSI6ImxheCJ9XSwiaWF0IjoxNzc3NTIzMzU0LCJleHAiOjE3Nzc1Mzc3NTR9.gdD0OBHNo8dtSlnQ2tMZBjFkjKNkptPxIT-Cj5Nkw_U')
})();