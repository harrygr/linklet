
defmodule Linklet.Auth.Guardian do
  use Guardian, otp_app: :linklet

  alias Linklet.Repo
  alias Linklet.User


  def subject_for_token(user, _claims) do
    {:ok, to_string(user.id)}
  end

  def resource_from_claims(claims) do
    user = Repo.get(User, claims["sub"])

    {:ok, user}
    # If something goes wrong here return {:error, reason}
  end
end