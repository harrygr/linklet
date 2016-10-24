defmodule Pheddit.Router do
  use Pheddit.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Pheddit do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Here be the API routes
  scope "/api", Pheddit do
    pipe_through :api

    resources "/links", LinkController, only: [:index, :show, :create]
  end
end
