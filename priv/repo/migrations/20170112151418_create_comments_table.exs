defmodule Pheddit.Repo.Migrations.AddLinksTable do
  use Ecto.Migration

  def change do
    create table :comments do
      add :body, :text

      add :user_id, references(:users)
      add :comment_id, references(:comments), null: true
      add :link_id, references(:links)

      timestamps
    end
  end
end
