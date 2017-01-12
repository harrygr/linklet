import html from 'choo/html'
import * as choo from 'choo'
import * as log from 'choo-log'

import models from './models'
import routes from './routes'

const app = choo()

app.use(log())

models.map((model: Object) => app.model(model))

app.router(routes())

const tree = app.start()
document.body.appendChild(tree)
