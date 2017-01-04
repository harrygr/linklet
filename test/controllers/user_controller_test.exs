defmodule Pheddit.UserControllerTest do
  use Pheddit.ConnCase

  alias Pheddit.User
  alias Pheddit.UserView

  @valid_attrs %{username: "joebloggs", email: "foo@bar.com", password: "s3cr3t123"}
  @invalid_attrs %{}

  setup %{conn: conn} do
      {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "creates and renders a user when data is valid", %{conn: conn} do
    conn = post conn, user_path(conn, :create), @valid_attrs
    body = json_response(conn, 201)
    assert body["id"]
    assert body["email"]
    refute body["password"]
    assert Repo.get_by(User, email: "foo@bar.com")
  end

  test "does not create user and renders errors when data is invalid", %{conn: conn} do
      conn = post conn, user_path(conn, :create), @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
  end

  test "does not allow registering with details that are already taken", %{conn: conn} do
    Repo.insert(User.registration_changeset(%User{}, @valid_attrs))

    conn = post conn, user_path(conn, :create), @valid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end
end
