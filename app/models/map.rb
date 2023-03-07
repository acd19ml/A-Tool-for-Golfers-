# == Schema Information
#
# Table name: maps
#
#  id         :bigint           not null, primary key
#  name       :string
#  path       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Map < ApplicationRecord
end
