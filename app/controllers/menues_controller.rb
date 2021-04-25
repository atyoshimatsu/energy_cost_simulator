class MenuesController < ApplicationController
  def import
    Menu.import(params[:menu_file])
    redirect_to root_path
  end
end
