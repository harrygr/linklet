defmodule Linklet.Link do
  use Linklet.Web, :model

  @timestamps_opts [usec: false]

  alias Linklet.Link

  schema "links" do
    field(:title)
    field(:url)

    field(:comments_count, :integer, virtual: true)
    field(:score, :integer, virtual: true)

    belongs_to(:user, Linklet.User)
    has_many(:comments, Linklet.Comment)
    has_many(:votes, Linklet.Vote)

    timestamps()
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:title, :url])
    |> validate_required([:title, :url])
  end

  def ordered(query) do
    query
    |> order_by([l], desc: l.inserted_at)
  end

  def with_comments() do
    from(
      l in Link,
      left_join: c in assoc(l, :comments),
      group_by: l.id
    )
  end
end
