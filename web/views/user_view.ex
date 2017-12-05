defmodule Linklet.UserView do
  use Linklet.Web, :view

  def render("show.json", %{user: user}) do
    user_json(user)
  end

  def user_json(user) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end
end
