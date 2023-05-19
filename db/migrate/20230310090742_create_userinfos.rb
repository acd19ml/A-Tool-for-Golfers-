class CreateUserinfos < ActiveRecord::Migration[7.0]
  def change
    create_table :userinfos do |t|
      t.string :club
      t.decimal :distance
      t.decimal :length
      t.decimal :height
      t.decimal :width
      t.decimal :rotation
      t.integer :user_id

      t.timestamps
    end
  end
end
