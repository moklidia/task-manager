# frozen_string_literal: true

FactoryBot.define do
  sequence :name do |n|
    "Name#{n}"
  end
  sequence :description do |n|
    "Description#{n}"
  end
  sequence :expired_at do |n|
    Date.current + n.days
  end
  sequence :first_name do |n|
    "First#{n}"
  end
  sequence :last_name do |n|
    "Last#{n}"
  end
  sequence :password do |n|
    "12345#{n}"
  end
  sequence :email do |n|
    "user#{n}@factory.com"
  end
  sequence :avatar do |n|
    "path/to/avatar#{n}"
  end
end
