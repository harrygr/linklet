defmodule Linklet.LinkController do
  use Linklet.Web, :controller

  alias Linklet.Link

  plug Guardian.Plug.EnsureAuthenticated when action in [:create]

  def index(conn, _params) do
    query = from [l, c, v] in Link.with_score_and_comments(),
      preload: [:user],
      select: %{%{l | comment_count: count(c.id)} | score: fragment("CONVERT(ifnull(?, 0), SIGNED)", sum(v.direction))}

    links = query
      |> Repo.all

    render conn, "index.json", links: links
  end

  def show(conn, %{"id" => id}) do

    query = from [l, c, v] in Link.with_score_and_comments(),
      where: [id: ^id],
      preload: [:user, :comments],
      select: %{%{l | comment_count: count(c.id)} | score: fragment("CONVERT(ifnull(?, 0), SIGNED)", sum(v.direction))}

    result = query
      |> Repo.one

    case result do
      nil ->
        conn
        |> put_status(404)
        |> render(Linklet.ErrorView, "404.json")
      result ->
        render conn, "show.json", link: result
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
        |> render(Linklet.ChangesetView, "error.json", [changeset: changeset, message: "Invalid form"])
    end
  end
end
