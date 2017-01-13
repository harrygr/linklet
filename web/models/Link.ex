defmodule Pheddit.Link do
  use Pheddit.Web, :model

  @timestamps_opts [usec: false]

  schema "links" do
    field :title
    field :url

    belongs_to :user, Pheddit.User

    timestamps
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:title, :url])
    |> validate_required([:title, :url])
  end

  def ordered(query) do
    query
    |> order_by([l], [desc: l.inserted_at])
  end
end
