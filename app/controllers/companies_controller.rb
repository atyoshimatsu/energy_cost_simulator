class CompaniesController < ApplicationController
  before_action :user_logged_in?

  def index
    @companies = Company.all
    @user = current_user
  end

  def import
    Company.import(params[:company_file])
    redirect_to root_path
  end

  def user_logged_in?
    unless user_signed_in?
      redirect_to new_user_session_path 
    end
  end

end
