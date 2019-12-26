class Storage < ApplicationRecord
  has_many :item
  belongs_to :parent, :class_name => "Storage", optional: true
  has_many :children, :class_name => "Storage", :foreign_key => 'parent_id'

  validates :name, presence: true

  scope :top_level, -> {where(:parent_id => nil)}
end
