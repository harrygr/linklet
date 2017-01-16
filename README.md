# Pheddit

Pheddit is a simple Reddit/HackerNews clone. It uses Elixir/[Phoenix][1] for the backend and [Choo][2] in TypeScript for the frontend.

Requirements:

  * Elixir/Erlang
  * MySQL
  * Node/NPM

To run locally:

  * Enter your database credentials in `config/dev.exs` or export the appropriate env variables
  * Install dependencies with `mix deps.get` and `yarn install`/`npm install`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start the Phoenix server and compile and watch the front end with `npm run dev`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check the deployment guides](http://www.phoenixframework.org/docs/deployment).

[1]: http://www.phoenixframework.org
[2]: https://choo.io/