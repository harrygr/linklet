defmodule Linklet.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: Linklet.Repo

  alias Linklet.LinkResolver
  alias Linklet.UserResolver

  object :link do
    field(:id, non_null(:id))
    field(:url, non_null(:string))
    field(:title, non_null(:string))
    field(:user, :user, resolve: assoc(:user))
  end

  object :user do
    field(:id, non_null(:id))
    field(:username, non_null(:string))
  end

  query do
    # this is the query entry point to our app
    field :links, non_null(list_of(non_null(:link))) do
      resolve(&LinkResolver.all/3)
    end

    field :link, :link do
      arg(:id, non_null(:id))
      resolve(&LinkResolver.get/3)
    end

    field :users, non_null(list_of(non_null(:user))) do
      resolve(&UserResolver.all/3)
    end
  end
end
