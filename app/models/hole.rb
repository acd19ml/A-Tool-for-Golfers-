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
class Hole < ApplicationRecord
    has_many :annotations
    belongs_to :course
end
