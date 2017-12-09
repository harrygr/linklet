defmodule Linklet.SessionControllerTest do
  use Linklet.ConnCase

  test "obtains a token for a registered user" do
    user = insert(:user)

    conn = build_conn()
    response = post conn, session_path(conn, :create, %{email: user.email, password: user.password})

    body = json_response(response, 200)
    assert body["user"]["email"] == user.email
    assert body["exp"] > 100
    assert String.length(body["jwt"]) > 10
  end

  test "rejects invalid password for obtaining a token" do
    user = insert(:user)

    conn = build_conn()
    response = post conn, session_path(conn, :create, %{email: user.email, password: "invalid"})

    assert response.status == 401
  end

  test "rejects non existant user for obtaining a token" do
    conn = build_conn()
    response = post conn, session_path(conn, :create, %{email: "nonexistant@email.com", password: "invalid"})

    assert response.status == 401
  end
end
