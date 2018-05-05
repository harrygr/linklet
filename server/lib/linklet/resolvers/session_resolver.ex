defmodule Linklet.SessionResolver do
  alias Linklet.User
  alias Linklet.Repo

  def login(_root, params, _context) do
    case User.find_and_confirm_password(%User{}, params) do
      {:ok, user} ->
        {:ok, jwt, claims} = Linklet.Auth.Guardian.encode_and_sign(user)
        {:ok, %{jwt: jwt, user: user}}

      {:error, changeset, message} ->
        case message do
          :invalid_creds -> {:error, "Invalid credentials"}
          :invalid_form -> {:error, "Invalid form"}
        end
    end
  end
end
