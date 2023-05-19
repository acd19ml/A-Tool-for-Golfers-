class CreateHoles < ActiveRecord::Migration[7.0]
  def change
    create_table :holes do |t|
      t.integer :holeNumber
      t.string :map, default: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.dev/svgjs\" width=\"500\" height=\"500\" name=\"draw\"><circle r=\"5\" cx=\"250\" cy=\"250\" fill=\"#ff1100\" name=\"hole\"></circle></svg>"
      t.string :note
      t.integer :course_id

      t.timestamps
    end
    # add_foreign_key :holes, :courses
  end
end
