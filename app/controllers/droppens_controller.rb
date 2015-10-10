require 'json'

class DroppensController < ApplicationController

  before_action :set_droppen, only: [:show]

  # GET /droppens/1
  # GET /droppens/1.json
  def show
    if @droppen
      render json: @droppen
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  # POST /droppens
  # POST /droppens.json
  def create

    @droppen = Droppen.find_or_create_by(code: droppen_params[:code])

    if @droppen.update(droppen_params)
      begin
        template_service(@droppen).push
      rescue
        render :json => @droppen, status: :unprocessable_entity  
      end

      render :json => @droppen
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_droppen
      @droppen = Droppen.find_by(code: params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def droppen_params
      params.permit(:code, :liquid, :css, :js, :template, :product)
    end

    def template_service(droppen)
      ::TemplateService.new(@droppen)
    end
end
