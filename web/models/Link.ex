defmodule Pheddit.Link do
  use Pheddit.Web, :model

  @timestamps_opts [usec: false]

  schema "links" do
    field :title
    field :url

    belongs_to :user, Pheddit.User
    has_many :comments, Pheddit.Comment

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

  def count_comments(query) do

    q = from l in query,
      left_join: c in assoc(l, :comments),
      select: {l, count(c.id)},
      group_by: l.id
    q
  end
end
