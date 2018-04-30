defmodule Linklet.LinkResolver do
  alias Linklet.Link
  alias Linklet.Repo

  def all(_root, _args, _info) do
    links = Repo.all(Link) |> Repo.preload(:votes)
    {:ok, links}
  end

  def get(_root, %{id: link_id}, _info) do
    case Repo.get_by(Link, id: link_id) do
      nil -> {:error, "Not found"}
      link -> {:ok, link}
    end
  end

  def get_score(%Link{} = link, _args, _info) do
    {:ok, Link.get_score(link |> Repo.preload(:votes))}
  end

  def create_link(_root, args, %{context: %{current_user: user}}) do
    user
    |> Ecto.build_assoc(:links)
    |> Link.changeset(args)
    |> Repo.insert()
  end

  def create_link(_root, _args, _info) do
    {:error, "Access denied"}
  end
end
