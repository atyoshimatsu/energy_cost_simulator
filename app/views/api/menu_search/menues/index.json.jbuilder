json.array! @menues do |menu|
  json.id menu.id
  json.name menu.name
  json.contract_type menu.contract_type
end
