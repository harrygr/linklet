defmodule Linklet.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: Linklet.Repo

  alias Linklet.LinkResolver
  alias Linklet.UserResolver
  alias Linklet.CommentResolver
  alias Linklet.SessionResolver

  import_types(Absinthe.Type.Custom)

  # Queries

  object :link do
    field(:id, non_null(:id))

    field(:url, non_null(:string))
    field(:title, non_null(:string))
    field(:created_at, non_null(:naive_datetime), resolve: &resolve_created_date/3)
    field(:score, non_null(:integer), resolve: &LinkResolver.get_score/3)

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
    field(:created_at, non_null(:naive_datetime), resolve: &resolve_created_date/3)

    field(:user, non_null(:user), resolve: assoc(:user))
  end

  object :session do
    field(:jwt, non_null(:string))
    field(:user, non_null(:user))
  end

  object :signup_response do
    field(:user, :user)
    field(:errors, list_of(:error))
  end

  object :error do
    field(:field, non_null(:string))
    field(:messages, list_of(non_null(:string)))
  end

  def resolve_created_date(_root, _args, %{source: %{inserted_at: inserted_at}}) do
    {:ok, inserted_at}
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

  # Mutations

  mutation do
    @desc "Obtain a JWT"
    field :login, type: :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&SessionResolver.login/3)
    end

    @desc "Sign up as a new user"
    field :register, type: :signup_response do
      arg(:email, non_null(:string))
      arg(:username, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&UserResolver.create/3)
    end

    @desc "Create a link"
    field :create_link, type: :link do
      arg(:url, non_null(:string))
      arg(:title, non_null(:string))

      resolve(&LinkResolver.create_link/3)
    end

    @desc "Upvote a link"
    field :upvote_link, type: :link do
      arg(:link_id, non_null(:id))

      resolve(&LinkResolver.upvote/3)
    end
  end
end
