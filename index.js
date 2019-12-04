// code away!
const server = require('./server')

const port = 4002

server.listen(port, () => {
    console.log(`server is listening on ${port}`)
})