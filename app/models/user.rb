# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
<<<<<<< HEAD
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id
  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, format: { with: /.*@.*/ }, uniqueness: true
=======
  has_many :assigned_tasks, class_name: 'Task', foreing_key: :assignee_id
  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, format: { with: /^.*@.*$/ }, uniqueness: true
>>>>>>> add assoc and validation
end
