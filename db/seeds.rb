# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.where(email:'acd19ml@sheffield.ac.uk').first_or_create(password:'123456', password_confirmation:'123456')
User.where(email:'mapcreator.email.address@sheffield.ac.uk').first_or_create(password:'Password123', password_confirmation:'Password123', map_creator: true)

User.where(email:'test@test.com').first_or_create(password:'123456', password_confirmation:'123456')


Course.create(name:"course 1", path:"map11.svg")


Hole.create(holeNumber:'1', map:'num1cid1', note:'This is course 1 hole 1 note.', course_id:'1')
Hole.create(holeNumber:'2', map:'hnum2cid1', note:'This is course 1 hole 2 note.', course_id:'1')
Hole.create(holeNumber:'1', map:'num1cid2', note:'This is course 2 hole 1 note.', course_id:'2')