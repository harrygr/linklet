defmodule Linklet.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: Linklet.Repo

  alias Linklet.LinkResolver
  alias Linklet.UserResolver
  alias Linklet.CommentResolver

  object :link do
    field(:id, non_null(:id))

    field(:url, non_null(:string))
    field(:title, non_null(:string))

    field(:user, :user, resolve: assoc(:user))
    field(:comments, non_null(list_of(non_null(:comment))), resolve: assoc(:comments))
  end

  object :user do
    field(:id, non_null(:id))
    field(:username, non_null(:string))
    field(:links, non_null(list_of(non_null(:link))), resolve: assoc(:links))

    field(:comments, non_null(list_of(non_null(:comment))), resolve: assoc(:comments))
  end

  object :comment do
    field(:id, non_null(:id))
    field(:body, non_null(:string))

    field(:user, non_null(:user), resolve: assoc(:user))
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

    field :user, :user do
      arg(:id, non_null(:id))
      resolve(&UserResolver.get/3)
    end

    field :comments, non_null(list_of(non_null(:comment))) do
      resolve(&CommentResolver.all/3)
    end
  end
end
