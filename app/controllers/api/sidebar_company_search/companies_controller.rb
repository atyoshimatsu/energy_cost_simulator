class Api::SidebarCompanySearch::CompaniesController < ApplicationController
  def index
    return false if params[:keyword] == ""
    @companies = Company.where(['name LIKE ?', "%#{params[:keyword]}%"] )
    respond_to do |format|
      format.html
      format.json
    end
  end
end