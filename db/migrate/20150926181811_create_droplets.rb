class CreateDroplets < ActiveRecord::Migration
  def change
    create_table :droplets do |t|
      t.string :code
      t.text :liquid
      t.text :css
      t.text :js
      t.string :template
      t.string :product

      t.timestamps null: false
    end
    add_index :droplets, :code, :unique => true
  end
end
