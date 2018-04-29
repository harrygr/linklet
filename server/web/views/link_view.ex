defmodule Linklet.LinkView do
  use Linklet.Web, :view
  alias Linklet.CommentView

  def render("index.json", %{links: links}) do
    Enum.map(links, &multi_link_json/1)
  end

  def render("show.json", %{link: link}) do
    single_link_json link
  end


  def multi_link_json(link) do
    %{
      id: link.id,
      title: link.title,
      url: link.url,
      inserted_at: link.inserted_at,
      updated_at: link.updated_at,
      user: Linklet.UserView.related_user_json(link.user),
      comments_count: link.comments_count,
      votes: Enum.map(link.votes, &Linklet.VoteView.vote_json/1)
    }
  end

  def single_link_json(link) do
    %{
      id: link.id,
      title: link.title,
      url: link.url,
      inserted_at: link.inserted_at,
      updated_at: link.updated_at,
      user: Linklet.UserView.related_user_json(link.user),
      comments: Enum.map(link.comments, &CommentView.comment_json/1),
      votes: Enum.map(link.votes, &Linklet.VoteView.vote_json/1)
    }
  end
end
