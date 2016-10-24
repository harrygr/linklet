# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :pheddit,
  ecto_repos: [Pheddit.Repo]

# Configures the endpoint
config :pheddit, Pheddit.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "iqPt0g1kKJmf7IKLVGgtNmHvUEpT+MBktnbtp7G16//tPFDltgS7FWF5X1RyQiTq",
  render_errors: [view: Pheddit.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Pheddit.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
