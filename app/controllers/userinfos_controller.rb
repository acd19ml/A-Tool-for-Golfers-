class UserinfosController < ApplicationController
  before_action :set_userinfo, only: %i[ show edit update destroy ]

  # GET /userinfos
  def index
    @userinfos = Userinfo.where(user_id: current_user.id)
  end

  # GET /userinfos/1
  def show
  end

  # GET /userinfos/new
  def new
    @userinfo = Userinfo.new
  end

  # GET /userinfos/1/edit
  def edit
  end
  
  # POST /userinfos
  def create

    @userinfo = Userinfo.new(userinfo_params)
    @userinfo.user_id = current_user.id
    if @userinfo.save
      redirect_to userinfos_path, notice: "Club was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /userinfos/1
  def update
    if @userinfo.update(userinfo_params)
      redirect_to userinfos_path, notice: "Club was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /userinfos/1
  def destroy
    @userinfo.destroy
    redirect_to userinfos_url, notice: "Club was successfully deleted."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_userinfo
      @userinfo = Userinfo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def userinfo_params
      params.require(:userinfo).permit(:club, :height, :width, :angle)
    end
end