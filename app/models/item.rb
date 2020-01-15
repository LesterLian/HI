class Item < ApplicationRecord
  has_one_base64_attached :image
  has_and_belongs_to_many :tags
  belongs_to :storage

  validates :name, :image, presence: true
  validates :count, :price, numericality: { only_integer: true }

  scope :has_tags, -> (tags) {
    joins(:tags)
    .where(tags: {id: tags})
    .select("items.*, count(tags.id) as tags")
    .group(:id)
    .having("tags >= ?", tags.length)
  }
end
