defmodule Linklet.VoteController do
  use Linklet.Web, :controller

  plug(
    Guardian.Plug.EnsureAuthenticated,
    [handler: Linklet.SessionController] when action in [:create]
  )

  def create(conn, %{"link_id" => link_id, "direction" => direction}) do
    user = Guardian.Plug.current_resource(conn)

    result = Linklet.VoteService.vote(%{link_id: link_id, direction: direction, user_id: user.id})

    case result do
      {:ok, vote} ->
        conn
        |> put_status(:created)
        |> render("show.json", vote: vote)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(
          Linklet.ChangesetView,
          "error.json",
          changeset: changeset,
          message: "Invalid form"
        )
    end
  end
end
