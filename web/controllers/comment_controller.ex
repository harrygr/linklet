defmodule Pheddit.CommentController do
  use Pheddit.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, [handler: Pheddit.SessionController] when action in [:create]

  alias Pheddit.Comment

  def create(conn, params) do

    changeset = Guardian.Plug.current_resource(conn)
    |> build_assoc(:comments)
    |> Comment.changeset(params)

    case Repo.insert(changeset) do
      {:ok, comment} ->
        conn
        |> put_status(:created)
        |> render("show.json", comment: Repo.preload(comment, [:user]))
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pheddit.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
