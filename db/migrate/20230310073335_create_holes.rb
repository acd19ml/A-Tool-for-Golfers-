class CreateHoles < ActiveRecord::Migration[7.0]
  def change
    create_table :holes do |t|
      t.integer :holeNumber
      t.string :map
      t.string :note
      # t.integer :course_id

      t.timestamps
    end
    # add_foreign_key :holes, :courses
  end
end
