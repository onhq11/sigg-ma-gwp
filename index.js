// ==UserScript==
// @name         Skibidi Sigma Male Script
// @namespace    http://tampermonkey.net/
// @version      2024-10-29
// @description  Wygrywamy to tak o, tylko trzeba ogarnąć 500zł dniówki
// @author       onhq11
// @match        https://sigg.gpw.pl/market-quote/stock
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gpw.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("click", (event) => {
        document.querySelectorAll(".trade-view").forEach((item) => {
            if(item.querySelectorAll("td").length <= 1) {
                const td = document.createElement("td")
                td.setAttribute("colSpan", "3")
                td.style.transform = "scale(0.9)"
                td.innerHTML = iframeBody
                item.appendChild(td)

                item.querySelector("td").setAttribute("colSpan", "8")

                const iframe = document.getElementById("the-blackest-iframe")

                iframe.addEventListener("load", (event) => {
                   const iframeRef = iframe.contentDocument || iframe.contentWindow.document
                   const isAcceptPhase = iframeRef.querySelector(".gpw-list__item")
                   const isSuccessPhase = iframeRef.querySelector("body > div.highlight.box-size.mini.my-4 > div > div > div > a")

                   iframeRef.querySelector("header").remove()
                   iframeRef.querySelector(".container.pt-4.pb-4").remove()

                   const nigger = isAcceptPhase ? iframeRef.querySelector("body > div.highlight.box-size.mini.my-4 > form") : iframeRef.querySelector("#main-container > div > div > div:nth-child(2) > div > div > form")

                   iframeRef.querySelector("body > div.highlight.box-size.mini.my-4").remove()
                   iframeRef.querySelector("body > div.container").remove()
                   iframeRef.querySelector("body > footer").remove()

                   if(!isSuccessPhase) {
                       iframeRef.body.appendChild(nigger)
                   }

                   if(!isAcceptPhase && !isSuccessPhase) {
                       iframeRef.querySelector("h4").remove()

                       iframeRef.querySelector('form[name="formSellBuy-buy"]').querySelector('select[name="exchangeOrderType"]').value = "PKC"
                       iframeRef.querySelector('form[name="formSellBuy-buy"]').querySelector('select[name="exchangeOrderInstrumentId"]').value = item.previousElementSibling.id.split("_")[1]
                   }

                   if(isSuccessPhase) {
                       const thereIsClassReally = document.createElement("h2")
                       thereIsClassReally.innerHTML = "Jest klasa naprawde :)"

                       iframeRef.body.append(thereIsClassReally)

                       setTimeout(() => {
                           iframe.style.opacity = '0'
                           iframeRef.location.href = "https://sigg.gpw.pl/exchange-order/action"
                       }, 500)
                   }

                   iframe.style.opacity = '1'

                   if(iframeRef.querySelector('form[name="formSellBuy-buy"]')) {
                       iframeRef.querySelector('form[name="formSellBuy-buy"]').addEventListener("submit", (event) => {
                           iframe.style.opacity = '0'
                       })
                       return
                   }

                   iframeRef.querySelectorAll('form')[2].addEventListener("submit", (event) => {
                       iframe.style.opacity = '0'
                   })
                })
            }
        })
    })
})();

const iframeBody = `<iframe id="the-blackest-iframe" src="https://sigg.gpw.pl/exchange-order/action" height="500px" width="100%" style="border: none; opacity: 0"></iframe>`