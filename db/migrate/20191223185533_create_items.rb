class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :count
      t.integer :price
      t.integer :storage_id
      t.datetime :time_in
      t.datetime :time_out

      t.timestamps
    end
  end
end
