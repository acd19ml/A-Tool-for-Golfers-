# == Schema Information
#
# Table name: userinfos
#
#  id         :bigint           not null, primary key
#  angle      :decimal(, )
#  club       :string
#  height     :decimal(, )
#  width      :decimal(, )
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Userinfo < ApplicationRecord
end
