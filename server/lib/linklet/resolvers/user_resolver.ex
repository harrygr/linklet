defmodule Linklet.UserResolver do
  alias Linklet.User
  alias Linklet.Repo

  def all(_root, _args, _info) do
    {:ok, Repo.all(User)}
  end

  def get(_root, %{id: user_id}, _info) do
    case Repo.get_by(User, id: user_id) do
      nil -> {:error, "Not found"}
      user -> {:ok, user}
    end
  end
end
