const express = require('express');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const expirationTime = 1000 * 60 * 60 * 24; // One Day
const app = express();
const PORT = 8080;

// set views directory as public and engine ejs
app.set('views', 'public');
app.set('view engine', 'ejs');

// set local function for ejs
app.locals.case = (string) => {
  return (string) ? string.charAt(0).toUpperCase()+string.substring(1).toLowerCase() : null
}

// register sessions
app.use(sessions({
    secret: "this_is_my_very_long_secret_key",
    saveUninitialized:true,
    cookie: { maxAge: expirationTime },
    resave: false 
}));

// parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse static requests
app.use('/styles', express.static('public/styles'))
app.use('/', express.static('public/assets'))

// cookie parser middleware
app.use(cookieParser());

// Set routes
require("./app/client.routes")(app);
require("./app/cart.routes")(app);

// Error Page
app.get('*', (req, res) => { res.render('error') });

// Listen for requests
app.listen(PORT, () => { console.log(`Server running on ${PORT}.`) });
