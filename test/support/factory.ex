defmodule Pheddit.Factory do
  use ExMachina.Ecto, repo: Pheddit.Repo

  def link_factory do
    %Pheddit.Link{
      title: "A handy site to find stuff on the internet",
      url: "http://google.com"
    }
  end

  def user_factory do
    %Pheddit.User{
      username: "joebloggs",
      email: "joe@bloggs.com",
      password: "password",
      password_hash: "$2b$12$0vG0N2eQwwMZYTPtFXGKA.VoTI0JNlPRP.mG44DEFJmCuKKsiZObi"
    }
  end
end
