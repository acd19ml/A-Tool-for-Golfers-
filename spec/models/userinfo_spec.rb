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
require 'rails_helper'

RSpec.describe Userinfo, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
