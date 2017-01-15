defmodule Pheddit.CommentView do
  use Pheddit.Web, :view

  def render("index.json", %{comments: comments}) do
    Enum.map(comments, &comment_json/1)
  end

  def render("show.json", %{comment: comment}) do
    comment_json comment
  end

  def comment_json(comment) do
    %{
      id: comment.id,
      body: comment.body,
      inserted_at: comment.inserted_at,
      updated_at: comment.updated_at,
      link_id: comment.link_id,
      user: Pheddit.UserView.user_json(comment.user)
    }
  end
end
