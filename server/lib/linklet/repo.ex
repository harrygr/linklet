defmodule Linklet.Repo do
  use Ecto.Repo, otp_app: :linklet
  use Scrivener, page_size: 10
end
