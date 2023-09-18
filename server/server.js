const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post(":endpoint([\\/\\w\\.-]*)", (req, res) => {
  let endpoint = "https://sandbox.alloy.co/v1/evaluations";
  axios.defaults.headers["authorization"] = process.env.VITE_API_KEY;
  const bodyEmail = req.body.email;
  const bodyName = req.body.name_first;
  const bodyNameLast = req.body.name_last;
  const bodyAddress1 = req.body.address_line_1;
  const bodyAddress2 = req.body.address_line_2;
  const bodyCity = req.body.address_city;
  const bodyState = req.body.address_state;
  const bodyZip = req.body.address_postal_code;
  const bodySSN = req.body.document_ssn;
  const bodyDOB = req.body.birth_date;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const dataBody = {
    name_first: bodyName,
    name_last: bodyNameLast,
    emails: [
      {
        email: bodyEmail,
      },
    ],
    addresses: [
      {
        address_line_1: bodyAddress1,
        address_line_2: bodyAddress2,
        address_city: bodyCity,
        address_state: bodyState,
        address_postal_code: bodyZip,
        address_country_code: "US",
      },
    ],
    document_ssn: bodySSN,
    birth_date: bodyDOB,
  };

  axios
    .post(endpoint, dataBody, config)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
