class Tag < ApplicationRecord
    has_and_belongs_to_many :items
    belongs_to :parent, :class_name => "Tag", optional: true
    has_many :children, :class_name => "Tag", :foreign_key => 'parent_id'

    scope :top_level, -> {where(:parent_id => nil)}
end
