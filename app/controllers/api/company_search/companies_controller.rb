class Api::CompanySearch::CompaniesController < ApplicationController
  def index
    if params[:class] == "main_info_company-search_form"
      return false if params[:keyword] == ""
    end
    @companies = Company.where(['name LIKE ?', "%#{params[:keyword]}%"] )
    respond_to do |format|
      format.html
      format.json
    end
  end
end