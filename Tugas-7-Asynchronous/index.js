var readBooks = require('./callback.js')
 
var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000},
    {name: 'komik', timeSpent: 1000}
]

readBooks(10000, books[0], (x) => {
    readBooks(x, books[1], (x) => {
        readBooks(x, books[2], (x) => {
            readBooks(x, books[3], (x) => {
                return
            });
        });
    });
});