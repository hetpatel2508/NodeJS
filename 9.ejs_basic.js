const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'View'));


app.get('', (req, res) => {
    const data = [
        { name: "Het Patel", e_mail: "Hetpatel@gmail.com", contact: 9898 },
        { name: "Urvish Patel", e_mail: "Urvishpatel@gmail.com", contact: 6868 },
        { name: "Dev Patel", e_mail: "Devpatel@gmail.com", contact: 7878 },
        { name: "Deep Patel", e_mail: "Deeppatel@gmail.com", contact: 2828 },
    ];
    res.render('temp', { data });
});
app.listen(6969);



/*
ejs code = 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <center>
        <h1>Welcome To My WebPage...!</h1>
    </center>

    <% data.forEach(item => { %>
        <h3>
            <span>Name = <%= item.name %>  </span>
            <span>  E_Mail = <%= item.e_mail %></span>
            <span>  Contact = <%= item.contact %></span>
        </h3>
    <% }) %>
</body>
</html>

*/