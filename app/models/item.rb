class Item < ApplicationRecord
  has_one_base64_attached :image
  has_and_belongs_to_many :tags
  belongs_to :storage
end
