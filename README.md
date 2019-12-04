A plug-in to create EU Cookie Law popups.

Run demo.html to see it in action.

---------------------------------

TO GET STARTED:

Import the cookie-consent javascript file and (if necessary) the govuk.css file and add them to the html of the calling page:
    
    
    <script src="./js/dwp-cookie-consent.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/govuk.css">


    Then include the "dwp-consent" class in the body  element:

    <body class="dwp-consent">


---------------------------------

OPTIONAL PARAMETERS:

The cookies page defaults to https://www.gov.uk/help/cookie-details. To override this, include "dwp-consent-cookiesPage" in the body element:
    
    <body class="dwp-consent" dwp-consent-cookies-page="https://www.bbc.co.uk/">


By default, the retention period for the cookie set by this tool is 28 days. To override this, include "dwp-consent-retention-period=[days] in the body element, where [days] = number of days to retain the cookie.
    
    <body class="dwp-consent" dwp-consent-retention-period=45>


In the rare cases where advertising cookies are used, these can be asked about by adding the "dwp-consent-advertising" class:

    <body class="dwp-consent dwp-consent-advertising">


To display the page and banner in Welsh, add the "dwp-consent-welsh" class:
    
    <body class="dwp-consent dwp-consent-welsh">


Normally, the cookies banner will only appear on the first page of the app that the user lands on. To force it to appear on a page regardless of whether or not it's the first one visited, use "dwp-consent-force":

    <body class="dwp-consent dwp-consent-force">

---------------------------------

When invoked, dwp-cookie-consent looks for cookies beginning with 'DWP';
If no DWP cookies are found, the DWP Cookie Consent page is displayed.
The pop-up explains our use of cookies and asks for permission to set cookies for advertising and analytic purposes.
The default in both theses cases is 'no'.
Responses are recorded as true and force in cookie and the popup disappears.

If there are DWP cookies already, a banner appears at the top of the page offering the user the opportunity to change their cookie permissions

----------------------------------

The cookies are:

    DWP_allow_essential_cookies
    DWP_allow_advertising_cookies - set to true if permission to use advertising cookies is given
    DWP_allow_analytic_cookies - set to true if permission to use analytic cookies is given

----------------------------------

The cookies expire after 28 days unless a different retention period has been set.

----------------------------------
