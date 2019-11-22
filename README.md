A plug-in to create EU Cookie Law popups.

Run demo.html to see it in action.

---------------------------------

To get started:

Import jquery & the dwp-cookie-consent files (one javaScript & one CSS stylesheet):
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

    <link rel="stylesheet" type="text/css" href="./css/dwp-cookie-consent.css" />
    <script src="./js/dwp-cookie-consent.js"></script>

      {NB: jQuery is only needed for the demo.html. The plug-in itself is written in vanilla JS}


Then add the dwp-consent class to any HTML element:
    <div class=”dwp-consent”>

---------------------------------

OPTIONAL PARAMETERS:

The cookies page defaults to https://www.gov.uk/help/cookie-details. To override this, include "cookiesPage" in the element:
    <div class="dwp-consent" cookiesPage="https://www.bbc.co.uk/">

By default, the retention period for the cookie set by this tool is 28 days. To override this, include "retention-period=[days] in the element, where [days] = number of days to retain the cookie.
    <div class="dwp-consent" retention-period=100>

By default, no header showing the service name or footer is added to the cookies consent page, as it is expected that this will be done by the app calling the page. However, if a header is required, "service-name=[service]" should be added to the div:
    <div class="dwp-consent" service-name="DWP Carers Allowance">
To add a footer:
    <div class="dwp-consent" footer>

To display the page and banner in Welsh, add "welsh" to the class.
    <div class="dwp-consent" welsh>

---------------------------------

When invoked, dwp-cookie-consent looks for cookies beginning with 'DWP';
If no DWP cookies are found, the DWP Cookie Consent page is displayed.
The pop-up explains our use of cookies and asks for permission to set cookies for advertising and analytic purposes.
The default in both theses cases is 'no'.
Responses are recorded as true and force in cookie and the popup disappears.

If there are DWP cookies already, a banner appears at the top of the page asking if t

----------------------------------

The cookies are:
    DWP_allow_essential_cookies
    DWP_allow_advertising_cookies - set to true if permission to use advertising cookies is given
    DWP_allow_analytic_cookies - set to true if permission to use analytic cookies is given

----------------------------------

The cookies expire after 28 days unless a different retention period has been set.

----------------------------------

NB: 
 A future version will allow for Welsh to be used as the language of the popup.