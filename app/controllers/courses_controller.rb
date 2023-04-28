class CoursesController < ApplicationController

  def index
    @courses = Course.all.includes(:holes)
  end

  def show
  end

  # GET /courses/new
  def new
    @course = Course.new
  end

  # POST /courses
  def create
    @course = Course.new(course)
    #Course.create(course)

    if @course.save
      redirect_to courses_path, notice: "Course was successfuly created"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    @course = Course.find(params[:id])
    if @course.update(course)
      redirect_to course_holes_path(@course), notice: "Course was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    @course = Course.find(params[:id])
    if @course.present?
      @course.destroy
    end
    redirect_to courses_url, notice: "Product was successfully destroyed."
  end



  private

    def course
      params.require(:course).permit(:name, holes_attributes: [:holeNumber, :map, :note, :course_id]) 
    end

  end