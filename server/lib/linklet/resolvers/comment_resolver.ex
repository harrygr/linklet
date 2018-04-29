defmodule Linklet.CommentResolver do
  alias Linklet.Comment
  alias Linklet.Repo

  def all(_root, _args, _info) do
    {:ok, Repo.all(Comment)}
  end

  def get(_root, %{id: comment_id}, _info) do
    case Repo.get_by(Comment, id: comment_id) do
      nil -> {:error, "Not found"}
      comment -> {:ok, comment}
    end
  end
end
