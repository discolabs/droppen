class Droppen < ActiveRecord::Base

  enum status: [:unlocked, :locked]

  def as_json(options={})
    super(:only => [:code, :liquid, :css, :js, :template, :product])
  end

end
