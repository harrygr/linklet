defmodule Pheddit.LinkController do
  use Pheddit.Web, :controller

  alias Pheddit.Link

  plug Guardian.Plug.EnsureAuthenticated, [handler: Pheddit.SessionController]


  def index(conn, _params) do
    links = Repo.all(Link)
    render conn, "index.json", links: links
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Link, id) do
      nil ->
        conn
        |> put_status(404)
        |> render(Pheddit.ErrorView, "404.json")
      link ->
        render conn, "show.json", link: link
    end
  end

  def create(conn, params) do
    changeset = Link.changeset(%Link{}, params)

    case Repo.insert(changeset) do
      {:ok, link} ->
         conn
         |> put_status(:created)
         |> render("show.json", link: link)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pheddit.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
