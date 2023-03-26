class HolesController < ApplicationController
    before_action :set_hole, only: %i[ show ]
    def index
        @course = Course.find(params[:course_id])
        @holes = @course.holes
    end
  
    def show
    end
  
    def edit
      # TODO:
    end
  
    private
        
      def set_hole
        @hole = Hole.find(params[:id])
        @course = @hole.course
      end
  
      def hole
        params.require(:hole).permit(:holeNumber, :map, :note, :course_id)
      end
  
    end