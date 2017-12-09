defmodule Linklet.PageController do
  use Linklet.Web, :controller

  def index(conn, _params) do
    # render conn, "index.html"
    send_file(conn, 200, "frontend/build/index.html")
  end
end
