json.array!(@droppens) do |droppen|
  json.url droppen_url(droppen.code, format: :json)
end
