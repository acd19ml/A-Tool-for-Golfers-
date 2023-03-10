class CreateUserinfos < ActiveRecord::Migration[7.0]
  def change
    create_table :userinfos do |t|
      t.string :club
      t.decimal :height
      t.decimal :width
      t.decimal :angle

      t.timestamps
    end
  end
end
