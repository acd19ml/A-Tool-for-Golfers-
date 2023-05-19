# == Schema Information
#
# Table name: holes
#
#  id         :bigint           not null, primary key
#  holeNumber :integer
#  map        :string           default("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.dev/svgjs\" width=\"500\" height=\"500\" name=\"draw\"><circle r=\"5\" cx=\"250\" cy=\"250\" fill=\"#ff1100\" name=\"hole\"></circle></svg>")
#  note       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  course_id  :integer
#
# Foreign Keys
#
#  fk_rails_...  (course_id => courses.id)
#
require 'rails_helper'

RSpec.describe Hole, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
