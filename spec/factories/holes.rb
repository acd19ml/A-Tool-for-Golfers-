# == Schema Information
#
# Table name: holes
#
#  id         :bigint           not null, primary key
#  holeNumber :integer
#  map        :string
#  note       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  course_id  :integer
#
FactoryBot.define do
  factory :hole do
    holeNumber { 1 }
    map { "MyString" }
  end
end
