class CreateAnnotations < ActiveRecord::Migration[7.0]
  def change
    create_table :annotations do |t|
      t.decimal :annotationMap
      t.integer :hole_id
      t.integer :user_id

      t.timestamps
    end
    # add_foreign_key :annotations, :holes, :users
  end
end