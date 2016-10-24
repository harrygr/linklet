defmodule Pheddit.PageController do
  use Pheddit.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
