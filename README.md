# Pheddit

Pheddit is a simple Reddit/HackerNews clone. It uses Elixir/[Phoenix][1] for the backend and React/Redux in TypeScript for the frontend.

Requirements:

  * Elixir/Erlang
  * MySQL
  * Node/NPM

To run locally:

  * Enter your database credentials in `config/dev.exs` or export the appropriate env variables
  * Install dependencies with `mix deps.get` and `cd frontend; yarn install`/`npm install`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start the Phoenix server. This will serve the build frontend files as well as provide the api.

    ```
    mix phoenix.server
    ```
  * Start the frontend dev server. This serves the frontend using the webpack server so you get live reload.

    ```
    cd frontend
    yarn start
    ```

Now you can visit [`localhost:3000`](http://localhost:3000) from your browser. The Phoenix server runs on [`localhost:4000`](http://localhost:4000)

Ready to run in production? Please [check the deployment guides](http://www.phoenixframework.org/docs/deployment).

[1]: http://www.phoenixframework.org
[2]: https://choo.io/
