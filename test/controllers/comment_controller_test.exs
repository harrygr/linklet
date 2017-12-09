defmodule Linklet.CommentControllerTest do
  use Linklet.ConnCase

  def get_authenticated_conn(user \\ nil) do
    user =  if (user == nil), do: insert(:user), else: user

    {:ok, jwt, _full_claims} = Guardian.encode_and_sign(Linklet.Auth.Guardian, user)

    build_conn()
    |> put_req_header("authorization", "Bearer #{jwt}")
  end

  test "#create adds a new comment" do
    link = insert(:link)

    comment = %{body: "A wonderful comment", link_id: link.id}

    conn = post get_authenticated_conn(link.user), "/api/links/#{link.id}/comments", comment

    response = json_response(conn, :created) |> Poison.encode! |> Poison.decode!

    %{"body" => body, "user" => user} = response

    assert comment.body == body
    assert user["id"] > 0
  end

  test "#create authenticates before creating a comment" do
    comment = %{body: "A wonderful comment", link_id: 1}

    conn = build_conn()

    response = post conn, "/api/links/1/comments", comment
    assert response.status == 401
  end

end
