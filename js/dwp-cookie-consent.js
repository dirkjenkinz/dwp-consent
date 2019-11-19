'use strict'

const COOKIE_NAME = "DWP";

const buildPopupBody = (parameters) => {
  let { cookiesPage, advertising } = parameters
  let pBody = ourUse(cookiesPage);
  pBody += optionalCookieSettings();
  pBody += analyticCookies();
  if (advertising) {
    pBody += advertisingCookies();
  }
  pBody += saveAndContinueButton();
  return pBody;
}

const ourUse = cookiesPage => {
  let seg = `<div class="govuk-width-container">`;
  seg += `<main class="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">`;
  seg += `<div class="govuk-grid-row">`;
  seg += `<div class="govuk-grid-column-three-quarters">`;
  seg += `<h1 class="govuk-heading-xl">`;
  seg += `How we use cookies`;
  seg += `</h1>`;
  seg += `<p>`;
  seg += `A cookie is a small file which we store on your device for a short time to make this service work.`;
  seg += `</p>`;
  seg += `<p>`;
  seg += `We use cookies that are:`;
  seg += `</p>`;
  seg += `<ul class="govuk-list govuk-list--bullet">`;
  seg += `<li>essential - these make the service work, for example by remembering your answers to certain questions</li>`;
  seg += `<li>optional - these will not stop the service from working, but will give us information to help us make it better</li>`;
  seg += `</ul>`;
  seg += `<p>`;
  seg += `We will not:`;
  seg += `</p>`;
  seg += `<ul class="govuk-list govuk-list--bullet">`;
  seg += `<li>use any essential cookies until you use the service</li>`;
  seg += `<li>use any optional cookies unless you tell us we can</li>`;
  seg += `<li>be able identify you through using cookies</li>`;
  seg += `</ul>`;
  seg += `<p>`;
  seg += `For more detailed information about the cookies we use, see our `;
  seg += `<a href="${cookiesPage}" target="_blank" rel="noreferrer noopener" title="Go to our cookies information page">Cookies page</a>.`;
  seg += `</p>`;
  return seg;
}

const optionalCookieSettings = () => {
  let seg = `<br><h2 class="govuk-heading-l">Optional cookie settings</h2>`;
  seg += `<p>`;
  seg += `You can change the settings on this page at any time.`;
  seg += `</p><br>`;
  return seg;
}

const analyticCookies = () => {
  let seg = `<h3 class="govuk-heading-m">`;
  seg += `Analytics cookies`;
  seg += `</h3>`;
  seg += `<p>`;
  seg += `We use analytics software to get information about how you use this service and help us make it better.`;
  seg += `</p>`;
  seg += `<div class="govuk-form-group">`;
  seg += `<fieldset class="govuk-fieldset">`;
  seg += `<legend class="govuk-fieldset__legend govuk-fieldset__legend--s">`;
  seg += `<h3 class="govuk-fieldset__heading">`;
  seg += `Can we use cookies to help us improve this service?`;
  seg += `</h3>`;
  seg += `</legend>`;
  seg += `<div class="govuk-radios govuk-radios--inline">`;
  seg += `<div class="govuk-radios__item">`;
  seg += `<input class="govuk-radios__input" id="analytic-yes" name="analytic" type="radio" value="yes">`;
  seg += `<label class="govuk-label govuk-radios__label" for="analytic-yes">`;
  seg += `Yes`;
  seg += `</label>`;
  seg += `</div>`;
  seg += `<div class="govuk-radios__item">`;
  seg += `<input class="govuk-radios__input" id="analytic-no" name="analytics" type="radio" value="no">`;
  seg += `<label class="govuk-label govuk-radios__label" for="analytic-no">`;
  seg += `No`;
  seg += `</label>`;
  seg += `</div>`;
  seg += `</div>`;
  seg += `</fieldset>`;
  seg +=`</div >`;
  return seg;
};

const advertisingCookies = () => {
  let seg = `<h3 class="govuk-heading-m">`;
  seg += `Advertising cookies`;
  seg += `</h3> `;
  seg += `<p>`;
  seg += `Sometimes we may use cookies that help us with our communications and marketing.`;
  seg += `</p> `;
  seg += `<div class="govuk-form-group" >`;
  seg += `<fieldset class="govuk-fieldset" > `;
  seg += `<legend class="govuk-fieldset__legend govuk-fieldset__legend--s" >`;
  seg += `<h1 class="govuk-fieldset__heading" > `;
  seg += `Can we use cookies to help us with our communications and marketing?`;
  seg += `</h1>`;
  seg += `</legend>`;
  seg += `<div class="govuk-radios govuk-radios--inline">`;
  seg += `<div class="govuk-radios__item">`;
  seg += `<input class="govuk-radios__input" id="advertising-yes" name="advertising" type="radio" value="yes">`;
  seg += `<label class="govuk-label govuk-radios__label" for="advertising-yes">`;
  seg += `Yes`;
  seg += `</label>`;
  seg += `</div>`;
  seg += `<div class="govuk-radios__item">`;
  seg += `<input class="govuk-radios__input" id="advertising-no" name="advertising" type="radio" value="no">`;
  seg += `<label class="govuk-label govuk-radios__label" for="advertising-no">`;
  seg += `No`;
  seg += `</label>`;
  seg += `</div>`;
  seg += `</div>`;
  seg += `</fieldset>`;
  seg += `</div>`;
  return seg;
};

const saveAndContinueButton = () => {
  let seg = `<button class="govuk-button" data-module="govuk-button" `;
  seg += `id="save-and-close" `;
  seg += `data-dismiss="modal" `;
  seg += `aria-label="Close" `;
  seg += `onclick="saveAndContinue()">`;
  seg += `Save and continue`;
  seg += `</button>`;
  seg += `</div>`;
  seg += `</div>`;
  seg += `</main>`;
  seg += `</div>`;
  return seg;
}

const saveAndContinue = () => {
  let parms = document.getElementsByClassName(`dwp-consent`);
  let retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;
  let d = new Date();
  d.setDate(d.getDate() + retention);
  setAdvertisingCookie(d);
  setAnalyticCookie(d);
  closePopup();
}

const setAdvertisingCookie = date => {
  let parms = document.getElementsByClassName(`dwp-consent`);
  let _class = parms[0].getAttribute(`class`);
  if (_class.includes(`advertising`)) {
    if (document.getElementById(`advertising-yes`).checked) {
      document.cookie = `${COOKIE_NAME}_allow_advertising_cookies=true; expires= ${date}`;
    } else {
      document.cookie = `${COOKIE_NAME}_allow_advertising_cookies=false; expires= ${date}`;
    }
  }
}

const setAnalyticCookie = date => {
  if (document.getElementById(`analytic-yes`).checked) {
    document.cookie = `${COOKIE_NAME}_allow_analytic_cookies=true; expires= ${date}`;
  } else {
    document.cookie = `${COOKIE_NAME}_allow_analytic_cookies=false; expires= ${date}`;
  }
}

const closePopup = () => {
  let container = document.getElementById(`consent-container`);
  if (container) {
    container.remove();
  };
};

document.addEventListener(`click`, e => {
  let _target = event.target;
  if (!_target.closest('#consent-container')) {
    closePopup();
  };
});

const findExistingCookies = () => {
  const analytic_true = `${COOKIE_NAME}_allow_analytic_cookies=true`;
  const advertising_true = `${COOKIE_NAME}_allow_advertising_cookies=true`;
  const analytic_false = `${COOKIE_NAME}_allow_analytic_cookies=false`;
  const advertising_false = `${COOKIE_NAME}_allow_advertising_cookies=false`;
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

const buildHTML = (popupBody) => {
  let html = `<div id="consent-container" class="dwp-consent-container">`;
  html += `<div class="dwp-consent-body">${popupBody}</div>`;
  html += `</div>`;
  return html;
};

const getParameters = () => {
  let parameters = { retention: 0, slideFromLeft: false, advertising: false, cookiesPage: `https://www.gov.uk/help/cookie-details` };
  let parms = document.getElementsByClassName(`dwp-consent`);
  let _class = parms[0].getAttribute(`class`);
  let cookiesPage = parms[0].getAttribute(`cookiesPage`);

  if (cookiesPage) {
    parameters.cookiesPage = cookiesPage
  }

  parameters.retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;

  if (_class.includes(`advertising`)) {
    parameters.advertising = true;
  }

  return parameters;
}

window.onload = () => {
  let parameters = getParameters();
  let date = new Date();
  date.setDate(date.getDate() + parameters.retention);
  document.cookie = `${COOKIE_NAME}_allow_essential_cookies=true; expires= ${date}`;
  let html = buildHTML(buildPopupBody(parameters));
  document.body.innerHTML = document.body.innerHTML + html;
  findExistingCookies();
};