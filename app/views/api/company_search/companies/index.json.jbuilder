json.array! @companies do |company|
  json.id company.id
  json.name company.name
  json.url company.url
  json.text company.text
  json.image company.image
end