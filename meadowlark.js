const express = require('express')
const expressHandlebars = require('express-handlebars')

const fortune = require('./own_modules/lib/fortune')
const handlers = require('./own_modules/lib/handlers')

const app = express()
const port = process.env.PORT || 3000

/* const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
] */


//configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')


app.use(express.static(__dirname + '/public'))


//Routes
/* app.get('/',(req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel')
}) */

app.get('/', handlers.home)

/* app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
}) */

app.get('/about', handlers.about)

//Middlewares
//custom 404 page
/* app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
}) */
app.use(handlers.notFound)


//custom 500 page
/* app.use((err, req, res, next) =>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
}) */
app.use(handlers.serverError)

/* app.listen(port, () => console.log(
    `Express started on http://localhost:${port}` +
    `press Ctrl-C to terminate.`)) */

if(require.main === module){
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate.')
    })
} else {
    module.exports = app
}