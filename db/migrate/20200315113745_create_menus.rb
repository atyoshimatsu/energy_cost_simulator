class CreateMenus < ActiveRecord::Migration[5.2]
  def change
    create_table :menus do |t|
      t.string :name, null: false
      t.integer :contract_type, null: false
      t.integer :area, null: false
      t.float :EC, null: false
      t.timestamps
    end
  end
end
