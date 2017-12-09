defmodule Linklet.SessionView do
  def render("login.json", conn) do
    %{
      user: Linklet.UserView.user_json(conn["user"]),
      jwt: conn["jwt"],
      exp: conn["exp"],
      sub: conn["sub"]
    }
  end
end
