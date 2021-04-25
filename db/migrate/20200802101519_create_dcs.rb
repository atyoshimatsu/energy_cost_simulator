class CreateDcs < ActiveRecord::Migration[5.2]
  def change
    create_table :dcs do |t|
      t.float :DC
      t.boolean :summer,     null: false, default: false
      t.timestamps
    end
  end
end
