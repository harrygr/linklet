defmodule Pheddit.Endpoint do
  use Phoenix.Endpoint, otp_app: :pheddit

  socket "/socket", Pheddit.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static.IndexHtml, at: ""
  plug Plug.Static,
    at: "/", from: "frontend/build", gzip: false
    # only: ~w(index.html favicon.ico static service-worker.js manifest.json)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_pheddit_key",
    signing_salt: "n1+mnGZr"

  plug CORSPlug
  plug Pheddit.Router
end
