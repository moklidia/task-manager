FactoryBot.define do
  sequence :task do
    name { "MyString" }
    description { "MyText" }
    author_id { 1 }
    assignee_id { 1 }
    state { "MyString" }
    expired_at { "2019-08-10" }
  end

  sequence :user do
    first_name { "MyString" }
    last_name { "MyString" }
    password { "" }
    email { "MyString" }
    avatar { "MyString" }
    type { "" }
  end
end