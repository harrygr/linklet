defmodule Linklet.Factory do
  use ExMachina.Ecto, repo: Linklet.Repo

  def link_factory do
    %Linklet.Link{
      title: "A handy site to find stuff on the internet",
      url: "http://google.com",
      user: user_factory()
    }
  end

  def user_factory do
    username = sequence("username")
    %Linklet.User{
      username: username,
      email: "#{username}@example.com",
      password: "password",
      password_hash: "$2b$12$0vG0N2eQwwMZYTPtFXGKA.VoTI0JNlPRP.mG44DEFJmCuKKsiZObi"
    }
  end

  def comment_factory do
    %Linklet.Comment{
      body: "this is a comment",
      user: user_factory()
    }
  end

  def vote_factory do
    %Linklet.Vote{
      direction: 0,
      user: user_factory(),
      link: link_factory()
    }
  end
end
