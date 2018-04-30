defmodule Linklet.VoteService do
  alias Linklet.Repo
  alias Linklet.Vote

  def vote(%{direction: direction, user_id: user_id, link_id: link_id}) do
    score =
      case direction do
        d when d < 0 -> -1
        d when d > 0 -> 1
        _ -> 0
      end

    case Repo.get_by(Vote, link_id: link_id, user_id: user_id) do
      nil -> %Vote{link_id: link_id, user_id: user_id, direction: score}
      vote -> vote
    end
    |> Vote.changeset(%{link_id: link_id, direction: score})
    |> Repo.insert_or_update()
  end
end
