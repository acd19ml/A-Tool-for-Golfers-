class CoursesController < ApplicationController
  before_action :set_course, only: %i[ edit update ]
  before_action :permit_validation, only: %i[ edit update ]


  def index
    $courses = Course.all.includes(:holes)
  end

  def show
  end

  def edit
  end

  # GET /courses/new
  def new
    $course = Course.new
  end

  # POST /courses
  def create
    $course = Course.new(course_params)

    if $course.save 
      redirect_to courses_path, notice: "Course was successfully created"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    $course = Course.find(params[:id])
    if $course.update(course_params)
      redirect_to courses_path, notice: "Course was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    $course = Course.find(params[:id])
    if $course.present?
      $course.destroy
    end
    redirect_to courses_url, notice: "Course was successfully destroyed."
  end


  private

  # private @course for edit only
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.require(:course).permit(:name, :path)
    end

    # role authorization
    def permit_validation
      unless user_signed_in? and current_user.map_creator? 
        redirect_to root_path, alert: "You have no permission to view this page."
      end
    end
  end