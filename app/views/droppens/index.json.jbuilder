json.array!(@droppens) do |droppen|
  json.extract! droppen, :id
  json.url droppen_url(droppen, format: :json)
end
