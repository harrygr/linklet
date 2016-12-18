defmodule Pheddit.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do
    create table :users do
      add :username, :string, null: false
      add :email, :string, null: false
      add :password_hash, :string

      timestamps()
    end

    create index(:users, [:username], name: :users_username_index, unique: true)
    create index(:users, [:email], unique: true)
  end
end
