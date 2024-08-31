class Column < ApplicationRecord
  has_many :tasks, -> { order(:position) }, dependent: :destroy
end