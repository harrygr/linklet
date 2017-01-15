defmodule Pheddit.LinkController do
  use Pheddit.Web, :controller
  # use Guardian.Phoenix.Controller

  alias Pheddit.Link

  plug Guardian.Plug.EnsureAuthenticated, [handler: Pheddit.SessionController] when action in [:create]


  def index(conn, _params) do
    result = Link
    |> Link.ordered
    |> Link.count_comments
    |> Repo.all
    |> Enum.map(&attach_comments_count/1)
    |> Repo.preload([:user])

    render conn, "index.json", links: result
  end

  defp attach_comments_count({link, count}) do
    Map.put(link, :comments_count, count)
  end

  def show(conn, %{"id" => id}) do
    link = Link
    |> Repo.get(id)
    |> Repo.preload([:user, [comments: {from(c in Pheddit.Comment, order_by: [desc: c.inserted_at]), :user}]])

    case link do
      nil ->
        conn
        |> put_status(404)
        |> render(Pheddit.ErrorView, "404.json")
      link ->
        render conn, "show.json", link: link
    end
  end

  def create(conn, params) do
    changeset = Guardian.Plug.current_resource(conn)
    |> build_assoc(:links)
    |> Link.changeset(params)

    case Repo.insert(changeset) do
      {:ok, link} ->
         conn
         |> put_status(:created)
         |> render("show.json", link: Repo.preload(link, [:user, [comments: :user]]))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pheddit.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
