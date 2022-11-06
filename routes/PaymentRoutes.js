const express = require("express");
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});

const router = express.Router();


router.post('/process', (req, res) => {
    console.log("Process Info");
    console.log(req.body.amount);
    console.log(req.body.description);
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8000/pay/success",
            "cancel_url": "https://www.paypal.com/us/home"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.body.amount
            },
            "description": req.body.description
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.redirect("http://localhost:3000/pay/fail");
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.send(payment.links[i].href);
                }
            }
        }
    });
});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
    };

    // Obtains the transaction details from paypal
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
        if (error) {
            console.log(error.response);
            res.redirect("http://localhost:3000/pay/fail");
        } else {
            console.log(JSON.stringify(payment));
            res.redirect("http://localhost:3000/pay/success");
        }
    });
});

module.exports = router;