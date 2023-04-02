# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.where(email:'test@test.com').first_or_create(password:'123456', password_confirmation:'123456')

Course.create(name:"course 1", path:"map11.svg")

Hole.create(holeNumber:'1', map:'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="500" height="500"><polygon points="468,65.40625 469,56.40625 465,42.40625 444,15.40625 428,14.40625 416,15.40625 398,22.40625 392,27.40625 376,37.40625 364,47.40625 355,53.40625 340,63.40625 321,77.40625 314,82.40625 296,98.40625 287,108.40625 280,117.40625 272,129.40625 259,141.40625 246,147.40625 230,152.40625 193,167.40625 176,175.40625 149,189.40625 124,202.40625 107,209.40625 87,227.40625 74,249.40625 64,266.40625 52,289.40625 43,307.40625 39,321.40625 29,346.40625 18,360.40625 14,381.40625 36,398.40625 66,400.40625 78,402.40625 94,403.40625 116,394.40625 135,386.40625 147,377.40625 169,360.40625 184,340.40625 192,319.40625 217,279.40625 220,276.40625 240,262.40625 258,249.40625 279,237.40625 298,228.40625 316,220.40625 332,210.40625 356,195.40625 370,167.40625 387,150.40625 397,145.40625 406,138.40625 420,128.40625 430,121.40625 436,115.40625 451,100.40625 453,98.40625 457,89.40625 459,82.40625" fill="#46ad02" stroke-width="1" stroke="#000000" name="Fairway"></polygon><polygon points="441,82.40625 456,67.40625 452,43.40625 444,25.40625 428,25.40625 413,29.40625 401,42.40625 385,51.40625 380,74.40625 378,90.40625 399,101.40625 417,97.40625" fill="#49fc03" stroke-width="1" stroke="#000000" name="Green"></polygon><circle r="5" cx="415" cy="60.40625" name="hole"></circle><line x1="0" y1="0" x2="0" y2="0" stroke-width="1" stroke="#000000"></line><circle r="5" cx="-10" cy="-10"></circle></svg>', note:'This is course 1 hole 1 note.', course_id:'1')
Hole.create(holeNumber:'2', map:'hnum2cid1', note:'This is course 1 hole 2 note.', course_id:'1')
Hole.create(holeNumber:'1', map:'num1cid2', note:'This is course 2 hole 1 note.', course_id:'2')
