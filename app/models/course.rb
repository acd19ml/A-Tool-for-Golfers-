# == Schema Information
#
# Table name: courses
#
#  id         :bigint           not null, primary key
#  name       :string
#  path       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Course < ApplicationRecord
    #deleting all holes associated if a course is destroyed
    has_many :holes, dependent: :destroy
    #accepts_nested_attribute_for :holes, allow_destroy: true, reject_if: proc { |att| att['holeNumber'].blank? } 
end
