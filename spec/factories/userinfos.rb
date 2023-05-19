# == Schema Information
#
# Table name: userinfos
#
#  id         :bigint           not null, primary key
#  club       :string
#  distance   :decimal(, )
#  height     :decimal(, )
#  length     :decimal(, )
#  rotation   :decimal(, )
#  width      :decimal(, )
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :userinfo do
    club { "MyString" }
    height { "9.99" }
    width { "9.99" }
    angle { "9.99" }
  end
end
