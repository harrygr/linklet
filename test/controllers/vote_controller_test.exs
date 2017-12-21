defmodule Linklet.VoteControllerTest do
  use Linklet.ConnCase

  def get_authenticated_conn(user \\ nil) do
    user =  if (user == nil), do: insert(:user), else: user

    {:ok, jwt, _full_claims} = Guardian.encode_and_sign(Linklet.Auth.Guardian, user)

    build_conn()
    |> put_req_header("authorization", "Bearer #{jwt}")
  end

  test "#create upvotes a link where a vote already exists", %{} do
    vote = insert(:vote)

    response = get_authenticated_conn()
      |> post("/api/votes", %{link_id: vote.link.id, direction: 1})


    %{"direction" => direction} = json_response(response, :created) |> Poison.encode! |> Poison.decode!
    assert direction == 1
  end

  test "#create downvotes a link where a vote already exists", %{} do
    vote = insert(:vote)

    response = get_authenticated_conn()
      |> post("/api/votes", %{link_id: vote.link.id, direction: -1})


    %{"direction" => direction} = json_response(response, :created) |> Poison.encode! |> Poison.decode!
    assert direction == -1
  end

  test "#create upvotes a link where a vote hasn't yet been created", %{} do
    user = insert(:user)
    link = insert(:link)

    response = get_authenticated_conn(user)
      |> post("/api/votes", %{link_id: link.id, direction: 1})


    %{"direction" => direction} = json_response(response, :created) |> Poison.encode! |> Poison.decode!
    assert direction == 1
  end
end
