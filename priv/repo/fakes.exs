

alias Linklet.Repo

defmodule Linklet.Fakes do
  def insert_user() do
    Repo.insert!(%Linklet.User{
      username: Faker.Internet.user_name(),
      email: Faker.Internet.email(),
      password_hash: "$2a$04$6WxbBxHvlhDIShEswSUxYOG7UEYEHUPpwVt9tcfCxJokYQc.yKHDi"
    })
  end

  def insert_link(user_id) do
    Repo.insert!(%Linklet.Link{
      title: Faker.App.name,
      url: Faker.Internet.url,
      user_id: user_id
    })
  end

  def fill(func, times) do
    fill(func, times, [])
  end

  def fill(func, times, list) do
    case Enum.count(list) do
      n when n == times -> list
      _ -> fill(func, times, [func.() | list])
    end
  end
end

users = Linklet.Fakes.fill(&Linklet.Fakes.insert_user/0, 5)
user1 = Enum.at(users, 0)

links = Linklet.Fakes.fill(fn () -> Linklet.Fakes.insert_link(user1.id) end, 10)
IO.inspect(users)
IO.inspect(links)