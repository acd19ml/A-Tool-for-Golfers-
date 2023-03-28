class CoursesController < ApplicationController

  def index
    @courses = Course.all.includes(:holes)
  end

  def show
  end

  def edit
  end

  # GET /products/new
  def new
    @course = Course.new
  end

  # POST /courses
  def create
    @course = Course.new(course_params)

    if @course.save
      redirect_to courses_path, notice: "Course was successfuly created"
    else
      render :new, status: :unprocessable_entity
    end
  end



  private

    def course
      params.require(:course).permit(:name, :path)
    end

  end