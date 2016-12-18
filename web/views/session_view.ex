defmodule Pheddit.SessionView do
  def render("login.json", conn) do
    %{
      user: Pheddit.UserView.user_json(conn["user"]),
      jwt: conn["jwt"],
      exp: conn["exp"],
      sub: conn["sub"]
    }
  end
end
