/**
 * Modify the config Scaphold URL to point to your specific app.
 * Find the URL at the top of the page on Scaphold.io once you've created an app.
 * Yup. It's that easy.
 */

var config = {
	scapholdAppId: "meshboard",
	scapholdUrl: "https://api.scaphold.io/graphql/meshboard",
	// scapholdUrl: "http://localhost:3000/graphql/meshboard",
	scapholdSubscriptionUrl: "https://subscribe.api.scaphold.io"
	// scapholdSubscriptionUrl: "http://localhost:3000"
}

module.exports = config;