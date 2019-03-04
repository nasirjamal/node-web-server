const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = 3000;
var app = express();

app.use((req, res, next)=>{
    var now= new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n')
next();
});

// app.use((req, res, next) =>{
//    res.render('maintainence.hbs');
//    //next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials' );
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});


app.set('view engine','hbs');  
app.get('/', (req, res)=>{
res.render('main.hbs', {
    pageTitle: 'Main Page.',
    name: 'Nasir',
    age: 31,
})


// res.send({
//     name: 'Nasir', 
//     age: 31,
//     skillSet: ['Nodejs', 'Javascript', 'Unix']
// })

}); 
 
app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page.',
    });
})

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to handle request!'
    });
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});
