class CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end

  def import
    Company.import(params[:file])
    redirect_to root_path
  end
end
