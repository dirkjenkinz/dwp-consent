'use strict'

const COOKIE_NAME = "DWP";

const buildPopupBody = (cookiesPage, advertising) => {
  if (!cookiesPage || cookiesPage === ``) {
    cookiesPage = `https://www.gov.uk/help/cookie-details`;
  }
  let pBody = `<div class="fact">`;
  pBody += ourUse(cookiesPage, advertising);
  pBody += analyticCookies();
  if (advertising) {
    pBody += advertisingCookies();
  }

  pBody += saveAndContinueButton();
  pBody += `</div>`;
  return pBody;
}

const ourUse = (cookiesPage, advertising) => {
  let seg = `<div class="inside-fact">`;
  seg += `<header><h1>How we use cookies<h1></header>`;
  seg += `<p>`;
  seg += `A cookie is a small file which we store on your device for a short time to make this service work.`;
  seg += `<br><br>We use cookies that are:`;
  seg += `<ul>`
  seg += `<li>essential – these make the service work, for example by remembering your answers to certain questions.`;
  seg += `<li>optional – these will not stop the service from working if absent, but will give us information to help us make it better.</li>`;
  seg += `</ul>`;
  seg += `<br>We will not:`;
  seg += `<ul>`;
  seg += `<li>use any essential cookies until you use the service</li>`;
  seg += `<li>use any optional cookies unless you tell us we can</li>`;
  seg += `<li>be able to identify you through using cookies</li>`;
  seg += `</ul>`;
  seg += `</p>`;
  seg += `<p>`;
  seg += `For more detailed information about the cookies we use, see our `;
  seg += `<a href="${cookiesPage}" target="_blank" rel="noreferrer noopener" title="Go to our cookies information page">Cookies page</a>.`;
  seg += `</p>`;
  seg += `<br><br><p>`;
  seg += `<header><h2>Optional Cookie Settings</h2></header>`;
  seg += `</p>`;
  seg += `</div>`;
  return seg;
}

const analyticCookies = () => {
  let seg = `<br><div class="inside-fact">`;
  seg += `<h2>Analytics cookies</h2>`;
  seg += `<span class="form-hint">`;
  seg += `We use analytics software to get information about how you use this service in order to help us make it better.`;
  seg += `</span>`;
  seg += `<div class="form-group">`;
  seg += `<label class="block-label" for="analytic-yes">`;
  seg += `<h3>Can we use analytics cookies to help us improve this service?</h3>`;
  seg += `<input id="analytic-yes" type="radio" name="analytic" value="Yes" aria-controls="allow-analytic-cookies">`;
  seg += `Yes`;
  seg += `</label>`;
  seg += `<label class="block-label" for="analytic-no">`;
  seg += `<input id="analytic-no" type="radio" name="analytic" value="No" aria-controls="allow-analytic-cookies" checked>`;
  seg += `No`;
  seg += `</label>`;
  seg += `</div>`;
  seg += `</div>`;
  return seg;
}

const advertisingCookies = () => {
  let seg = `<div class="inside-fact">`;
  seg += `<h2>Advertising cookies</h2>`;
  seg += `<span class="form-hint">`;
  seg += `Sometimes we may use cookies that help us with our communications and marketing.`;
  seg += `</span>`;
  seg += `<div class="form-group">`;
  seg += `<label class="block-label" for="advertising-yes">`;
  seg += `<h3>Can we use advertising cookies to help us with our communications and marketing?</h3>`
  seg += `<input id="advertising-yes" type="radio" name="advertising" value="Yes" aria-controls="allow-advertising-cookies">`;
  seg += `Yes`;
  seg += `</label>`;
  seg += `<label class="block-label" for="advertising-no">`;
  seg += `<input id="advertising-no" type="radio" name="advertising" value="No" aria-controls="allow-advertising-cookies" checked>`;
  seg += `No`;
  seg += `</label>`;
  seg += `</div>`;
  seg += `</div>`;
  return seg;
}

const saveAndContinueButton = () => {
  let seg = `<div class="inside-fact text-center">`;
  seg += `<button type="button" class="btn-danger btn-block" id="save-and-close" data-dismiss="modal" aria-label="Close" onclick="saveAndContinue()">`;
  seg += `<span>Save and continue</span>`;
  seg += `</button>`;
  seg += `</div>`
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
    if (document.getElementsByName(`advertising`)[0].checked) {
      document.cookie = `${COOKIE_NAME}_allow_advertising_cookies=true; expires= ${date}`;
    }
  }
}

const setAnalyticCookie = date => {
  if (document.getElementsByName(`analytic`)[0].checked) {
    document.cookie = `${COOKIE_NAME}_allow_analytic_cookies=true; expires= ${date}`;
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

const cookiesAlreadyExist = () => {
  let nameLength = COOKIE_NAME.length;
  let cookiesExist = false;
  let cookies = document.cookie.split(`;`);
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.substring(0, nameLength) === COOKIE_NAME) {
      cookiesExist = true;
    }
  }
  return cookiesExist;
};

const buildHTML = (popupBody, slideFromLeft) => {
  let html = `<div id="consent-container" class="dwp-consent-container`;
  if (slideFromLeft) {
    html += ` dwp-consent-container-left">`;
  } else {
    html += ` dwp-consent-container-top">`;
  }
  html += `<div class="dwp-consent-body">${popupBody}</div>`;
  html += `</div>`;
  return html;
};

window.onload = () => {
  let initialised = false;
  let slideFromLeft = false;
  let advertising = false;

  if (!cookiesAlreadyExist()) {
    let parms = document.getElementsByClassName(`dwp-consent`);
    let retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;
    let d = new Date();
    d.setDate(d.getDate() + retention);
    let DWPCookie = `${COOKIE_NAME}_retention_date=${d}; expires= ${d}`;
    document.cookie = DWPCookie;

    let _class = parms[0].getAttribute(`class`);
    let cookiesPage = parms[0].getAttribute(`cookiesPage`);

    if (_class.includes(`slide-from-left`)) {
      slideFromLeft = true;
    };

    if (_class.includes(`advertising`)) {
      advertising = true;
    }

    if (!initialised) {
      initialised = true;
      let html = buildHTML(buildPopupBody(cookiesPage, advertising), slideFromLeft);
      document.body.innerHTML = document.body.innerHTML + html;
    }

  }
};