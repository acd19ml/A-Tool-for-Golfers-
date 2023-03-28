# == Schema Information
#
# Table name: holes
#
#  id         :bigint           not null, primary key
#  holeNumber :integer
#  map        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  course_id  :integer
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
class Hole < ApplicationRecord
    has_many :annotations
    belongs_to :course
end
