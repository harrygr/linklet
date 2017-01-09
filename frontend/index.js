const html = require('choo/html')
const choo = require('choo')
const log = require('choo-log')
const layout = require('./layout')

const app = choo()

app.use(log())

const models = require('./models')

models.map(model => app.model(model))

app.router(['/', layout(require('./pages/home'))])

const tree = app.start()
document.body.appendChild(tree)
