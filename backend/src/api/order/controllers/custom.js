// path: ./src/api/restaurant/controllers/restaurant.js

const https = require('https');
const PaytmChecksum = require('paytmchecksum');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi, env }) => ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    /*
    * import checksum generation utility
    * You can get this utility from https://developer.paytm.com/docs/checksum/
    */

    var paytmParams = {};

    paytmParams.body = {
      "requestType": "Payment",
      "mid": env(MID),
      "websiteName": "goCart",
      "orderId": "ORDERID_98765",
      "callbackUrl": "https://http://localhost:1337/api/orders/posttransaction",
      "txnAmount": {
        "value": "1.00",
        "currency": "INR",
      },
      "userInfo": {
        "custId": "CUST_001",
      },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), env(M_KEY)).then(function (checksum) {

      paytmParams.head = {
        "signature": checksum
      };

      var post_data = JSON.stringify(paytmParams);

      var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: '/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=ORDERID_98765',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
        }
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on('data', function (chunk) {
          response += chunk;
        });

        post_res.on('end', function () {
          console.log('Response: ', response);
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  },

}));

