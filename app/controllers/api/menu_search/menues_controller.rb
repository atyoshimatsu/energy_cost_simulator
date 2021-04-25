class Api::MenuSearch::MenuesController < ApplicationController
  def index
    return nil if params[:company_code] == "-1" || params[:area_code] == ""
    @menues = Menu.where(company_id: params[:company_code].to_i, area: params[:area_code].to_i)
    @dcs = Dc.where(menu_id: @menues.ids)
    respond_to do |format|
      format.html
      format.json
    end
  end
end