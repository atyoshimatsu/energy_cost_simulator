class AddCompanyIdToMenu < ActiveRecord::Migration[5.2]
  def change
    add_reference :menus, :company, foreign_key: true
  end
end
