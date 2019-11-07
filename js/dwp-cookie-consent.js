const DISALLOW_ANALYTICS = `Turn switch to "Off" to disallow the use of your data for analytics.`;
const ALLOW_ANALYTICS = `Turn switch to "On" to allow the use of your data for analytics.`;
const ALLOW_COOKIES = `Turn switch to "On" to allow the use of cookies.`;
const DISALLOW_COOKIES = `Turn switch to "Off" to disallow the use of cookies.`;
const COOKIE_NAME = "DWP";

const buildPopupBody = cookiesPage => {
  if (!cookiesPage || cookiesPage === ``) {
    cookiesPage =  `https://www.gov.uk/help/cookie-details`;
  }
  console.log(cookiesPage)
  let pBody = ourUse(cookiesPage);
  pBody += necessaryCookies();
  pBody += analytics(cookiesPage);
  pBody += saveAndClose();
  return pBody;
}

const ourUse = cookiesPage => {
  let seg = `<div class="fact">`;
  seg += `<div class="row inside-fact">`;
  seg += `<h2>Our use of cookies</h2>`;
  seg += `<p>`;
  seg += `We use necessary cookies to make our site work. 
    We'd also like to set optional analytics cookies to help us improve it. 
    We won't set optional cookies unless you enable them. 
    Using this tool will set a cookie on your device to remember your preferences.`;
  seg += `</p>`;
  seg += `<p>`;
  seg += `For more detailed information about the cookies we use, see our <a href="${cookiesPage}" target="_blank">Cookies page</a>.`;
  seg += `</p>`;
  seg += `</div>`; // end of inside-fact
  seg += `<div class="row">`;
  seg += `<label class="switch">`;
  seg += `<input type="checkbox" id="use-cookies">`;
  seg += `<span class="slider round"></span>`;
  seg += `</label>`
  seg += `<p id="use-cookies-text"></p>`
  seg += `</div>`; // end of row
  seg += `</div>`; // end of fact
  return seg;
}

const necessaryCookies = () => {
  let seg = `<div class="row fact">`;
  seg += `<h2>Necessary cookies</h2>`;
  seg += `<p>`;
  seg += `Necessary cookies enable core functionality such as security, network management, and accessibility. 
          You may disable these by changing your browser settings, but this may affect how the website functions.`;
  seg += `</p>`;
  seg += `</div>`; // end of fact
  return seg;
}

const analytics = cookiesPage => {
  let seg = `<div class="fact">`;
  seg += `<div class="row inside-fact">`;
  seg += `<h2>Analytics cookies</h2>`;
  seg += `<p>`;
  seg += `We'd like to set Google Analytics cookies to help us to improve our website by collecting and reporting information on how you use it. 
          The cookies collect information in a way that does not directly identify anyone. 
          For more information on how these cookies work, please see our <a href="${cookiesPage}" target="_blank">Cookies page</a>.`;
  seg += `</p>`;
  seg += `</div>`; // end of inside fact
  seg += `<div class="row">`;
  seg += `<label class="switch">`;
  seg += `<input type="checkbox" id="analytics">`;
  seg += `<span class="slider round"></span>`;
  seg += `</label>`
  seg += `<p id="analytics-text"></p>`
  seg += `</div>`; // end of row
  seg += `</div>`; // end of fact
  return seg;
}

const saveAndClose = () => {
  let seg = `<div class="row fact text-center">`;
  seg += `<button type="button" class="btn-danger btn-block" id="save-and-close" data-dismiss="modal" aria-label="Close">`;
  seg += `<span aria-hidden="true">Save and close</span>`;
  seg += `</button>`;
  seg += `</div>`
  return seg;
}

(function ($) {
  if (!window.console) window.console = {}; // for ie9
  if (!window.console.log) window.console.log = function () { }; // for ie9

  $.fn.cookiePopup = (() => {
    let initialised = false;

    let buildHTML = (popupBody) => {
      let html =
        `<div class="dwp-consent-container` +
        ` dwp-consent-container-top` +
        ` dwp-consent-color-default">` +
        `<div class="dwp-consent-body">${popupBody}</div>` +
        `</div>`;
      return html;
    };

    const cookiesAlreadyAccepted = () => {
      let nameLength = COOKIE_NAME.length;
      let cookiesAccepted = false;
      let cookies = document.cookie.split(`;`);
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, nameLength) === COOKIE_NAME) {
          let inner = JSON.parse(cookie.substring(nameLength + 1));
          cookiesAccepted = inner.useCookies;
        }
      }
      return cookiesAccepted;
    };

    const publicfunc = {

      init: () => {
        if (!cookiesAlreadyAccepted()) {
          let parms = $(".dwp-consent").first()[0];
          cookiesPage = $(parms).attr('cookiesPage');
          if (!initialised) {
            initialised = true;
            let html = buildHTML(buildPopupBody(cookiesPage));
            if ($(`.dwp-consent-block`).length > 0) {
              $(`.dwp-consent-block`).append(html);
            } else {
              $(`BODY`).append(html);
            }
            $(`.dwp-consent-container`).show();
          }
        }
      }
    };
    return publicfunc;
  });

  const setAnalytics = () => {
    let nameLength = COOKIE_NAME.length;
    let analyticsOK = false;
    let cookies = document.cookie.split(`;`);
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, nameLength) === COOKIE_NAME) {
        let inner = JSON.parse(cookie.substring(nameLength + 1));
        analyticsOK = inner.analytics;
      }
    }
    if (analyticsOK) {
      $(`#analytics`).prop(`checked`, true);
      $(`#analytics-text`).text(DISALLOW_ANALYTICS);
    }
  }

  $(document).ready(() => {
    if ($(`.dwp-consent`).length > 0) {
      $(document).cookiePopup().init({});
      $(`#use-cookies-text`).text(ALLOW_COOKIES);
      $(`#analytics-text`).text(ALLOW_ANALYTICS);
      setAnalytics();
    }

    $(`#use-cookies`).change(() => {
      if ($(`#use-cookies`).prop(`checked`)) {
        $(`#use-cookies-text`).text(DISALLOW_COOKIES)
      } else {
        $(`#use-cookies-text`).text(ALLOW_CO)
      }
    })

    $(`#analytics`).change(() => {
      if ($(`#analytics`).prop(`checked`)) {
        $(`#analytics-text`).text(DISALLOW_ANALYTICS)
      } else {
        $(`#analytics-text`).text(ALLOW_ANALYTICS)
      }
    })

    $(`#save-and-close`).click(() => {
      let d = new Date();
      d.setDate(d.getDate() + 28);
      let dwpCookies = { useCookies: false, analytics: false };
      if ($(`#use-cookies`).prop(`checked`)) {
        dwpCookies.useCookies = true;
      }
      if ($(`#analytics`).prop(`checked`)) {
        dwpCookies.analytics = true;
      }
      let cookieString = JSON.stringify(dwpCookies);
      document.cookie = `${COOKIE_NAME}=${cookieString}; expires= ${d}`;

      $(`.dwp-consent-container`).animate({
        opacity: 0,
        height: 0
      }, 200, function () {
        $(`.dwp-consent-container`).hide(0);
      });
    })
  });
}(jQuery));