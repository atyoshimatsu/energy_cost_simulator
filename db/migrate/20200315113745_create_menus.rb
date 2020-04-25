class CreateMenus < ActiveRecord::Migration[5.2]
  def change
    create_table :menus do |t|
      t.string :name, null: false
      t.integer :contract_type, null: false
      t.integer :area, null: false
      t.float :EC, null: false
      t.float :DC_1
      t.float :DC_2
      t.float :DC_3
      t.float :DC_4
      t.float :DC_5
      t.float :DC_6
      t.float :DC_summer
      t.float :DC_other
      t.integer :threshold_1
      t.integer :threshold_2
      t.integer :threshold_3
      t.integer :threshold_4
      t.integer :threshold_5
      t.timestamps
    end
  end
end
