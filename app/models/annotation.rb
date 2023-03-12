# == Schema Information
#
# Table name: annotations
#
#  id            :bigint           not null, primary key
#  annotationMap :decimal(, )
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Annotation < ApplicationRecord
    belongs_to :user
    belongs_to :hole
end
