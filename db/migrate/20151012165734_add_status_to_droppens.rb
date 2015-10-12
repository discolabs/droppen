class AddStatusToDroppens < ActiveRecord::Migration
  def change
    add_column :droppens, :status, :integer, default: 0
  end
end
