defmodule Pheddit.LinkView do
  use Pheddit.Web, :view
  alias Pheddit.CommentView

  def render("index.json", %{links: links}) do
    Enum.map(links, &multi_link_json/1)
  end

  def render("show.json", %{link: link}) do
    single_link_json link
  end


  def multi_link_json(link) do
    comments_count = if (Map.has_key?(link, :comments_count)), do: link.comments_count, else: 0

    %{
      id: link.id,
      title: link.title,
      url: link.url,
      inserted_at: link.inserted_at,
      updated_at: link.updated_at,
      user: Pheddit.UserView.user_json(link.user),
      comments_count: link.comments_count,
    }
  end

  def single_link_json(link) do
    %{
      id: link.id,
      title: link.title,
      url: link.url,
      inserted_at: link.inserted_at,
      updated_at: link.updated_at,
      user: Pheddit.UserView.user_json(link.user),
      comments: Enum.map(link.comments, &CommentView.comment_json/1)
    }
  end
end
