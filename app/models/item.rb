class Item < ApplicationRecord
  has_one_base64_attached :image
  has_and_belongs_to_many :tags
  belongs_to :storage

  validates :name, :image, presence: true
  validates :count, :price, numericality: { only_integer: true }
end
