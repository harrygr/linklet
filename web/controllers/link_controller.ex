defmodule Pheddit.LinkController do
  use Pheddit.Web, :controller

  alias Pheddit.Link

  def index(conn, _params) do
    links = Repo.all(Link)
    render conn, "index.json", links: links
  end

  def show(conn, %{"id" => id}) do
    link = Repo.get!(Link, id)
    render conn, "show.json", link: link
  end

  def create(conn, params) do
    changeset = Link.changeset(%Link{}, params)

    case Repo.insert(changeset) do
      {:ok, link} ->
         conn 
         |> put_status(:created) 
         |> render("show.json", link: link)
    end
  end
end
