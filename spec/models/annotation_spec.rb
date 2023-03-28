# == Schema Information
#
# Table name: annotations
#
#  id            :bigint           not null, primary key
#  annotationMap :decimal(, )
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  hole_id       :integer
#  user_id       :integer
#
# Foreign Keys
#
#  fk_rails_...  (hole_id => holes.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Annotation, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
