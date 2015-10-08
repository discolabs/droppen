require 'test_helper'

class DroppensControllerTest < ActionController::TestCase

  def setup
    @controller = DroppensController.new
  end

  describe "GET 'show'" do
    before(:each) do
      @the_drop = droppens(:one)
      get 'show', :format => :json, :id => @the_drop.code
    end

    it "should be successful" do
      assert_response :success
    end

    it "should return the correct droppen when correct code is passed" do
      body = JSON.parse(response.body)
      assert_equal body["code"], @the_drop.code
    end

    it "should not show the internal droppen id" do
      body = JSON.parse(response.body)
      assert_nil body["id"] 
    end
  end


  describe "POST 'create'" do
    before(:each) do
      template_service_mock = mock() 
      template_service_mock.stubs(:push)
      @controller.stubs(:template_service).returns(template_service_mock)
      @the_drop = droppens(:one)

    end

    it "updates the current droppen information" do
      new_liquid = "HOLA"
      post 'create', format: :json, id: @the_drop.code, liquid: @the_drop.liquid
      body = JSON.parse(response.body)

      assert_equal @the_drop.liquid, body["liquid"]

      post 'create', format: :json, id: @the_drop.code, liquid: new_liquid
      body = JSON.parse(response.body)

      assert_equal new_liquid, body["liquid"]
    end

  end


end
