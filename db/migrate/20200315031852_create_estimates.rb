class CreateEstimates < ActiveRecord::Migration[5.2]
  def change
    create_table :estimates do |t|
      t.integer :ampere
      t.integer :kVA
      t.integer :kW
      t.integer :power_factor
      t.integer :year
      t.integer :usage_jan
      t.integer :usage_feb
      t.integer :usage_mar
      t.integer :usage_apr
      t.integer :usage_may
      t.integer :usage_jun
      t.integer :usage_jul
      t.integer :usage_aug
      t.integer :usage_sep
      t.integer :usage_oct
      t.integer :usage_nov
      t.integer :usage_dec
      t.timestamps
    end
  end
end
