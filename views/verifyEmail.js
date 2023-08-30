const verifyEmail = (id) => {
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Email</title>
</head>
<body>
  <center>
    <h3>Hello, <%= email %></h3>
    <p>Thank you for registering with us. Please click on the button below to verify your email.</p>
    <a href="<%=link%>"><button>Verify Email</button></a>
  </center>
</body>
</html>`;
};
module.exports = verifyEmail;
