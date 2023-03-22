class CoursesController < ApplicationController
  before_action :set_course, only: %i[ show ]
  def index
    @courses = Course.all.includes(:holes)
  end

  def show
    @hole = Hole.where(course_id: params[:id]).first
   end

  def edit
  end




  private
    
    def set_course
      @course = Course.find(params[:id])
    end

    def course
      params.require(:course).permit(:name, :path)
    end

  end