# == Schema Information
#
# Table name: holes
#
#  id         :bigint           not null, primary key
#  holeNumber :integer
#  map        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :hole do
    holeNumber { 1 }
    map { "MyString" }
  end
end
