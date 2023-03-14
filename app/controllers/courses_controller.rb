class CoursesController < ApplicationController
  before_action :set_course, only: %i[ show ]
  def index
    @courses = Course.all
  end

  def show
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