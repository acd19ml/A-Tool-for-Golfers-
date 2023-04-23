class CoursesController < ApplicationController

  def index
    @courses = Course.all.includes(:holes)
  end

  def show
  end

  def edit
  end

  # GET /courses/new
  def new
    @course = Course.new
  end

  # POST /courses
  def create
    @course = Course.new(course)

    if @course.save
      redirect_to courses_path, notice: "Course was successfuly created"
    else
      render :new, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    @course.destroy
    redirect_to courses_url, notice: "Product was successfully destroyed."
  end



  private

    def course
      params.require(:course).permit(:name, :path)
    end

  end