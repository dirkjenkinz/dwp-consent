const DISALLOW_ANALYTICS = `Turn switch to "Off" to disallow us to use analytic cookies.`;
const ALLOW_ANALYTICS = `Turn switch to "On" to allow us to use analytic cookies.`;
const ALLOW_ADVERTISING = `Turn switch to "On" to allow us to use advertising cookies.`;
const DISALLOW_ADVERTISING = `Turn switch to "Off" to allow us to use of advertising cookies.`;
const COOKIE_NAME = "DWP";

const buildPopupBody = cookiesPage => {
  if (!cookiesPage || cookiesPage === ``) {
    cookiesPage = `https://www.gov.uk/help/cookie-details`;
  }
  let pBody = `<div class="fact">`;
  pBody += ourUse(cookiesPage);
  pBody += advertisingCookies();
  pBody += analyticCookies();
  pBody += saveAndClose();
  pBody += `</div>`;
  return pBody;
}

const ourUse = cookiesPage => {
  let seg = `<div class="row inside-fact">`;
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
  seg += `<br>By continuing to use this site, you agree to our use of essential cookies.`;
  seg += `We won't set optional cookies unless you enable them.`;
  seg += `<br>We ask that you use this tool to permit us to use the optional cookies.`;
  seg += `<br>Any data collected is anonymised.`
  seg += `Using this tool will set a cookie on your device to remember your preferences.`;
  seg += `</p>`;
  seg += `<p>`;
  seg += `For more detailed information about the cookies we use, see our `;
  seg += `<a href="${cookiesPage}" target="_blank" rel="noreferrer noopener" title="Go to our cookies information page">Cookies page</a>.`;
  seg += `</p>`;
  seg += `</div>`;
  return seg;
}

const advertisingCookies = () => {
  let seg = `<div class="row inside-fact">`;
  seg += `<header><h2>Advertising cookies</h2></header>`;
  seg += `<label class="switch" for="allow-advertising-cookies">`;
  seg += `<input type="checkbox" id="allow-advertising-cookies">`;
  seg += `<span class="slider round" aria-label="Allow or Disallow Advertising Cookies"></span>`;
  seg += `<span><br><br><br>Disallow/Allow</span>`;
  seg += `</label>`
  seg += `<p id="allow-advertising-cookies-text"></p>`
  seg += `</div>`;
  return seg;
}

const analyticCookies = () => {
  let seg = `<div class="row inside-fact">`;
  seg += `<header><h2>Analytic cookies</h2></header>`;
  seg += `<label class="switch" for="allow-analytic-cookies">`;
  seg += `<input type="checkbox" id="allow-analytic-cookies">`;
  seg += `<span class="slider round" aria-label="Allow or Disallow Analytic Cookies"></span>`;
  seg += `<span><br><br><br>Disallow/Allow</span>`;
  seg += `</label>`
  seg += `<p id="allow-analytic-cookies-text"></p>`
  seg += `</div>`;
  return seg;
}

const saveAndClose = () => {
  let seg = `<div class="row inside-fact text-center">`;
  seg += `<button type="button" class="btn-danger btn-block" id="save-and-close" data-dismiss="modal" aria-label="Close">`;
  seg += `<span>Save and close</span>`;
  seg += `</button>`;
  seg += `</div>`
  return seg;
}

(function ($) {
  $.fn.cookiePopup = (() => {
    let initialised = false;

    let buildHTML = (popupBody, slide) => {
      let html = `<div id="consent-container" class="dwp-consent-container`;
      if (slide) {
        html += ` dwp-consent-container-left`;
      } else {
        html += ` dwp-consent-container-top`;
      }
      html += ` dwp-consent-color-default">`;
      html += `<div class="dwp-consent-body">${popupBody}</div>`;
      html += `</div>`;
      return html;
    };

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

    const publicFunctions = {
      init: () => {
        if (!cookiesAlreadyExist()) {
          let parms = $(".dwp-consent").first()[0];
          let retention = $(parms).attr(`retention-period`) || 28;
          let d = new Date();
          d.setDate(d.getDate() + retention);
          let DWPCookie = `${COOKIE_NAME}_retention_date=${d}; expires= ${d}`;
          document.cookie = DWPCookie;
          let slide = false;
          _class = $(parms).attr(`class`);
          if (_class.includes(`slide`)) {
            slide = true;
          };
          let cookiesPage = $(parms).attr('cookiesPage');
          if (!initialised) {
            initialised = true;
            let html = buildHTML(buildPopupBody(cookiesPage), slide);
            if ($(`.dwp-consent-block`).length > 0) {
              $(`.dwp-consent-block`).append(html);
            } else {
              $(`BODY`).append(html);
            }
            if (slide) {
              $(`.dwp-consent-container`).show("slide", { direction: "left" }, 1000);
            } else {
              $('.dwp-consent-container').show();
            }
          }
        }
      }
    };
    return publicFunctions;
  });

  const closePopup = () => {
    $(`.dwp-consent-container`).animate({
        opacity: 0,
        height: 0
      }, 200, function () {
        $(`.dwp-consent-container`).hide(0);
      });
  }

  $(document).click(event => {
    $target = $(event.target);
    if (!$target.closest('#consent-container').length) {
      closePopup();
    };
  });

  $(document).ready(() => {
    if ($(`.dwp-consent`).length > 0) {
      $(document).cookiePopup().init({});
      $(`#allow-advertising-cookies-text`).text(ALLOW_ADVERTISING);
      $(`#allow-analytic-cookies-text`).text(ALLOW_ANALYTICS);
    }

    $(`#allow-advertising-cookies`).change(() => {
      if ($(`#allow-advertising-cookies`).prop(`checked`)) {
        $(`#allow-advertising-cookies-text`).text(DISALLOW_ADVERTISING);
      } else {
        $(`#allow-advertising-cookies-text`).text(ALLOW_ADVERTISING);
      }
    })

    $(`#allow-analytic-cookies`).change(() => {
      if ($(`#allow-analytic-cookies`).prop(`checked`)) {
        $(`#allow-analytic-cookies-text`).text(DISALLOW_ANALYTICS);
      } else {
        $(`#allow-analytic-cookies-text`).text(ALLOW_ANALYTICS);
      }
    });

    $(`#save-and-close`).click((e) => {
      let parms = $(".dwp-consent").first()[0];
      let retention = $(parms).attr(`retention-period`) || 28;
      let d = new Date();
      d.setDate(d.getDate() + retention);
      if ($(`#allow-advertising-cookies`).prop(`checked`)) {
        document.cookie = `${COOKIE_NAME}_allow_advertising_cookies=true; expires= ${d}`;
      }
      if ($(`#allow-analytic-cookies`).prop(`checked`)) {
        document.cookie = `${COOKIE_NAME}_allow_analytic_cookies=true; expires= ${d}`;
      }
      closePopup();
    })
  });
}(jQuery));