# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
  validates :name, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :description, length: { maximum: 500 }

  state_machine initial: :new_task do
    event :start do
      transition new_task: :in_development
    end

    event :archive do
      transition %i[new_task ready_for_release] => :archived
    end

    event :submit do
      transition in_development: :in_qa
    end

    event :review do
      transition in_qa: :in_code_review
    end

    event :improve do
      transition in_code_review: :in_development
    end

    event :prepare do
      transition in_qa: :ready_for_release
    end

    event :release do
      transition ready_for_release: :released
    end
  end
end
