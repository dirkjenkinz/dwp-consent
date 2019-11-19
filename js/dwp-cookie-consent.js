'use strict'

const COOKIE_NAME = "DWP";

const buildPopupBody = (parameters) => {
  let { cookiesPage, advertising } = parameters
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

const ourUse = (cookiesPage) => {
  let seg = `<div class="inside-fact">`;
  seg += `<div class="heading-large header"><h1>How we use cookies</h1></div>`;
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
  seg += `<div class="heading-medium"><h2>Optional Cookie Settings</h2></div>`;
  seg += `</p>`;
  seg += `</div>`;
  return seg;
}

const analyticCookies = () => {
  let seg = `<div class="inside-fact">`;
  seg += `<div class="heading-medium"><h2>Analytics cookies</h2></div>`;
  seg += `<p>`;
  seg += `We use analytics software to get information about how you use this service in order to help us make it better.`;
  seg += `</p>`;
  seg += `<div class="form-group">`;
  seg += `<fieldset>`;
  seg += `<legend><div class="heading-small"><h3>Can we use analytics cookies to help us improve this service?</h3></div></legend>`;
  seg += `<label class="block-label" for="analytic-yes">`;
  seg += `<input id="analytic-yes" type="radio" name="analytic" value="Yes" aria-controls="allow-analytic-cookies">`;
  seg += `Yes`;
  seg += `</label>`;
  seg += `<label class="block-label" for="analytic-no">`;
  seg += `<input id="analytic-no" type="radio" name="analytic" value="No" aria-controls="allow-analytic-cookies" checked>`;
  seg += `No`;
  seg += `</label>`;
  seg += `</fieldset>`;
  seg += `</div>`;
  seg += `</div>`;
  return seg;
}

const advertisingCookies = () => {
  let seg = `<div class="inside-fact">`;
  seg += `<h2>Advertising cookies</h2>`;
  seg += `<p>`;
  seg += `Sometimes we may use cookies that help us with our communications and marketing.`;
  seg += `</p>`;
  seg += `<div class="form-group">`;
  seg += `<fieldset>`;
  seg += `<legend><div class="heading-small"><h3>Can we use advertising cookies to help us with our communications and marketing?</h3></div></legend>`;
  seg += `<label class="block-label" for="advertising-yes">`;
  seg += `<input id="advertising-yes" type="radio" name="advertising" value="Yes" aria-controls="allow-advertising-cookies">`;
  seg += `Yes`;
  seg += `</label>`;
  seg += `<label class="block-label" for="advertising-no">`;
  seg += `<input id="advertising-no" type="radio" name="advertising" value="No" aria-controls="allow-advertising-cookies" checked>`;
  seg += `No`;
  seg += `</label>`;
  seg += `</fieldset>`
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

const findExistingCookies = () => {
  const analytic = `${COOKIE_NAME}_allow_analytic_cookies=true`;
  const advertising = `${COOKIE_NAME}_allow_advertising_cookies=true`;
  let cookies = document.cookie.split(`;`);
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie === advertising) {
      document.getElementsByName(`advertising`)[0].checked = true;
    }
    if (cookie === analytic) {
      document.getElementsByName(`analytic`)[0].checked = true;
    }
  }
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

const getParameters = () => {
  let parameters = { retention: 0, slideFromLeft: false, advertising: false, cookiesPage: `https://www.gov.uk/help/cookie-details` };
  let parms = document.getElementsByClassName(`dwp-consent`);
  let _class = parms[0].getAttribute(`class`);
  let cookiesPage = parms[0].getAttribute(`cookiesPage`);

  if (cookiesPage) {
    parameters.cookiesPage = cookiesPage
  }

  parameters.retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;

  if (_class.includes(`slide-from-left`)) {
    parameters.slideFromLeft = true;
  };

  if (_class.includes(`advertising`)) {
    parameters.advertising = true;
  }

  return parameters;
}

window.onload = () => {
  let parameters = getParameters();
  let d = new Date();
  d.setDate(d.getDate() + parameters.retention);
  let DWPCookie = `${COOKIE_NAME}_retention_date=${d}; expires= ${d}`;
  document.cookie = DWPCookie;
  let html = buildHTML(buildPopupBody(parameters), parameters.slideFromLeft);
  document.body.innerHTML = document.body.innerHTML + html;
  findExistingCookies();
};