defmodule Linklet.LinkResolver do
  alias Linklet.Link
  alias Linklet.Repo

  def all_links(_root, _args, _info) do
    links = Repo.all(Link)
    {:ok, links}
  end
end
