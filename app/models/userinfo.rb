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
#
class Userinfo < ApplicationRecord
    belongs_to :user
end
