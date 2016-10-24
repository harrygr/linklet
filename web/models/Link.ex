defmodule Pheddit.Link do
  use Pheddit.Web, :model

  schema "links" do
    field :title
    field :url

    timestamps
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :url])
  end
end