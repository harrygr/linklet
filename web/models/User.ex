defmodule Pheddit.User do
  use Pheddit.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps()
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:username, :email])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
    |> validate_length(:username, min: 1, max: 255)
    |> validate_length(:email, min: 3, max: 255)
    |> validate_format(:email, ~r/@/)
  end

  def registration_changeset(model, params \\ %{}) do
    model
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_required([:username, :email, :password])
    |> validate_length(:password, min: 8)
    |> put_password_hash
  end

  defp put_password_hash(changeset) do
    case changeset do
      %{changes: %{password: pass}} ->
        changeset
        |> put_change(:password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
        |> delete_change(:password)
      _ -> changeset
    end
  end
end
