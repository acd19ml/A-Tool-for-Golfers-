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
require 'rails_helper'

RSpec.describe Hole, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
