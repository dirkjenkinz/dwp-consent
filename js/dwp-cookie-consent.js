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

const getCookies = () => {
    let cookieDetails = {
        expiry_date: 28,
        advertising_question: false,
        welsh: false,
        service: null,
        footer: false,
        cookies_page: `https://www.gov.uk/help/cookie-details`,
        allow_advertising_cookies: false,
        allow_analytic_cookies: false
    }

    let cookies = document.cookie.split(`;`);
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim().split(`=`);
        if (cookie[0] === `DWP_allow_analytic_cookies` && cookie[1] === 'true') {
            cookieDetails.allow_analytic_cookies = true;
        } else if (cookie[0] === `DWP_allow_advertising_cookies` && cookie[1] === 'true') {
            cookieDetails.allow_advertising_cookies = true;
        } else if (cookie[0] === `DWP_expiry_date`) {
            cookieDetails.expiry_date = cookie[1];
        } else if (cookie[0] === `DWP_advertising_question` && cookie[1] === 'true') {
            cookieDetails.advertising_question = true;
        } else if (cookie[0] === `DWP_welsh` && cookie[1] === 'true') {
            cookieDetails.welsh = true;
        } else if (cookie[0] === `dwp_consent_service`) {
            cookieDetails.service = cookies[1];
        } else if (cookie[0] === `dwp_consent_cookies_page`) {
            cookieDetails.cookies_page = cookies[1];
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

const showBanner = () => {
    let { allow_analytic_cookies, allow_advertising_cookies } = getCookies();
    let banner = `<div id="cookie-banner" style="background-color:white;color:green;padding:10px 200px; border:1px solid black;">`;
    banner += `<h2 style="text-align: center">About your cookies.</h2>`;
    banner += `<p>`
    banner += `<span style="margin-right:20px">Your cookies are set as follows: </span>`
    banner += `<span style="margin-right:60px">Essential cookies: Allowed.</span>`;
    if (allow_analytic_cookies) {
        banner += `<span style="margin-right:60px">Analytic cookies: Allowed.</span>`;
    } else {
        banner += `<span style="margin-right:60px">Analytic cookies: Disllowed.</span>`;
    };
    if (allow_advertising_cookies) {
        banner += `<span>Advertising cookies: Allowed.</span></p>`;
    } else {
        banner += `<span>Advertising cookies: Disallowed.</span></p>`;
    };
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

const showWelshBanner = () => {
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
    if (allow_advertising_cookies) {
        banner += `<span>Cwcis hysbysebu: caniateir.</span></p>`;
    } else {
        banner += `<span>Cwcis hysbysebu: Wedi'i wrthod.</span></p>`;
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

const getParameters = () => {
    let parameters = {
        retention: 28,
        cookiesPage: `https://www.gov.uk/help/cookie-details`,
        footer: false,
        welsh: false,
        advertising_question: false
    };
    let parms = document.getElementsByClassName(`dwp-consent`);
    if (parms.length > 0) {
        let _class = parms[0].getAttribute(`class`);
        let cookiesPage = parms[0].getAttribute(`dwp-consent-cookies-page`);
        if (cookiesPage) {
            parameters.cookiesPage = cookiesPage
        }
        parameters.retention = parseInt(parms[0].getAttribute(`dwp-consent-retention-period`)) || 28;
        parameters.serviceName = parms[0].getAttribute(`dwp-consent-service-name`) || null;
        if (_class.includes('dwp-consent-add-footer')) {
            parameters.footer = true;
        }
        if (_class.includes('dwp-consent-welsh')) {
            parameters.welsh = true;
        }
        if (_class.includes('dwp-consent-advertising')) {
            parameters.advertising_question = true;
        }
    }
    return parameters;
}

window.onload = () => {
    let { retention, cookiesPage, serviceName, footer, welsh, advertising_question } = getParameters();
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
    document.cookie = `DWP_expiry_date=${date}`;
    document.cookie = `DWP_cookies_page=${cookiesPage}`;
    document.cookie = `DWP_service=${serviceName}`;
    document.cookie = `DWP_footer=${footer}`;
    document.cookie = `DWP_welsh=${welsh}`;
    document.cookie = `DWP_advertising_question=${advertising_question}`;
    if (!cookiesExist) {
        goToCookiesPage();
    } else {
        if (welsh) {
            showWelshBanner();
        } else {
            showBanner();
        };
    }
};


////////////////////////////
// consent page controls //
///////////////////////////
const initialiseConsentPage = () => {
    let {
        welsh,
        advertising_question,
        service,
        cookies_page,
        footer,
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


    if (service !== null) {
        buildHeader(service);
    }

    if (footer) {
        buildFooter();
    }
}

const buildHeader = service => {
    let header = `<header class="govuk-header " role="banner" data-module="govuk-header">
  <div class="govuk-header__container govuk-width-container">
    <div class="govuk-header__logo">
      <a href="/" class="govuk-header__link govuk-header__link--homepage">
        <span class="govuk-header__logotype">
          <svg role="presentation" focusable="false" class="govuk-header__logotype-crown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 97" height="30" width="36">
            <path fill="currentColor" fill-rule="evenodd" d="M25 30.2c3.5 1.5 7.7-.2 9.1-3.7 1.5-3.6-.2-7.8-3.9-9.2-3.6-1.4-7.6.3-9.1 3.9-1.4 3.5.3 7.5 3.9 9zM9 39.5c3.6 1.5 7.8-.2 9.2-3.7 1.5-3.6-.2-7.8-3.9-9.1-3.6-1.5-7.6.2-9.1 3.8-1.4 3.5.3 7.5 3.8 9zM4.4 57.2c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.5-1.5-7.6.3-9.1 3.8-1.4 3.5.3 7.6 3.9 9.1zm38.3-21.4c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.6-1.5-7.6.3-9.1 3.8-1.3 3.6.4 7.7 3.9 9.1zm64.4-5.6c-3.6 1.5-7.8-.2-9.1-3.7-1.5-3.6.2-7.8 3.8-9.2 3.6-1.4 7.7.3 9.2 3.9 1.3 3.5-.4 7.5-3.9 9zm15.9 9.3c-3.6 1.5-7.7-.2-9.1-3.7-1.5-3.6.2-7.8 3.7-9.1 3.6-1.5 7.7.2 9.2 3.8 1.5 3.5-.3 7.5-3.8 9zm4.7 17.7c-3.6 1.5-7.8-.2-9.2-3.8-1.5-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.3 3.5-.4 7.6-3.9 9.1zM89.3 35.8c-3.6 1.5-7.8-.2-9.2-3.8-1.4-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.4 3.6-.3 7.7-3.9 9.1zM69.7 17.7l8.9 4.7V9.3l-8.9 2.8c-.2-.3-.5-.6-.9-.9L72.4 0H59.6l3.5 11.2c-.3.3-.6.5-.9.9l-8.8-2.8v13.1l8.8-4.7c.3.3.6.7.9.9l-5 15.4v.1c-.2.8-.4 1.6-.4 2.4 0 4.1 3.1 7.5 7 8.1h.2c.3 0 .7.1 1 .1.4 0 .7 0 1-.1h.2c4-.6 7.1-4.1 7.1-8.1 0-.8-.1-1.7-.4-2.4V34l-5.1-15.4c.4-.2.7-.6 1-.9zM66 92.8c16.9 0 32.8 1.1 47.1 3.2 4-16.9 8.9-26.7 14-33.5l-9.6-3.4c1 4.9 1.1 7.2 0 10.2-1.5-1.4-3-4.3-4.2-8.7L108.6 76c2.8-2 5-3.2 7.5-3.3-4.4 9.4-10 11.9-13.6 11.2-4.3-.8-6.3-4.6-5.6-7.9 1-4.7 5.7-5.9 8-.5 4.3-8.7-3-11.4-7.6-8.8 7.1-7.2 7.9-13.5 2.1-21.1-8 6.1-8.1 12.3-4.5 20.8-4.7-5.4-12.1-2.5-9.5 6.2 3.4-5.2 7.9-2 7.2 3.1-.6 4.3-6.4 7.8-13.5 7.2-10.3-.9-10.9-8-11.2-13.8 2.5-.5 7.1 1.8 11 7.3L80.2 60c-4.1 4.4-8 5.3-12.3 5.4 1.4-4.4 8-11.6 8-11.6H55.5s6.4 7.2 7.9 11.6c-4.2-.1-8-1-12.3-5.4l1.4 16.4c3.9-5.5 8.5-7.7 10.9-7.3-.3 5.8-.9 12.8-11.1 13.8-7.2.6-12.9-2.9-13.5-7.2-.7-5 3.8-8.3 7.1-3.1 2.7-8.7-4.6-11.6-9.4-6.2 3.7-8.5 3.6-14.7-4.6-20.8-5.8 7.6-5 13.9 2.2 21.1-4.7-2.6-11.9.1-7.7 8.8 2.3-5.5 7.1-4.2 8.1.5.7 3.3-1.3 7.1-5.7 7.9-3.5.7-9-1.8-13.5-11.2 2.5.1 4.7 1.3 7.5 3.3l-4.7-15.4c-1.2 4.4-2.7 7.2-4.3 8.7-1.1-3-.9-5.3 0-10.2l-9.5 3.4c5 6.9 9.9 16.7 14 33.5 14.8-2.1 30.8-3.2 47.7-3.2z"></path>
            <image src="/assets/images/govuk-logotype-crown.png" xlink:href="" class="govuk-header__logotype-crown-fallback-image" width="36" height="32"></image>
          </svg>
          <span class="govuk-header__logotype-text">
            GOV.UK
          </span>
        </span>
      </a>
    </div>
    <div class="govuk-header__content">
        <a href="/" class="govuk-header__link govuk-header__link--service-name">${service}</a>
    </div>
  </div>
</header>`
    document.getElementById(`header-space`).innerHTML = header;
};

const buildFooter = () => {
    let footer = `<footer class="govuk-footer " role="contentinfo">
  <div class="govuk-width-container ">
    <div class="govuk-footer__meta">
      <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
          <h2 class="govuk-visually-hidden">Support links</h2>
          <ul>
            <li><a href="/help">Help</a></li>
            <li><a href="/help/privacy-notice">Privacy</a></li>
            <li><a href="/help/cookies">Cookies</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/help/accessibility-statement">Accessibility statement</a></li>
            <li><a href="/help/terms-conditions">Terms and conditions</a></li>
            <li><a href="/cymraeg" lang="cy" hreflang="cy">Rhestr o Wasanaethau Cymraeg</a></li>
            <li>Built by the <a href="https://www.gov.uk/government/organisations/government-digital-service">Government Digital Service</a>
          </li>
          </ul>
          <svg role="presentation" focusable="false" class="govuk-footer__licence-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.2 195.7" height="17" width="41">
          <path fill="currentColor" d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"></path>
        </svg>
        <span class="govuk-footer__licence-description">
          All content is available under the
          <a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated
        </span>
      </div>
      <div class="govuk-footer__meta-item">
        <a class="govuk-footer" href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">
          <img src="../images/govuk-crest-2x.png" alt="crest" width="200"></img><br><br>© Crown copyright
        </a>
      </div>
    </div>
  </div>
</footer>`
    document.getElementById(`footer-space`).innerHTML = footer;
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