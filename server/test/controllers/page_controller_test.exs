defmodule Linklet.PageControllerTest do
  use Linklet.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert text_response(conn, 200)
  end
end
