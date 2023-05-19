class AddForeignKey < ActiveRecord::Migration[7.0]
  def change
    add_column :userinfos, :user_id, :integer
    add_column :annotations, :hole_id, :integer
    add_column :annotations, :user_id, :integer

    add_foreign_key :userinfos, :users, column: :user_id
    add_foreign_key :holes, :courses, column: :course_id
    add_foreign_key :annotations, :holes, column: :hole_id
    add_foreign_key :annotations, :users, column: :user_id
  end
end
