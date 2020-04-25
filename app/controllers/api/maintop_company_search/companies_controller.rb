class Api::MaintopCompanySearch::CompaniesController < ApplicationController
  def index
    @companies = Company.where(['name LIKE ?', "%#{params[:keyword]}%"] )
    respond_to do |format|
      format.html
      format.json
    end
  end
end