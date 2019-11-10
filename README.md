A jQuery plug-in to create EU Cookie Law popups.

Run demo.html to see it in action.

---------------------------------

To get started:

Import jquery & the dwp-cookie-consent files (one javaScript & one CSS stylesheet):
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/dwp-cookie-consent.css" /> 
    <script src="./js/dwp-cookie-consent.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

          (NB: jquery-ui is only needed if the "slide" parameter is used)

Then add the dwp-consent class to any HTML element:
    <div class=”dwp-consent”>

The cookies page defaults to https://www.gov.uk/help/cookie-details. To override this, include "cookiesPage" in the element:
    <div class="dwp-consent" cookiesPage="https://www.bbc.co.uk/">

By default, the pop-up is attached to the top centre of the page. To have it slide in from the left, use the "slide" parameter:
    <div class="dwp-consent slide">

By default, the retention period for the cookie set by this tool is 28 days. To override this, include "retention-period="[days]" in the element, where [days] = number of days to retain the cookie.

---------------------------------

When invoked, dwp-cookie-consent looks for cookies beginning with 'DWP';
If no DWP cookies are found, a pop-up is displayed.
The pop-up explains our use of cookies and asks for permission to set cookies for advertising and analytic purposes.
The default in each case is 'no'.
The any positive reponses are recorded in a cookie and the popup disappears.

----------------------------------

The cookies are:
    DWP_retention_date  (always set and used to indicate that the user has been informed and asked about our use of cookies)
    DWP_allow_advertising_cookies
    DWP_allow_analytic_cookies

----------------------------------

The cookies expire after 28 days unless another retention period has been set.

----------------------------------


NB: 
 This is a prototype.                                                           
 Wording for the popup has yet to be finalised.                                 
 The look of the popup has yet to be finalised.                                 
 A future version will allow for Welsh to be used as the language of the popup.