json.array!(@droplets) do |droplet|
  json.extract! droplet, :id
  json.url droplet_url(droplet, format: :json)
end
