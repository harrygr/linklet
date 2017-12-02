defmodule Pheddit.Router do
  use Pheddit.Web, :router

  pipeline :api do
    plug :accepts, ["json", "json-api"]

    plug Guardian.Plug.VerifyHeader, realm: "Bearer" # Looks in the Authorization header for the token
    plug Guardian.Plug.LoadResource
  end

  # Here be the API routes
  scope "/api", Pheddit do
    pipe_through :api

    resources "/auth", SessionController, only: [:create]
    resources "/users", UserController, only: [:create]
    resources "/links", LinkController, only: [:index, :show, :create] do
      resources "/comments", CommentController, only: [:index, :create]
    end
  end

  scope "/", Pheddit do
    get "/", PageController, :index
    get "/*path", PageController, :index
  end
end
