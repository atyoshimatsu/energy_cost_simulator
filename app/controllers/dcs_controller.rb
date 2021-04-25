class DcsController < ApplicationController
  def import
    Dc.import(params[:dc_file])
    redirect_to root_path
  end
end
