class AddForeignKey < ActiveRecord::Migration[7.0]
  def change
    add_column :userinfos, :user_id, :integer

    add_foreign_key :userinfos, :users, column: :user_id
  end
end
