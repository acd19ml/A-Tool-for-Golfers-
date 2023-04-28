class CoursesController < ApplicationController

  def index
    $courses = Course.all.includes(:holes)
  end

  def show
  end

  def edit
  end

  # GET /products/new
  def new
    $course = Course.new
  end

  # POST /courses
  def create
    $course = Course.new(course_params)

    if $course.save
      redirect_to courses_path, notice: "Course was successfuly created"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    $course = Course.find(params[:id])
    if $course.update(course_params)
      redirect_to course_holes_path($course), notice: "Course was successfully updated."
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
    redirect_to courses_url, notice: "Product was successfully destroyed."
  end


  private

    def course_params
      params.require(:course).permit(:name, :path)
    end

  end