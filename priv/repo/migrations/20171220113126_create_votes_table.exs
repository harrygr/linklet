defmodule Linklet.Repo.Migrations.CreateVotesTable do
  use Ecto.Migration

  def change do
    create table :votes do
      add :direction, :integer

      add :user_id, references(:users)
      add :link_id, references(:links)

      timestamps()
    end

    create unique_index(:votes, [:user_id, :link_id], name: :user_id_link_id_unique)
  end
end
