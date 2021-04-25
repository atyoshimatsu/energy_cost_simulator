class DestroyTables < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key "menu_dcs", "dcs"
    remove_foreign_key "menu_dcs", "menus"
    remove_foreign_key "menu_thresholds", "menus"
    remove_foreign_key "menu_thresholds", "thresholds"  
    # drop_table :thresholds
    drop_table :menu_thresholds
    drop_table :menu_dcs
  end
end
