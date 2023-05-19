# == Schema Information
#
# Table name: holes
#
#  id         :bigint           not null, primary key
#  holeNumber :integer
#  map        :string           default("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.dev/svgjs\" width=\"500\" height=\"500\" name=\"draw\"><circle r=\"5\" cx=\"250\" cy=\"250\" fill=\"#ff1100\" name=\"hole\"></circle></svg>")
#  note       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  course_id  :integer
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
FactoryBot.define do
  factory :hole do
    holeNumber { 1 }
    map { "MyString" }
  end
end
