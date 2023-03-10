# == Schema Information
#
# Table name: user_infos
#
#  id         :bigint           not null, primary key
#  angle      :decimal(, )
#  club       :string
#  height     :decimal(, )
#  width      :decimal(, )
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :user_info do
    club { "MyString" }
    height { "9.99" }
    width { "9.99" }
    angle { "9.99" }
  end
end
