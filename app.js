const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Database = require('./localDataBase/Database');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'v4QTFGfmbFu2u9@pb%ZJ',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Симуляция базы данных
const users = Database.TableUsers(); // default = 5

// установка Passport
passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = users.find(user => user.username === username);
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

// Routes
const indexRoute = require('./routes/index');
const apiRoute = require('./routes/api');

app.use('/', indexRoute);
app.use('/api', apiRoute);

// обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
