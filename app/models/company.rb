class Company < ApplicationRecord
  has_many :menus
  validates :name, presence: true, uniqueness: true

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      # IDが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成
      company = find_by(id: row["id"]) || new
      # CSVからデータを取得し、設定する
      agent = Mechanize.new
      page = agent.get(company[:url])
      row["title"] = page.title
      meta_description = page.at('meta[property="og:description"]')
      row["text"] = meta_description.get_attribute(:content) unless meta_description.nil?
      meta_image = page.at('meta[property="og:image"]')
      image = meta_image.get_attribute(:content) unless meta_image.nil?
      row["image"] = image.sub('../', company[:url]) unless image.nil?

      company.attributes = row.to_hash.slice(*updatable_attributes)

      begin
        company.save!
      rescue => exception
        puts exception
      end

    end
  end
  
  # 更新を許可するカラムを定義
  def self.updatable_attributes
    ["id", "name", "url", "title", "text", "image"]
  end
end
