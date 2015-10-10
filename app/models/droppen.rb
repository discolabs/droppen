class Droppen < ActiveRecord::Base

  def as_json(options={})
    super(:only => [:code, :liquid, :css, :js, :template, :product])
  end
end
