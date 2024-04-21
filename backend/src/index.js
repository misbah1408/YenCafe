import express from "express"

const app = express()
const port = process.env.PORT || 5000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('misbah!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})