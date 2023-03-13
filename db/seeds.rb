# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.where(email:'acd19ml@sheffield.ac.uk').first_or_create(password:'123456', password_confirmation:'123456')

Course.create(name:"course 1", path:"map11.svg")