defmodule Linklet.Schema do
  use Absinthe.Schema

  alias Linklet.LinkResolver

  object :link do
    field(:id, non_null(:id))
    field(:url, non_null(:string))
    field(:title, non_null(:string))
  end

  query do
    # this is the query entry point to our app
    field :all_links, non_null(list_of(non_null(:link))) do
      resolve(&LinkResolver.all_links/3)
    end
  end
end
