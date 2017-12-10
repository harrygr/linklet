defmodule Linklet.PageController do
  use Linklet.Web, :controller

  def index(conn, _params) do
    text conn, "Welcome to linklet"
  end
end
