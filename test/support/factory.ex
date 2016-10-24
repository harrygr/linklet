defmodule Pheddit.Factory do
  use ExMachina.Ecto, repo: Pheddit.Repo
  def link_factory do
    %Pheddit.Link{
      title: "A handy site to find stuff on the internet",
      url: "http://google.com"
    }
  end
end