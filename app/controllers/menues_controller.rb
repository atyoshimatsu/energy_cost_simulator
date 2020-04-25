class MenuesController < ApplicationController
  def import
    Menu.import(params[:file])
    redirect_to root_path
  end
end
