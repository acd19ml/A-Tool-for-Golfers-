class UsersController < ApplicationController
  before_action :auth_admin
  before_action :set_user, only: %i[ show edit update destroy ]

  def admin
    $users = User.all
  end
  
  
  def index
    @users = User.all
  end

  def show
  end

  def edit
  end

  # GET /products/new
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to user_path, notice: "The user was successfuly created"
    else
      render :new, status: :unprocessable_entity
    end
  end



  def update
    if @user.update(user_params)
      redirect_to users_path, notice: 'User was successfully updated.'
    else
      render :edit
    end
  end
  
  
  

  def destroy
    @user.destroy
    redirect_to users_url, notice: "The user was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
    

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :admin, :map_creator, :is_suspended)
    end
    


  private
    # role authorization
    def auth_admin
      unless current_user.admin?
        redirect_to root_path, alert: "You have no permission to view this page."
      end
    end
end
