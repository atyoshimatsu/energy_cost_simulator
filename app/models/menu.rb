class Menu < ApplicationRecord
  belongs_to :company
  validates :name, presence: true

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      # IDが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成
      menu = find_by(id: row["id"]) || new
      # CSVからデータを取得し、設定する
      menu.attributes = row.to_hash.slice(*updatable_attributes)

      begin
        menu.save!
      rescue => exception
        puts exception
      end

    end
  end
  
  # 更新を許可するカラムを定義
  def self.updatable_attributes
    ["id","name","contract_type","area","EC","DC_1","DC_2","DC_3","DC_4","DC_5","DC_6","DC_summer","DC_other","threshold_1","threshold_2","threshold_3","threshold_4","threshold_5","company_id"]
  end
end
