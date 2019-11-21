'use strict'
const saveAndContinue = () => {
    let parameters = getParameters();
    let date = new Date();
    date.setDate(date.getDate() + parameters.date);
    document.cookie = `DWP_allow_essential_cookies=true; expires= ${date}`;
    setAdvertisingCookie(date);
    setAnalyticCookie(date);
    closePage();
}

const setAdvertisingCookie = date => {
    if (document.getElementById(`advertising-yes`).checked) {
        document.cookie = `DWP_allow_advertising_cookies=true; expires= ${date}`;
    } else {
        document.cookie = `DWP_allow_advertising_cookies=false; expires= ${date}`;
    }
}

const setAnalyticCookie = date => {
    if (document.getElementById(`analytic-yes`).checked) {
        document.cookie = `DWP_allow_analytic_cookies=true; expires= ${date}`;
    } else {
        document.cookie = `DWP_allow_analytic_cookies=false; expires= ${date}`;
    }
}

const closePage = () => {
    window.history.back()
};

const findExistingCookies = () => {
    const analytic_true = `DWP_allow_analytic_cookies=true`;
    const advertising_true = `DWP_allow_advertising_cookies=true`;
    const analytic_false = `DWP_allow_analytic_cookies=false`;
    const advertising_false = `DWP_allow_advertising_cookies=false`;
    let cookies = document.cookie.split(`;`);
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie === advertising_true) {
            document.getElementById(`advertising-yes`).checked = true;
        } else if (cookie === advertising_false) {
            document.getElementById(`advertising-no`).checked = true;
        }
        if (cookie === analytic_true) {
            document.getElementById(`analytic-yes`).checked = true;
        } else if (cookie === analytic_false) {
            document.getElementById(`analytic-no`).checked = true;
        }
    }
};

const dismissBanner = () => {
    if (document.getElementById("cookie-banner") !== null) {
        document.getElementById("cookie-banner").remove();
    }
}

const changeCookies = () => {
    goToCookiesPage();
}

const showBanner = () => {
    let banner = `<div id="cookie-banner" style="background-color:white;color:green;padding:10px 200px; border:1px solid black;">`;
    banner += `<h2 style="text-align: center">About your cookies.</h2>`;
    banner += `<p>`
    banner += `<span style="margin-right:20px">Your cookies are set as follows: </span>`
    banner += `<span style="margin-right:60px">Essential cookies: Allowed.</span>`;
    banner += `<span style="margin-right:60px">Analytic cookies: Allowed.</span>`;
    banner += `<span>Advertising cookies: Allowed.</span></p>`;
    banner += `<p>Do you wish to change your cookie permissions?`;
    banner += `<button id="change-cookie-permissions" aria-label="Change" onclick="changeCookies()"`;
    banner += ` style="background:white; font-size: 110%;margin-left:20px; color:green; border:2px solid green; padding: 10px;"`
    banner += `>`;
    banner += `Yes: change settings`;
    banner += `</button>`
    banner += `<button id="change-cookie-permissions" aria-label="Change" onclick="dismissBanner()"`;
    banner += ` style="background:white; font-size: 110%;margin-left:20px; color:green; border:2px solid green; padding: 10px;"`
    banner += `>`;
    banner += `No: carry on`;
    banner += `</button>`
    banner += `</p>`;
    banner += `</div>`;
    document.body.innerHTML = banner + document.body.innerHTML;
}

const goToCookiesPage = (retention) => {
    window.open(`consent.html`, `_self`);
    let date = new Date();
    date.setDate(date.getDate() + retention);
    findExistingCookies();
    dismissBanner();
}

const getParameters = () => {
    let parameters = { retention: 28, cookiesPage: `https://www.gov.uk/help/cookie-details` };
    let parms = document.getElementsByClassName(`dwp-consent`);
    if (parms > 0) {
        let _class = parms[0].getAttribute(`class`);
        let cookiesPage = parms[0].getAttribute(`cookiesPage`);
        if (cookiesPage) {
            parameters.cookiesPage = cookiesPage
        }
        parameters.retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;
    }
    return parameters;
}

window.onload = () => {
    let parameters = getParameters();
    let { retention, cookiesPage } = parameters;
    let date = new Date();
    date.setDate(date.getDate() + retention);
    let cookiesExist = false;
    let cookies = document.cookie.split(`;`);
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, 3) === 'DWP') {
            cookiesExist = true;
        }
    }
    if (!cookiesExist) {
        document.cookie = `DWP_cookies_page=${parameters.cookiesPage}`
        goToCookiesPage();
    } else {
        showBanner();
    }
};