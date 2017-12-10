defmodule Linklet.Router do
  use Linklet.Web, :router

  pipeline :api do
    plug :accepts, ["json", "json-api"]

    plug Linklet.Auth.Pipeline
  end

  # Here be the API routes
  scope "/api", Linklet do
    pipe_through :api

    resources "/auth", SessionController, only: [:create]
    resources "/users", UserController, only: [:create]
    resources "/links", LinkController, only: [:index, :show, :create] do
      resources "/comments", CommentController, only: [:index, :create]
    end
  end

  scope "/", Linklet do
    get "/", PageController, :index
  end
end
