# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Linklet.Repo.insert!(%Linklet.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Linklet.Repo

Repo.delete_all Linklet.Comment
Repo.delete_all Linklet.Link
Repo.delete_all Linklet.User

user1 = Repo.insert!(%Linklet.User{
  username: "testuser",
  email: "test@example.com",
  password_hash: "$2a$04$6WxbBxHvlhDIShEswSUxYOG7UEYEHUPpwVt9tcfCxJokYQc.yKHDi"
  })

user2 = Repo.insert!(%Linklet.User{
  username: "testuser2",
  email: "test2@example.com",
  password_hash: "$2a$04$6WxbBxHvlhDIShEswSUxYOG7UEYEHUPpwVt9tcfCxJokYQc.yKHDi"
  })

link = Repo.insert!(%Linklet.Link{
  title: "Test Site",
  url: "http://google.com",
  user_id: user1.id
})

Repo.insert!(%Linklet.Comment{
  body: "This is a comment",
  user_id: user1.id,
  link_id: link.id
})
Repo.insert!(%Linklet.Comment{
  body: "This is another comment",
  user_id: user2.id,
  link_id: link.id
})