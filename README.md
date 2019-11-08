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

---------------------------------

This software handles one cookie ("DWP") with an object containing two parameters ("useCookies" & "analytics"):
    DWP={"useCookies":false,"analytics":false}

"useCookies" indicates whether or not the user has given us permission to use cookies.
"analytics" indicates wheteher or not the user has given us permission to use their data for analytic purposes.

---------------------------------

When invoked, dwp-cookie-consent looks for a "DWP" cookie.
If no DWP cookie is found OR if a DWP cookie is found and useCookies = false, a pop-up is displayed.
The pop-up explains our use of cookies and asks for permission to use cookies and to use their data for analytic purposes.
The default in each case is 'no'.
The reponses are recorded in the DWP cookie and the popup disappears.

----------------------------------

The "DWP" cookie expires after 28 days.

----------------------------------


NB: 
 This is a prototype.                                                           
 Wording for the popup has yet to be finalised.                                 
 Naming and format of the "DWP" cookie has yet to be finalised.                 
 The look of the popup has yet to be finalised.                                 
 A future version will allow for Welsh to be used as the language of the popup. 