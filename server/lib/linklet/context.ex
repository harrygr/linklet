defmodule Linklet.Context do
  @behaviour Plug

  def init(opts), do: opts

  def call(conn, _) do
    u = Guardian.Plug.current_resource(conn)
    IO.inspect(u)

    case Guardian.Plug.current_resource(conn) do
      nil -> Absinthe.Plug.put_options(conn, context: %{})
      user -> Absinthe.Plug.put_options(conn, context: %{current_user: user})
    end
  end
end
