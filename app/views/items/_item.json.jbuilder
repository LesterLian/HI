json.extract! item, :id, :name, :count, :price, :storage_id, :time_in, :time_out, :created_at, :updated_at
json.url item_url(item, format: :json)
