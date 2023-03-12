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
require 'rails_helper'

RSpec.describe Hole, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
