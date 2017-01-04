defmodule Pheddit.UserTest do
  use Pheddit.ModelCase

  alias Pheddit.User

  @valid_attrs %{email: "bar@baz.com", password: "s3cr3ted", username: "joebloggs"}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset, email too short " do
    changeset = User.changeset(
      %User{}, Map.put(@valid_attrs, :email, "f")
    )
    refute changeset.valid?
  end

  test "changeset, email invalid format" do
    changeset = User.changeset(
      %User{}, Map.put(@valid_attrs, :email, "foo.com")
    )
    refute changeset.valid?
  end

  test "registration_changeset, password long enough" do
    changeset = User.registration_changeset(%User{}, @valid_attrs)
    assert changeset.changes.password_hash
    assert changeset.valid?
  end

  test "registration_changeset, password too short" do
    changeset = User.registration_changeset(
      %User{}, Map.put(@valid_attrs, :password, "12345")
    )
    refute changeset.valid?
  end

  test "registration_changeset, no password provided" do
    changeset = User.registration_changeset(%User{}, %{username: 'fooface', email: 'hello@me.com'})
    refute changeset.valid?
  end
end
