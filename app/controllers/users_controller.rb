class UsersController < ApplicationController
  # TODO:
  before_action :auth_admin
  def admin
    $users = User.all
  end


  private
    # role authorization
    def auth_admin
      unless current_user.admin?
        redirect_to root_path, alert: "You have no permission to view this page."
      end
    end
end
