class CoursesController < ApplicationController

  def index
    @courses = Course.all.includes(:holes)
  end

  private

    def course
      params.require(:course).permit(:name, :path)
    end

  end