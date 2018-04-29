defmodule Linklet.LinkResolver do
  alias Linklet.Link
  alias Linklet.Repo

  def all(_root, _args, _info) do
    links = Repo.all(Link)
    {:ok, links}
  end

  def get(_root, %{id: link_id}, _info) do
    case Repo.get_by(Link, id: link_id) do
      nil -> {:error, "Not found"}
      link -> {:ok, link}
    end
  end
end
