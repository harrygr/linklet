defmodule Pheddit.SessionController do
  use Pheddit.Web, :controller

  alias Pheddit.User

  def create(conn, params) do
    case User.find_and_confirm_password(%User{}, params) do
      {:ok, user} ->
        response = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(response)
        claims = get_claims(response)

        response
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> put_resp_header("x-expires", "#{claims["exp"]}")
        |> render("login.json", Map.merge(%{"user" => user, "jwt" => jwt}, claims))
      {:error, changeset, message} ->
        case message do
          :invalid_creds -> 
            conn
            |> put_status(401)
            |> render(Pheddit.ChangesetView, "error.json", [changeset: changeset, message: "Invalid credentials"])
          :invalid_form -> 
            conn
            |> put_status(400)
            |> render(Pheddit.ChangesetView, "error.json", [changeset: changeset, message: "Invalid form"])
        end
    end
  end

  def unauthenticated(conn, _) do
    conn
    |> put_status(401)
    |> render(Pheddit.ErrorView, "401.json")
  end



  defp get_claims(conn) do
    case Guardian.Plug.claims(conn) do
      {:ok, claims} -> Map.take(claims, ["exp", "sub"])
      _ -> %{"exp" => "", "sub" => ""}
    end
  end
end
