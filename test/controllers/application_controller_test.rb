require 'test_helper'

class ApplicationControllerTest < ActionController::TestCase

  describe "should have environment variables defined" do
   it "should have the SHOPIFY_APP_SECRET defined in an environment variable" do 
      assert ENV["SHOPIFY_APP_SECRET"], "no SHOPIFY_APP_SECRET defined"
    end
  end

end
