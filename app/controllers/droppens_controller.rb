require 'json'

class DroppensController < ApplicationController

  before_action :set_droppen, only: [:show, :edit, :update, :destroy]

  # GET /droppens
  # GET /droppens.json
  def index
    @droppens = Droppen.all
  end

  # GET /droppens/1
  # GET /droppens/1.json
  def show
  end

  # GET /droppens/new
  def new
    @droppen = Droppen.new
  end

  # GET /droppens/1/edit
  def edit
  end

  # POST /droppens
  # POST /droppens.json
  def create

    @droppen = Droppen.find_or_create_by(code: droppen_params[:code])

    if @droppen.update(droppen_params)
      template_service = ::TemplateService.new(@droppen)
      template_service.push

      render :json => @droppen
    else
      render :json => @droppen.errors
    end
  end

  # PATCH/PUT /droppens/1
  # PATCH/PUT /droppens/1.json
  def update
    respond_to do |format|
      if @droppen.update(droppen_params)
        format.html { redirect_to @droppen, notice: 'Droppen was successfully updated.' }
        format.json { render :show, status: :ok, location: @droppen }
      else
        format.html { render :edit }
        format.json { render json: @droppen.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /droppens/1
  # DELETE /droppens/1.json
  def destroy
    @droppen.destroy
    respond_to do |format|
      format.html { redirect_to droppens_url, notice: 'Droppen was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_droppen
      @droppen = Droppen.find(params[:code])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def droppen_params
      params.permit(:code, :liquid, :css, :js, :template, :product)
    end
end
