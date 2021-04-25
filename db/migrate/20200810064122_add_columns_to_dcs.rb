class AddColumnsToDcs < ActiveRecord::Migration[5.2]
  def change
    add_column :dcs, :threshold, :integer
    add_reference :dcs, :menu, foreign_key: true
  end
end
