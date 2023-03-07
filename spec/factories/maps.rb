# == Schema Information
#
# Table name: maps
#
#  id         :bigint           not null, primary key
#  name       :string
#  path       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :map do
    name { "MyString" }
    path { "MyString" }
  end
end
