defmodule Linklet.Vote do
  use Linklet.Web, :model

  @timestamps_opts [usec: false]

  schema "votes" do
    field(:direction, :integer)

    belongs_to(:user, Linklet.User)
    belongs_to(:link, Linklet.Link)

    timestamps()
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:link_id, :user_id, :direction])
    |> validate_required([:link_id, :user_id, :direction])

    # |> unique_constraint([:link_id, :user_id])
  end
end
