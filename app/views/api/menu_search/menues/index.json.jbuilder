json.array! @menues do |menu|
  json.id menu.id
  json.name menu.name
  json.area menu.area
  json.contract_type menu.contract_type
  json.EC menu.EC
  i = 1
  for dc in @dcs do
    if menu.id == dc.menu_id
      json.set! :DC do
        json.set! "DC_#{i}" do
          json.set! "threshold", dc.threshold
          json.set! "DC", dc.DC
          if menu.contract_type == 3
            json.set! :summer, dc.summer
          end
          i += 1
        end
      end
    end
  end
end
