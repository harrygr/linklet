defmodule Pheddit.Authenticator do
  alias Pheddit.User

  def authenticate(%{email: email, password: password}) do
    user = Pheddit.Repo.get_by(User, email: String.downcase(email))

    case user do
      nil -> {:error, "User does not exist"}
      _   ->
        case Comeonin.Bcrypt.checkpw(password, user.password_hash) do
          true -> {:ok, user}
          _ -> {:error, "Invalid credentials"}
        end
    end
  end
end
