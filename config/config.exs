# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :linklet,
  ecto_repos: [Linklet.Repo]

# Configures the endpoint
config :linklet, Linklet.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "iqPt0g1kKJmf7IKLVGgtNmHvUEpT+MBktnbtp7G16//tPFDltgS7FWF5X1RyQiTq",
  render_errors: [view: Linklet.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Linklet.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :linklet, Linklet.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: System.get_env("DB_USER") || "phoenix",
  password: System.get_env("DB_PASSWORD") || "",
  database: System.get_env("DB_DATABASE") || "todos_test",
  hostname: System.get_env("DB_HOST") || "127.0.0.1",
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "8")

config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "Linklet",
  ttl: { 30, :days },
  verify_issuer: true, # optional
  secret_key: "YgUaD9Y3TWSJN5EAoOprSt5BhMUDjY03bafIuBacKruCWdy84UNsvWArjxfWQsAB",
  serializer: Linklet.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
