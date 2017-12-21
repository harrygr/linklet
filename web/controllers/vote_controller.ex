defmodule Linklet.VoteController do
  use Linklet.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, [handler: Linklet.SessionController] when action in [:create]

  alias Linklet.Vote

  def create(conn, %{"link_id" => link_id, "direction" => direction}) do
    user = Guardian.Plug.current_resource(conn)


    result =
      case Repo.get_by(Vote, link_id: link_id, user_id: user.id) do
        nil -> %Vote{link_id: link_id, user_id: user.id, direction: direction}
        vote -> vote
      end
      |> Vote.changeset(%{"link_id" => link_id, "direction" => direction})
      |> Repo.insert_or_update


    case result do
      {:ok, vote} ->
        conn
        |> put_status(:created)
        |> render("show.json", vote: vote)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Linklet.ChangesetView, "error.json", [changeset: changeset, message: "Invalid form"])
    end
  end
end