class RenameTableDroplets < ActiveRecord::Migration
  def change
    rename_table :droplets, :droppens
  end
end
