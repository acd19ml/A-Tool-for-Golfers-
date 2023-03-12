# == Schema Information
#
# Table name: annotations
#
#  id            :bigint           not null, primary key
#  annotationMap :decimal(, )
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
FactoryBot.define do
  factory :annotation do
    annotationMap { "9.99" }
  end
end
