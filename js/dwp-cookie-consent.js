const DISALLOW_ANALYTICS = `Turn switch to "Off" to disallow use of analytic cookies.`;
const ALLOW_ANALYTICS = `Turn switch to "On" to allow use of analytic cookies.`;
const ALLOW_ADVERTISING = `Turn switch to "On" to allow use of advertising cookies.`;
const DISALLOW_ADVERTISING = `Turn switch to "Off" to disallow use of advertising cookies.`;
const COOKIE_NAME = "DWP";

const buildPopupBody = cookiesPage => {
  if (!cookiesPage || cookiesPage === ``) {
    cookiesPage = `https://www.gov.uk/help/cookie-details`;
  }
  let pBody = `<div class="fact">`;
  pBody += ourUse(cookiesPage);
  pBody += `<div class="row">`;
  pBody += advertisingCookies();
  pBody += analyticCookies();
  pBody += `</div>`;
  pBody += saveAndClose();
  pBody += `</div>`;
  return pBody;
}

const ourUse = cookiesPage => {
  let seg = `<div class="inside-fact">`;
  seg += `<header><h1>Our use of cookies</h1></header>`;
  seg += `<p>`;
  seg += `This site uses cookies which are essential for the site to work.`;
  seg += `<br>We also use non-essential cookies to help us improve government digital services.`;
  seg += '<br><br>Our cookies fall into three categories:'
  seg += `<ol>`
  seg += `<li>Essential – a strictly defined group of cookies that are technically necessary for providing the service.`;
  seg += `<li>Advertising – rarely used by DWP, but used by some services to track communications messaging.</li>`;
  seg += `<li>Analytics – in our case mostly Google Analytics.</li>`;
  seg += `</ol>`;
  seg += `By continuing to use this site, you agree to our use of essential cookies.`;
  seg += ` We won't set optional cookies unless you enable them.`;
  seg += `<br>We ask that you use this tool to permit us to use the optional cookies.`;
  seg += `<br>Any data collected is anonymised.`
  seg += `<br>Using this tool will set a cookie on your device to remember your preferences.`;
  seg += `</p>`;
  seg += `<p>`;
  seg += `For more detailed information about the cookies we use, see our `;
  seg += `<a href="${cookiesPage}" target="_blank" rel="noreferrer noopener" title="Go to our cookies information page">Cookies page</a>.`;
  seg += `</p>`;
  seg += `</div>`;
  return seg;
}

const advertisingCookies = () => {
  let seg = `<div class="inside-fact column">`;
  seg += `<h2>Advertising cookies</h2>`;
  seg += `<label class="switch" for="allow-advertising-cookies">`;
  seg += `<input type="checkbox" id="allow-advertising-cookies" onChange="changeAdvertising()">`;
  seg += `<span class="slider round" aria-label="Allow or Disallow Advertising Cookies"></span>`;
  seg += `<span><br><br><br>Disallow/Allow</span>`;
  seg += `</label>`
  seg += `<p id="allow-advertising-cookies-text"></p>`
  seg += `</div>`;
  return seg;
}

const analyticCookies = () => {
  let seg = `<div class="inside-fact right-side">`;
  seg += `<h2>Analytic cookies</h2>`;
  seg += `<label class="switch" for="allow-analytic-cookies">`;
  seg += `<input type="checkbox" id="allow-analytic-cookies" onChange="changeAnalytics()">`;
  seg += `<span class="slider round" aria-label="Allow or Disallow Analytic Cookies"></span>`;
  seg += `<span><br><br><br>Disallow/Allow</span>`;
  seg += `</label>`
  seg += `<p id="allow-analytic-cookies-text"></p>`
  seg += `</div>`;
  return seg;
}

const saveAndClose = () => {
  let seg = `<div class="inside-fact text-center">`;
  seg += `<button type="button" class="btn-danger btn-block" id="save-and-close" data-dismiss="modal" aria-label="Close" onclick="closeAndSave()">`;
  seg += `<span>Save and close</span>`;
  seg += `</button>`;
  seg += `</div>`
  return seg;
}

const changeAdvertising = () => {
  if (document.querySelector(`#allow-advertising-cookies`).checked) {
    document.getElementById(`allow-advertising-cookies-text`).innerHTML = DISALLOW_ADVERTISING;
  } else {
    document.getElementById(`allow-advertising-cookies-text`).innerHTML = ALLOW_ADVERTISING;
  }
}

const changeAnalytics = () => {
  if (document.querySelector(`#allow-analytic-cookies`).checked) {
    document.getElementById(`allow-analytic-cookies-text`).innerHTML = DISALLOW_ANALYTICS;
  } else {
    document.getElementById(`allow-analytic-cookies-text`).innerHTML = ALLOW_ANALYTICS;
  }
}

const closeAndSave = () => {
  let parms = document.getElementsByClassName(`dwp-consent`);
  let retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;
  let d = new Date();
  d.setDate(d.getDate() + retention);
  if (document.querySelector(`#allow-advertising-cookies`).checked) {
    document.cookie = `${COOKIE_NAME}_allow_advertising_cookies=true; expires= ${d}`;
  }
  if (document.querySelector(`#allow-analytic-cookies`).checked) {
    document.cookie = `${COOKIE_NAME}_allow_analytic_cookies=true; expires= ${d}`;
  }
  closePopup();
}

const closePopup = () => {
  let container = document.getElementById(`consent-container`);
  if (container) {
    container.remove();
  };
};

document.addEventListener(`click`, e => {
  _target = event.target;
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

window.onload = () => {
  let initialised = false;
  let buildHTML = (popupBody, slide) => {
    let html = `<div id="consent-container" class="dwp-consent-container`;
    if (slide) {
      html += ` dwp-consent-container-left`;
    } else {
      html += ` dwp-consent-container-top `;
    }
    html += ` dwp-consent-color-default"`;
    html += ` style="display: block;">`
    html += `<div class="dwp-consent-body">${popupBody}</div>`;
    html += `</div>`;
    return html;
  };

  if (!cookiesAlreadyExist()) {
    let parms = document.getElementsByClassName(`dwp-consent`);
    let retention = parseInt(parms[0].getAttribute(`retention-period`)) || 28;
    let d = new Date();
    d.setDate(d.getDate() + retention);
    let DWPCookie = `${COOKIE_NAME}_retention_date=${d}; expires= ${d}`;
    document.cookie = DWPCookie;
    let slide = false;
    _class = parms[0].getAttribute(`class`);
    
    if (_class.includes(`slide`)) {
      slide = true;
    };

    let cookiesPage = parms[0].getAttribute(`cookiesPage`);

    if (!initialised) {
      initialised = true;
      let html = buildHTML(buildPopupBody(cookiesPage), slide);
      document.body.innerHTML = document.body.innerHTML + html;
      changeAdvertising();
      changeAnalytics();
    }

  }
};
