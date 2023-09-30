const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('users.db')
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS customers (
        cid INTEGER PRIMARY KEY AUTOINCREMENT,
        nev TEXT,
        un TEXT,
        pwhash TEXT
    );
    CREATE INDEX customers_cid_IDX ON customers (cid);
    CREATE INDEX customers_nev_IDX ON customers (nev);
    CREATE INDEX customers_nev_IDX ON customers (un);`)
  })
const cors = require('cors')
const app = express()
const port = 3000
app.use(express.static('frontend'))
app.use(cors())

app.get('/be/:id', (req, res) => {
    res.send(req.params.id.split("").reverse().join(""))
})

app.get('/reg/:data', (req, res) => {
    var user = Object.fromEntries(req.params.data.split('|').map(v => v.split('¨')))
    db.run(`INSERT INTO customers (un, nev, pwhash) VALUES ('${user.un}', '${user.nev}', '${user.pw}')`)
})

app.listen(port, () => {
  console.log(`\x1b[33mStrated:
    \x1b[36mhttp://localhost:${port}\x1b[0m`)
})