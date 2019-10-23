require("dotenv").config();
var sg = require("sendgrid")(process.env.SG_MAIL_KEY);

module.exports = {
  sendMessage: (req, res) => {
    var request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: {
        personalizations: [
          {
            to: [
              {
                email: req.body.email
              }
            ],
            subject: req.body.subject
          }
        ],
        from: {
          email: "no-reply@busy-bee.com"
        },
        content: [
          {
            type: "text/html",
            value: req.body.message
          }
        ]
      }
    });
    sg.API(request)
      .then(info => {
        res.json(info);
      })
      .catch(err => res.json(err));
  }
};
