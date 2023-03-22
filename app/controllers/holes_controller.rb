# class CoursesController < ApplicationController
#     before_action :set_hole, only: %i[ show ]
#     def index
#       @courses = Course.all
#     end
  
#     def show
#     end
  
#     def edit
#     end
  
  
  
#     private
      
#       def set_hole
#         @hole = Hole.first(:conditions => "course_id = '").Hole.find(params[:id])
#       end
  
#       def course
#         params.require(:course).permit(:name, :path)
#       end
  
#     end