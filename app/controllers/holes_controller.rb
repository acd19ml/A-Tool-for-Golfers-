class HolesController < ApplicationController
    before_action :set_hole, only: %i[ show ]
    def index
        @course = Course.find(params[:course_id])
        @holes = @course.holes
    end
  
    def show
    end
  
    def edit
      # TODO:
    end
  
  # GET /holes/new
  def new
    @hole = Hole.new
  end

  # POST /holes
  def create
    @hole = Hole.new(hole)

    if @hole.save
      redirect_to holes_path, notice: "Hole was successfuly created"
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
      
    def set_hole
      @hole = Hole.find(params[:id])
      @course = @hole.course
    end

    def hole
      params.require(:hole).permit(:holeNumber, :map, :note, :course_id)
    end

  end

