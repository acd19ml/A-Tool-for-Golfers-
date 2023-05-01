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

  def new 
    $course = Course.find(params[:course_id])
    $hole = Hole.new
  end

  def create 
    $hole = Hole.new(hole_params)
    $course = $hole.course
    if $hole.save
      redirect_to course_holes_path($course), notice: "Hole was successfully created."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy 
    $course = Course.find(params[:course_id])
    $hole = Hole.find(params[:id])
    if $hole.present?
      $hole.destroy
    end
    redirect_to course_holes_path($course), notice: "Hole was successfully destroyed."
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