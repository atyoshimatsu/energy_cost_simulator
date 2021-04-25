class Dc < ApplicationRecord
  belongs_to :menu

  validates :DC, numericality: true
  validates :summer, inclusion: { in: [true, false] }
  validates :threshold, numericality: {only_integer: true}, allow_nil: true

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      # IDが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成
      dc = Dc.find_by(id: row["id"]) || new
      # CSVからデータを取得し、設定する
      dc.attributes = row.to_hash.slice(*updatable_attributes)

      begin
        dc.save!
      rescue => exception
        puts exception
      end

    end
  end
  
  # 更新を許可するカラムを定義
  def self.updatable_attributes
    ["id","DC","summer","threshold","menu_id"]
  end

end
