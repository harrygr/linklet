

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

  def insert_comment(user_id, link_id) do
    Repo.insert!(%Linklet.Comment{
      user_id: user_id,
      link_id: link_id,
      body: Faker.Lorem.paragraph()
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
user2 = Enum.at(users, 1)
user3 = Enum.at(users, 2)

links1 = Linklet.Fakes.fill(fn () -> Linklet.Fakes.insert_link(user1.id) end, 8)
links2 = Linklet.Fakes.fill(fn () -> Linklet.Fakes.insert_link(user2.id) end, 6)
links3 = Linklet.Fakes.fill(fn () -> Linklet.Fakes.insert_link(user3.id) end, 10)

Enum.map(links3, fn (link) ->  case Integer.mod(link.id,3) do
    m when m == 0 -> Linklet.Fakes.insert_comment(user1.id, link.id)
    _ -> nil
  end
end)

IO.inspect(users)
IO.inspect(links1)