defmodule Pheddit.LinkViewTest do
  use Pheddit.ConnCase
  import Pheddit.Factory
  alias Pheddit.LinkView

  test "link_json" do
    link = insert(:link)

    rendered_link = LinkView.link_json(link)

    assert rendered_link == %{
      id: link.id,
      title: link.title,
      url: link.url,
      inserted_at: link.inserted_at,
      updated_at: link.updated_at
    }
  end

  test "index.json" do
    link = insert(:link)

    rendered_links = LinkView.render("index.json", %{links: [link]})

    assert rendered_links == [LinkView.link_json(link)]
  end

  test "show.json" do
    link = insert(:link)

    rendered_link = LinkView.render("show.json", %{link: link})

    assert rendered_link == LinkView.link_json(link)
  end

end
