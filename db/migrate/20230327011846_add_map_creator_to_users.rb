class AddMapCreatorToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :map_creator, :boolean, default: false
  end
end
