defmodule Linklet.Repo.Migrations.CreateLinksTable do
  use Ecto.Migration

  def change do
    create table :links do
      add :title, :string
      add :url, :string
      add :user_id, references(:users)

      timestamps()
    end
  end
end
