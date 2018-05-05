defmodule Linklet.UserResolver do
  alias Linklet.User
  alias Linklet.Repo

  def all(_root, _args, _info) do
    {:ok, Repo.all(User)}
  end

  def get(_root, %{id: user_id}, _info) do
    case Repo.get_by(User, id: user_id) do
      nil -> {:error, "Not found"}
      user -> {:ok, user}
    end
  end

  def create(_root, params, _info) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:error, changeset} ->
        errors = Linklet.ChangesetView.translate_errors(changeset)
        {:ok, %{errors: Enum.map(errors, &format_error/1)}}

      {:ok, user} ->
        {:ok, %{user: user}}
    end
  end

  def format_error({field, messages}) do
    %{
      field: field,
      messages: messages
    }
  end
end
