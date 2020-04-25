class AddUrlToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :url, :string, null: false
    add_column :companies, :title, :string
    add_column :companies, :text, :string
    add_column :companies, :image, :string
  end
end
