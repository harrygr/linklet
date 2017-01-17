defmodule Pheddit.LinkView do
  use Pheddit.Web, :view


  def render("index.json", %{links: links}) do
    Enum.map(links, &link_json/1)
  end

  def render("show.json", %{link: link}) do
    link_json link
  end

  def link_json(link) do
    comments_count = if (Map.has_key?(link, :comments_count)), do: link.comments_count, else: 0

    %{
      id: link.id,
      title: link.title,
      url: link.url,
      inserted_at: link.inserted_at,
      updated_at: link.updated_at,
      user: Pheddit.UserView.user_json(link.user),
      comments_count: comments_count
    }
  end
end
