class HolesController < ApplicationController
  before_action :set_hole, only: %i[ show edit update]
  skip_before_action :verify_authenticity_token, only: %i[update_map]

  def index
      $course = Course.find(params[:course_id])
      $holes = $course.holes
  end

  def show
  end

  def edit
  end

  # update hole map
  def update_map
    # post
    map_data = params[:map_data]
    $hole.update(map: map_data)
    # TODO: redirect not work with no error info
    redirect_to course_holes_path($course)
  end

  private
      
    def set_hole
      $hole = Hole.find(params[:id])
      $course = $hole.course
    end

    def hole_params
      params.require(:hole).permit(:holeNumber, :map, :note, :course_id)
    end

  end