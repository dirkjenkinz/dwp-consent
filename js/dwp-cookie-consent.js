'use strict'
const saveAndContinue = () => {
    let { expiry_date, advertising_question } = getCookies();
    document.cookie = `DWP_allow_essential_cookies=true; expires= ${expiry_date}`;
    if (advertising_question) {
        setAdvertisingCookie(expiry_date);
    };
    setAnalyticCookie(expiry_date);
    closePage();
}

const setAdvertisingCookie = date => {
    if (document.getElementById(`advertising-yes`).checked) {
        document.cookie = `DWP_allow_advertising_cookies=true; expires=${date}`;
    } else {
        document.cookie = `DWP_allow_advertising_cookies=false; expires=${date}`;
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
    window.history.back();
};

const getParameters = () => {
    let parameters = {
        retention: 28,
        cookiesPage: `https://www.gov.uk/help/cookie-details`,
        welsh: false,
        advertising_question: false,
        force: false
    };
    let parms = document.getElementsByClassName(`dwp-consent`);
    if (parms.length > 0) {
        let _class = parms[0].getAttribute(`class`);

        let cookiesPage = parms[0].getAttribute(`dwp-consent-cookies-page`);
        if (cookiesPage) {
            parameters.cookiesPage = cookiesPage
        }

        parameters.retention = parseInt(parms[0].getAttribute(`dwp-consent-retention-period`)) || 28;
        
        if (_class.includes('dwp-consent-welsh')) {
            parameters.welsh = true;
        }
        if (_class.includes('dwp-consent-advertising')) {
            parameters.advertising_question = true;
        }
        if (_class.includes('dwp-consent-force')) {
            parameters.force = true;
        }
    }
    return parameters;
}

const getCookies = () => {
    let cookieDetails = {
        landed: false,
        expiry_date: 28,
        advertising_question: false,
        welsh: false,
        cookies_page: `https://www.gov.uk/help/cookie-details`,
        allow_advertising_cookies: false,
        allow_analytic_cookies: false
    }

    let cookies = document.cookie.split(`;`);
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim().split(`=`);
        if (cookie[0] === `DWP_landed`){
            cookieDetails.landed = true;
        } else if (cookie[0] === `DWP_allow_analytic_cookies` && cookie[1] === 'true') {
            cookieDetails.allow_analytic_cookies = true;
        } else if (cookie[0] === `DWP_allow_advertising_cookies` && cookie[1] === 'true') {
            cookieDetails.allow_advertising_cookies = true;
        } else if (cookie[0] === `DWP_expiry_date`) {
            cookieDetails.expiry_date = cookie[1];
        } else if (cookie[0] === `DWP_advertising_question` && cookie[1] === 'true') {
            cookieDetails.advertising_question = true;
        } else if (cookie[0] === `DWP_welsh` && cookie[1] === 'true') {
            cookieDetails.welsh = true;
        } else if (cookie[0] === `DWP_cookies_page`) {
            cookieDetails.cookies_page = cookie[1];
        }
    }
    return cookieDetails;
};

const dismissBanner = () => {
    if (document.getElementById("cookie-banner") !== null) {
        document.getElementById("cookie-banner").remove();
    }
}

const changeCookies = () => {
    goToCookiesPage();
}

const showBanner = (advertising_question) => {
    let { allow_analytic_cookies, allow_advertising_cookies } = getCookies();
    let banner = `<div id="cookie-banner" style="background-color:white;color:green;padding:10px 200px; border:1px solid black;">`;
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

const showWelshBanner = (advertising_question) => {
    let { allow_analytic_cookies, allow_advertising_cookies } = getCookies();
    let banner = `<div id="cookie-banner" style="background-color:white;color:green;padding:10px 100px; border:1px solid black;">`;
    banner += `<h2 style="text-align: center">Ynglŷn â'ch cwcis.</h2>`;
    banner += `<p>`
    banner += `<span style="margin-right:20px">Mae eich cwcis wedi'u gosod fel a ganlyn: </span>`
    banner += `<span style="margin-right:60px">Cwcis hanfodol: caniateir.</span>`;
    if (allow_analytic_cookies) {
        banner += `<span style="margin-right:60px">Cwcis dadansoddol: caniateir.</span>`;
    } else {
        banner += `<span style="margin-right:60px">Cwcis dadansoddol: Wedi'i wrthod.</span>`;
    };
    if (advertising_question) {
        if (allow_advertising_cookies) {
            banner += `<span>Advertising cookies: Allowed.</span></p>`;
        } else {
            banner += `<span>Advertising cookies: Disallowed.</span></p>`;
        };
    };
    banner += `<p>Ydych chi am newid eich caniatâd cwci?`;
    banner += `<button id="change-cookie-permissions" aria-label="Change" onclick="changeCookies()"`;
    banner += ` style="background:white; font-size: 110%;margin-left:20px; color:green; border:2px solid green; padding: 10px;"`
    banner += `>`;
    banner += `Ydw: newid gosodiadau`;
    banner += `</button>`
    banner += `<button id="change-cookie-permissions" aria-label="Change" onclick="dismissBanner()"`;
    banner += ` style="background:white; font-size: 110%;margin-left:20px; color:green; border:2px solid green; padding: 10px;"`
    banner += `>`;
    banner += `Na: cario ymlaen`;
    banner += `</button>`
    banner += `</p>`;
    banner += `</div>`;
    document.body.innerHTML = banner + document.body.innerHTML;
}

const goToCookiesPage = () => {
    let { welsh } = getParameters();
    if (welsh) {
        window.open(`../pages/welsh-consent.html`, `_self`);
    } else {
        window.open(`../pages/consent.html`, `_self`);
    }
    dismissBanner();
}

window.onload = () => {
    let { retention, cookiesPage, welsh, advertising_question, force } = getParameters();
    let {landed} = getCookies();
    console.log(landed, force)
    if (!landed || force) {
      console.log('1.')
        let date = new Date();
        document.cookie = `DWP_landed=${date}`;
        date.setDate(date.getDate() + retention);
        let cookiesExist = false;
        let cookies = document.cookie.split(`;`);
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, 3) === 'DWP') {
                cookiesExist = true;
            }
        }
        document.cookie = `DWP_expiry_date=${date}`;
        document.cookie = `DWP_cookies_page=${cookiesPage}`;
        document.cookie = `DWP_welsh=${welsh}`;
        document.cookie = `DWP_advertising_question=${advertising_question}`;
        if (!cookiesExist) {
            goToCookiesPage();
        } else {
            if (welsh) {
                showWelshBanner(advertising_question);
            } else {
                showBanner(advertising_question);
            };
        }
    }
};


////////////////////////////
// consent page controls //
///////////////////////////
const initialiseConsentPage = () => {
    let {
        welsh,
        advertising_question,
        cookies_page,
        allow_advertising_cookies,
        allow_analytic_cookies
    } = getCookies();

    if (advertising_question) {
        buildAdvertising(welsh);
        if (allow_advertising_cookies) {
            document.getElementById('advertising-yes').checked = true;
        } else {
            document.getElementById('advertising-no').checked = true;
        }
    }

    if (allow_analytic_cookies) {
        document.getElementById('analytic-yes').checked = true;
    } else {
        document.getElementById('analytic-no').checked = true;
    }

    let cookiesPageText = `<a href="${cookies_page}" target="_blank" rel="noreferrer noopener" title="Go to our cookies information page">Cookies page</a>.`
    document.getElementById(`cookies-page`).innerHTML = cookiesPageText;
}

const buildAdvertising = (welsh) => {
    let advertising = `<h3 class="govuk-heading-m">Advertising cookies</h3>
                    <p>Sometimes we may use cookies that help us with our communications and marketing.</p>
                    <div class="govuk-form-group">
                        <fieldset class="govuk-fieldset">
                            <legend class="govuk-fieldset__legend govuk-fieldset__legend--s">
                                <h1 class="govuk-fieldset__heading">Can we use cookies to help us with our communications and marketing?
                                </h1>
                            </legend>
                            <div class="govuk-radios govuk-radios--inline">
                                <div class="govuk-radios__item">
                                    <input class="govuk-radios__input" id="advertising-yes" name="advertising" type="radio" value="yes">
                                    <label class="govuk-label govuk-radios__label" for="advertising-yes">Yes</label>
                                </div>
                                <div class="govuk-radios__item">
                                    <input class="govuk-radios__input" id="advertising-no" name="advertising" type="radio" value="no">
                                    <label class="govuk-label govuk-radios__label" for="advertising-no">No</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>`;


    if (welsh) {
        advertising = `<h3 class="govuk-heading-m">Cwcis hysbysebu</h3>
                             <p>Weithiau efallai y byddwn yn defnyddio cwcis sy'n ein helpu gyda'n cyfathrebu a'n marchnata.</p>
                             <div class="govuk-form-group">
                               <fieldset class="govuk-fieldset">
                                 <legend class="govuk-fieldset__legend govuk-fieldset__legend--s">
                                   <h1 class="govuk-fieldset__heading">A allwn ddefnyddio cwcis i'n helpu gyda'n cyfathrebu a'n marchnata?
                                   </h1>
                                 </legend>
                                 <div class="govuk-radios govuk-radios--inline">
                                   <div class="govuk-radios__item">
                                     <input class="govuk-radios__input" id="advertising-yes" name="advertising" type="radio" value="yes">
                                     <label class="govuk-label govuk-radios__label" for="advertising-yes">Ie</label>
                                   </div>
                                   <div class="govuk-radios__item">
                                     <input class="govuk-radios__input" id="advertising-no" name="advertising" type="radio" value="no">
                                     <label class="govuk-label govuk-radios__label" for="advertising-no">Na</label>
                                   </div>
                                 </div>
                               </fieldset>
                             </div>`
    }

    document.getElementById(`advertising`).innerHTML = advertising;
}
