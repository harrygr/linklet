defmodule Linklet.SessionController do
  use Linklet.Web, :controller

  alias Linklet.User

  def create(conn, params) do
    case User.find_and_confirm_password(%User{}, params) do
      {:ok, user} ->

        {:ok, jwt, claims} = Linklet.Auth.Guardian.encode_and_sign(user)

        conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> put_resp_header("x-expires", "#{claims["exp"]}")
        |> render("login.json", Map.merge(%{"user" => user, "jwt" => jwt}, claims))
      {:error, changeset, message} ->
        case message do
          :invalid_creds ->
            conn
            |> put_status(401)
            |> render(Linklet.ChangesetView, "error.json", [changeset: changeset, message: "Invalid credentials"])
          :invalid_form ->
            conn
            |> put_status(400)
            |> render(Linklet.ChangesetView, "error.json", [changeset: changeset, message: "Invalid form"])
        end
    end
  end

  def unauthenticated(conn, _) do
    conn
    |> put_status(401)
    |> render(Linklet.ErrorView, "401.json")
  end

end
