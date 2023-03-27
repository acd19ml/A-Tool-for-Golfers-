class RemoveRoleFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :role, :string
    remove_column :courses, :map_creator, :boolean, default: false
  end
end
