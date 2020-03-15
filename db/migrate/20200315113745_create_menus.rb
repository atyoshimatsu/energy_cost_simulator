class CreateMenus < ActiveRecord::Migration[5.2]
  def change
    create_table :menus do |t|
      t.string :name
      t.integer :type
      t.integer :area
      t.float :EC
      t.float :DC_other
      t.float :DC_summer
      t.integer :threshold_1
      t.integer :threshold_2
      t.integer :threshold_3
      t.integer :threshold_4
      t.integer :threshold_5
      t.integer :power_factor_flag
      t.timestamps
    end
  end
end
