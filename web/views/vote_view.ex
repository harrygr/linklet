defmodule Linklet.VoteView do
  use Linklet.Web, :view

  def render("show.json", %{vote: vote}) do
    vote_json vote
  end

  def vote_json(vote) do
    %{
      direction: vote.direction,
      link_id: vote.link_id,
      user_id: vote.user_id,
      inserted_at: vote.inserted_at,
      updated_at: vote.updated_at,
    }
  end
end
